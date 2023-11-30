import { PageReactWidgetController } from '@beyond-js/react-18-widgets/page';
import { StoreManager } from './store';
import { View } from './views';

export /*bundle*/
class Controller extends PageReactWidgetController {
	#store: StoreManager;
	createStore() {
		this.#store = new StoreManager();
		return this.#store;
	}
	get Widget() {
		return View;
	}

	/**
	 * this method is executed when the widget is showd
	 */
	show() {
		if (!this.#store) return;
		this.#store.load();
		// const { userId } = JSON.parse(localStorage.getItem('session'));
		// const entity = `${userId}-profile`;
		// const confTables = !!localStorage.getItem(entity) ? JSON.parse(localStorage.getItem(entity)) : head.slice(0, 9);
		// this.#store.heads = confTables;
		// this.#store.keys = confTables.map(item => item.id);
	}

	/**
	 * this method is executed when the widget is hidden
	 */
	hide() {}
}
