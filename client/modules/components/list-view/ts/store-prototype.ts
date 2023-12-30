import { ReactiveModel } from '@beyond-js/reactive/model';
import { Collection } from '@beyond-js/reactive/entities';

export /*bundle*/ abstract class StoreListView extends ReactiveModel<StoreListView> {
	#collection: Collection;
	get collection() {
		return this.#collection;
	}

	#limit: number = 10;

	get limit() {
		return this.#limit;
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
	};

	constructor({ collection }: { collection: Collection }) {
		super();
		if (!collection) {
			throw new Error('Collection is required');
		}
		this.#collection = collection;
	}

	load = async () => {
		try {
			this.ready = false;

			const response = await this.#collection.load({ start: this.#collection.next, limit: this.#limit });
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

			const params = typeof search === 'string' ? { search } : search;

			await this.#collection.load({
				profile: search,
			});
			this.triggerEvent();
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
			const response = await this.#collection.load(this.#params);
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
}
