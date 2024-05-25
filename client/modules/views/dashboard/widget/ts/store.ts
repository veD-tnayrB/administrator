import { ReactiveModel } from '@beyond-js/reactive/model';
import { Widgets, IWidget } from '@essential-js/admin/models';
import { session } from '@essential-js/admin/auth';

export class StoreManager extends ReactiveModel<StoreManager> {
	#collection: Widgets = new Widgets();
	get collection() {
		return this.#collection;
	}

	selectedWidgets: IWidget[] = [];

	load = async () => {
		try {
			this.fetching = true;

			const response = await this.#collection.getDashboard({ userId: session.user.id });
			if (!response.status) throw new Error(response.error);
			this.selectedWidgets = response.data.entries;
		} catch (error) {
			console.error(error);
			return error;
		} finally {
			this.ready = true;
			this.fetching = false;
		}
	};
}
