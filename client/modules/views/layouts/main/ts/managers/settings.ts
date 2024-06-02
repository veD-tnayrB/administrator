import { ReactiveModel } from '@beyond-js/reactive/model';
import { Widget, Widgets, IWidget } from '@essential-js/admin/models';
import { session } from '@essential-js/admin/auth';
import type { StoreManager } from '../store';

export class SettingsManager extends ReactiveModel<SettingsManager> {
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

	#parent: StoreManager;

	constructor(parent: StoreManager) {
		super();
		this.#parent = parent;
	}

	load = async () => {
		try {
			this.fetching = true;
			const response = await this.#collection.getDashboard({ userId: session.user.id });
			if (!response.status) throw response.error;

			this.allWidgets = response.data.allWidgets;
			this.#selectedWidgets = response.data.entries.map((item: IWidget) => {
				const widget = new Widget({ id: item.id });
				widget.set(item);
				return widget;
			});
			return (this.ready = true);
		} catch (error) {
			console.error(error);
			return error;
		} finally {
			this.fetching = false;
		}
	};

	save = async () => {
		try {
			this.fetching = true;
			const response = await this.#collection.saveDashboard(this.#selectedWidgets);
			if (!response.status) throw response.error;

			this.#parent.isSettingsOpen = false;
			this.triggerEvent('dashboard-changed');
			return { status: true };
		} catch (error) {
			console.error(error);
			return { status: false, error };
		} finally {
			this.fetching = false;
		}
	};
}
