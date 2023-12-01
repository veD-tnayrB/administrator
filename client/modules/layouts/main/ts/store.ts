import { ReactiveModel } from '@beyond-js/reactive/model';
import { Module, Modules } from '@essential-js/admin/models';

export class StoreManager extends ReactiveModel<StoreManager> {
	#mode: 'dark' | 'light' = 'light';
	get mode() {
		return this.#mode;
	}

	#sidebarCollection: Modules = new Modules();
	get sidebarCollection() {
		return this.#sidebarCollection;
	}

	loadSidebarItems = async () => {
		try {
			this.fetching = true;
			const response = await this.#sidebarCollection.load();
			if (!response.status) throw response.error;
			this.#sidebarCollection.items.sort((a: Module, b: Module) => a.order - b.order);
		} catch (error) {
			console.error('ERROR LOADING SIDEBAR ITEMS ', error);
			return { status: false, error };
		} finally {
			this.fetching = false;
		}
	};

	changeMode = () => {
		this.#mode = this.#mode === 'light' ? 'dark' : 'light';
		this.triggerEvent('theme-changed');
	};
}
