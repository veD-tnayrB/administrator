import { ReactiveModel } from '@beyond-js/reactive/model';
import { Collection } from '@beyond-js/reactive/entities';

export /*bundle*/ abstract class StoreViewTable extends ReactiveModel<StoreViewTable> {
	#collection: Collection;
	get collection() {
		return this.#collection;
	}

	#reverse: Record<string, boolean> = {};

	get items() {
		return this.#collection.items;
	}

	#next: number = 0;
	#total: number = 0;
	get total() {
		return this.#total;
	}

	#currentPage: number = 1;
	get currentPage(): number {
		return this.#currentPage;
	}

	icon = (key: string) => {
		return this.#reverse[key] ? 'arrowDropUp' : 'arrowDropDown';
	};

	#limit: number = 10;

	#params = {
		limit: this.#limit,
		start: 0,
	};

	constructor({ collection }: { collection: Collection }) {
		super();
		if (!collection) {
			throw new Error('Collection is required');
		}
		this.#collection = collection;
		this.reactiveProps(['heads', 'keys', 'items', 'total', 'currentPage', 'limit']);
	}

	load = async () => {
		try {
			this.fetching = true;

			const response = await this.#collection.load({ start: this.#next });
			if (!response.status) throw response.error;

			// this.#items = this.#collection.items;
			this.#total = this.#collection.counters.total;
			this.#next = this.#collection.next;
		} catch (error) {
			console.error(error);
		} finally {
			this.fetching = false;
			this.ready = true;
		}
	};

	search = async (search: { startDate: string; endDate: string; search }) => {
		try {
			this.fetching = true;
			const { startDate, endDate } = search;

			await this.#collection.load({
				profile: search,
			});
			this.#total = this.#collection.counters.total;
			this.#next = this.#collection.next;
			// this.#items = this.#collection.items;
			this.triggerEvent();
		} catch (error) {
			console.error(error);
		} finally {
			this.fetching = false;
		}
	};

	#navigation = async page => {
		try {
			this.fetching = true;
			this.#params = {
				...this.#params,
				limit: this.#limit,
				start: this.#limit * (page - 1),
			};
			const response = await this.#collection.load(this.#params);
			if (!response.status) throw new Error(response.error);
			this.#currentPage = page;
			return this.#collection.items;
		} catch (error) {
			console.error('error', error);
		} finally {
			this.fetching = false;
		}
	};

	changeOrder = event => {
		const {
			dataset: { key },
		} = event.currentTarget;

		const sort = (a, b) => {
			if (!a[key] || !b[key]) return;
			if (this.#reverse[key]) return b[key].toLowerCase().localeCompare(a[key].toLowerCase());
			return a[key].toLowerCase().localeCompare(b[key].toLowerCase());
		};
		this.#collection.items.sort(sort);
		this.#reverse[key] = !this.#reverse[key];
		this.triggerEvent();
	};

	changeEntries = async ({ limit, total, pages }): Promise<number> => {
		this.fetching = true;
		const newPages = Math.ceil(total / limit);
		this.#currentPage = Math.min(Math.ceil((this.#currentPage * this.#limit) / limit), newPages);
		this.#limit = limit;
		this.#params = {
			...this.#params,
			limit: this.#limit,
			start: (this.#currentPage - 1) * limit,
		};
		const response = await this.#collection.load(this.#params);
		this.#currentPage = Math.min(this.#currentPage, pages);
		this.fetching = false;
		return this.#currentPage;
	};

	clean: () => void = (): void => {};

	clearSearch = async () => {
		this.#next = 0;
		this.fetching = true;
		await this.#collection.load({ start: this.#next });
		this.triggerEvent();
		this.fetching = false;
	};

	next = (next, page) => this.#navigation(page);

	prev = page => this.#navigation(page);
}
