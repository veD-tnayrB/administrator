import { ReactiveModel } from '@beyond-js/reactive/model';
import { Widgets } from '@essential-js/admin/models';

export class StoreManager extends ReactiveModel<StoreManager> {
	#collection: Widgets = new Widgets();
	get collection() {
		return this.#collection;
	}

	load = async () => {
		try {
			this.fetching = true;

			const response = await this.#collection.load();
			if (!response.status) throw new Error(response.error);
		} catch (error) {
			console.error(error);
			return error;
		} finally {
			this.fetching = false;
		}
	};
}
