import { ReactiveModel } from '@beyond-js/reactive/model';
import { Widgets, IWidget } from '@essential-js/admin/models';
import { session } from '@essential-js/admin/auth';

export class StoreManager extends ReactiveModel<StoreManager> {
	#collection: Widgets = new Widgets();
	allWidgets: IWidget[] = [];

	#selectedWidgets: IWidget[] = [];
	get selectedWidgets() {
		return this.#selectedWidgets;
	}

	set selectedWidgets(value: IWidget[]) {
		this.#selectedWidgets = value;
		this.triggerEvent();
	}

	load = async () => {
		try {
			this.fetching = true;
			const response = await this.#collection.getDashboard({ userId: session.user.id });
			if (!response.status) throw response.error;

			this.allWidgets = response.data.allWidgets;
			this.#selectedWidgets = response.data.entries;
			return (this.ready = true);
		} catch (error) {
			console.error(error);
			return error;
		} finally {
			this.fetching = false;
		}
	};
}
