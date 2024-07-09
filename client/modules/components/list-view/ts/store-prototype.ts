import { ReactiveModel } from '@beyond-js/reactive/model';
import { Collection, Item } from '@beyond-js/reactive/entities';
import { IFilter } from './components/utility-bar/searchbar/filters/filters';
import { Reports } from './plugins/reports/manager';

const DEFAULT_LIMIT = 5;

export /*bundle*/ abstract class StoreListView extends ReactiveModel<StoreListView> {
	#id: string;
	get id() {
		return this.#id;
	}

	#collection: Collection;
	get collection() {
		return this.#collection;
	}

	#items: Collection['items'] = [];
	get items() {
		return this.#items;
	}

	#selectedItems: Map<string, Record<string, any>> = new Map();
	get selectedItems() {
		return this.#selectedItems;
	}

	set selectedItems(value: Map<string, Record<string, any>>) {
		this.#selectedItems = value;
	}

	get isAllPageSelected() {
		const selectedItems = this.#items.filter((item) => this.#selectedItems.has(item.id));
		return selectedItems.length === this.#items.length;
	}

	#limit: number = DEFAULT_LIMIT;

	get limit() {
		return this.#limit;
	}

	specificFilters: IFilter[] = [];
	generalFilters: string[] = [];
	#propertiesDisplaying: string[] = [];
	get propertiesDisplaying() {
		return this.#propertiesDisplaying;
	}

	set propertiesDisplaying(properties: string[]) {
		this.#propertiesDisplaying = properties;
		this.triggerEvent('displaying-change');
	}

	get currentPage() {
		return Math.floor(this.#params.start / this.#limit) + 1;
	}

	get totalPages() {
		return Math.ceil(this.#collection.total / this.#limit);
	}

	#params: Record<string, any> = {
		limit: this.#limit,
		start: 0,
		order: 'timeUpdated',
		des: 'DES',
	};

	get params() {
		return this.#params;
	}

	set params(params: Record<string, any>) {
		this.#params = params;
		this.#updateUrl();
	}

	#avaiablesPlugins: Record<string, any> = {
		reports: Reports,
	};
	#plugins: string[] = [];
	get plugins() {
		return this.#plugins;
	}

	set plugins(value: string[]) {
		this.#plugins = value;
		this.#getPlugins();
	}

	#initalizedPlugins = new Map();
	get initalizedPlugins() {
		return this.#initalizedPlugins;
	}

	constructor({ collection, id }: { collection: Collection; id: string }) {
		super();

		if (!collection) {
			throw new Error('Collection is required');
		}

		this.#id = id;
		if (!this.#id) this.#id = collection.storeName;

		this.#propertiesDisplaying = JSON.parse(localStorage.getItem(this.#id) || '[]');
		this.#collection = collection;

		const urlParams: Record<string, string> = this.#getUrlParams();
		this.#limit = Number(urlParams?.limit) || this.#limit;
		if (!!Object.entries(urlParams).length) this.#params = urlParams;
	}

	#getPlugins = () => {
		this.#plugins.forEach((plugin: string) => {
			const isAValidPlugin = this.#avaiablesPlugins[plugin];
			const isAlreadyInitalized = this.#initalizedPlugins.has(plugin);
			if (!isAValidPlugin || isAlreadyInitalized) return;

			const instance = new this.#avaiablesPlugins[plugin](this);
			this.#initalizedPlugins.set(plugin, instance);
			const methods = instance.toExpose;

			methods.forEach((method: string) => (this[method] = instance[method]));
		});
	};

	load = async (params: Record<string, any> = {}) => {
		try {
			this.fetching = true;
			this.#params = { ...this.#params, ...params };
			const response = await this.#collection.load(this.#params);
			if (!response.status) throw response.error;
			this.#items = response.data;
		} catch (error) {
			console.error(error);
		} finally {
			this.fetching = false;
			this.ready = true;
		}
	};

	search = async (search: { [key: string]: unknown } | string) => {
		try {
			this.fetching = true;
			let query: Record<string, unknown> = {};

			const isSpecificFilter =
				typeof search === 'object' &&
				Object.keys(search).some((element) => !this.generalFilters.includes(element));

			if (!isSpecificFilter) {
				this.generalFilters.forEach((item) => {
					const value = typeof search === 'string' ? search : search[item];
					if (!value) return;

					query[item] = value;
				});
			}
			const { start, ...propsToSend } = this.#params;

			const params = {
				...propsToSend,
				where: isSpecificFilter ? search : query,
				start: 0,
			};
			console.log('PARAMS:', { isSpecificFilter, search, query });
			const response = await this.#collection.load(params);
			this.#items = response.data;
		} catch (error) {
			console.error(error);
		} finally {
			this.fetching = false;
		}
	};

	#navigation = async (page: number) => {
		try {
			this.fetching = true;
			this.params = {
				...this.#params,
				limit: this.#limit,
				start: this.#limit * (page - 1),
			};
			const response = await this.#collection.load(this.#params);
			if (!response.status) throw new Error(response.error);
			this.#items = response.data;
		} catch (error) {
			console.error('error', error);
		} finally {
			this.fetching = false;
		}
	};

	clearSearch = async () => {
		try {
			this.fetching = true;
			this.#params = {
				...this.#params,
				start: 0,
			};
			const response = await this.#collection.load(this.#params);
			this.#items = response.data;
		} catch (error) {
			console.error(error);
		} finally {
			this.fetching = false;
		}
	};

	onNext = () => {
		if (this.fetching) return;
		const page = this.currentPage + 1;
		if (page > this.totalPages) return;
		this.#navigation(page);
	};

	onLastPage = () => {
		if (this.fetching) return;
		const page = this.totalPages;
		if (this.currentPage === page) return;
		this.#navigation(page);
	};

	onPrev = () => {
		if (this.fetching) return;
		const page = this.currentPage - 1;
		if (page < 1) return;
		this.#navigation(page);
	};

	onFirstPage = () => {
		if (this.fetching) return;
		if (this.currentPage === 1) return;
		this.#navigation(1);
	};

	onLengthChange = (length: number) => {
		this.#limit = length;
		this.#navigation(1);
	};

	remove = async (params: { id: string }) => {
		try {
			this.fetching = true;
			const item = new this.#collection.item();
			const response = await item.load(params);
			if (!response.status) throw 'RECORD_NOT_EXISTS';

			const removeResponse = await item.delete();
			if (!removeResponse) throw 'RECORD_COULDNT_BE_REMOVED';

			await this.load();

			return { status: true };
		} catch (error) {
			console.error(error);
			return { status: false, error };
		} finally {
			this.fetching = false;
		}
	};

	selectItem = ({ id }: { id: string }) => {
		const item = this.#items.find((item) => item.id === id);

		if (this.#selectedItems.has(id)) {
			this.#selectedItems.delete(id);
		} else {
			this.#selectedItems.set(id, item);
		}

		this.triggerEvent();
	};

	selectAllItems = () => {
		if (this.#selectedItems.size === this.#items.length) {
			this.#selectedItems.clear();
			this.triggerEvent();
			return;
		}

		this.#items.forEach((item) => this.#selectedItems.set(item.id, item));
		this.triggerEvent();
	};

	#updateUrl = () => {
		const params = new URLSearchParams();
		for (const [key, value] of Object.entries(this.#params)) {
			const formatedValue = typeof value === 'object' ? JSON.stringify(value) : value;
			params.append(key, formatedValue);
		}
		window.history.replaceState({}, '', window.location.pathname + '?' + params.toString());
	};

	#getUrlParams = () => {
		const urlParams = new URLSearchParams(window.location.search);
		const params: Record<string, string> = {};
		for (const [key, value] of urlParams) {
			params[key] = value;
		}
		return params;
	};

	resetAll = () => {
		this.#limit = DEFAULT_LIMIT;
		this.#selectedItems = new Map();
		this.clearSearch();
		this.triggerEvent();
	};
}
