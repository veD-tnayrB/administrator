import { ReactiveModel } from '@beyond-js/reactive/model';
import { Collection, Item } from '@beyond-js/reactive/entities';
import { IFilter } from './components/utility-bar/searchbar/filters/filters';

export /*bundle*/ abstract class StoreListView extends ReactiveModel<StoreListView> {
	#id: string;
	get id() {
		return this.#id;
	}

	#collection: Collection;
	get collection() {
		return this.#collection;
	}

	#selectedItems: Map<string, Record<string, any>> = new Map();
	get selectedItems() {
		return this.#selectedItems;
	}

	get isAllPageSelected() {
		const selectedItems = this.#collection.items.filter(item => this.#selectedItems.has(item.id));
		return selectedItems.length === this.#collection.items.length;
	}

	#limit: number = 5;

	get limit() {
		return this.#limit;
	}

	propertiesToSearch: IFilter[] = [];
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

	#params = {
		limit: this.#limit,
		start: 0,
		order: 'timeUpdated',
		des: 'DES',
	};

	constructor({ collection, id }: { collection: Collection; id: string }) {
		super();

		if (!collection) {
			throw new Error('Collection is required');
		}

		this.#id = id;
		if (!this.#id) this.#id = collection.storeName;

		this.#propertiesDisplaying = JSON.parse(localStorage.getItem(this.#id) || '[]');
		this.#collection = collection;
	}

	load = async () => {
		try {
			const response = await this.#collection.load({ start: this.#collection.next || 0, limit: this.#limit });
			if (!response.status) throw response.error;
		} catch (error) {
			console.error(error);
		} finally {
			this.ready = true;
		}
	};

	search = async (search: { [key: string]: unknown } | string) => {
		try {
			this.fetching = true;
			const properties = this.propertiesToSearch.map(item => item.name);
			const query = {};
			properties.forEach(item => {
				const value = typeof search === 'string' ? search : search[item];
				if (!value) return;
				query[item] = value;
			});

			await this.#collection.load({
				where: query,
				...this.#params,
			});
		} catch (error) {
			console.error(error);
		} finally {
			this.fetching = false;
		}
	};

	#navigation = async (page: number) => {
		try {
			this.fetching = true;
			this.#params = {
				...this.#params,
				limit: this.#limit,
				start: this.#limit * (page - 1),
			};
			console.log('PARAMS +> ', this.#params);
			const response = await this.#collection.load(this.#params);
			console.log('ITEMS => ', this.#collection.items);
			if (!response.status) throw new Error(response.error);
		} catch (error) {
			console.error('error', error);
		} finally {
			this.fetching = false;
		}
	};

	clearSearch = async () => {
		this.fetching = true;
		await this.#collection.load({ start: 0, limit: this.#limit });
		this.fetching = false;
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
		const item = this.#collection.items.find(item => item.id === id);

		if (this.#selectedItems.has(id)) {
			this.#selectedItems.delete(id);
		} else {
			this.#selectedItems.set(id, item);
		}

		this.triggerEvent();
	};

	selectAllItems = () => {
		if (this.#selectedItems.size === this.#collection.items.length) {
			this.#selectedItems.clear();
			this.triggerEvent();
			return;
		}

		this.#collection.items.forEach(item => this.#selectedItems.set(item.id, item));
		this.triggerEvent();
	};
}
