import { ReactiveModel } from '@beyond-js/reactive/model';
import { Widgets, IWidget } from '@essential-js/admin/models';
import { session } from '@essential-js/admin/auth';
import { layoutStore } from '@essential-js/admin/layout/main.widget';

export class StoreManager extends ReactiveModel<StoreManager> {
	#collection: Widgets = new Widgets();
	get collection() {
		return this.#collection;
	}

	#width: number = 0;
	get width() {
		return this.#width;
	}

	selectedWidgets: IWidget[] = [];

	constructor() {
		super();
		layoutStore.settingsManager.on('dashboard-changed', this.load);
	}

	load = async () => {
		try {
			this.fetching = true;
			this.#listenResizes();
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

	onWidthChange = () => this.triggerEvent('resize');

	#listenResizes = () => {
		this.onWidthChange();
		layoutStore.on('resize', this.onWidthChange);
		window.addEventListener('resize', this.onWidthChange);
	};

	destroy = () => {
		layoutStore.off('resize', this.onWidthChange);
		window.removeEventListener('resize', this.onWidthChange);
	};
}
