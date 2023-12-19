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
			this.fetching = true;

			const response = await this.#collection.load({ start: this.#collection.next });
			if (!response.status) throw response.error;
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
			return this.#collection.items;
		} catch (error) {
			console.error('error', error);
		} finally {
			this.fetching = false;
		}
	};

	clearSearch = async () => {
		this.fetching = true;
		await this.#collection.load({ start: this.#collection.next });
		this.fetching = false;
	};

	next = ({ next, page }: { next: number; page: number }) => this.#navigation(page);

	prev = (page: number) => this.#navigation(page);
}
