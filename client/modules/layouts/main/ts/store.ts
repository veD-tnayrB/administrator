import { ReactiveModel } from '@beyond-js/reactive/model';
import { Entity, Entities } from '@essential-js/admin/models';

export class StoreManager extends ReactiveModel<StoreManager> {
	#sidebarCollection: Entities = new Entities();
	get sidebarCollection() {
		return this.#sidebarCollection;
	}

	loadSidebarItems = async () => {
		try {
			this.fetching = true;
			const response = await this.#sidebarCollection.load();
			if (!response.status) throw response.error;
			this.#sidebarCollection.items.sort((a: Entity, b: Entity) => a.order - b.order);
		} catch (error) {
			console.error('ERROR LOADING SIDEBAR ITEMS ', error);
			return { status: false, error };
		} finally {
			this.fetching = false;
		}
	};
}
