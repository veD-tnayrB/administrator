import { ReactWidgetController } from '@beyond-js/react-18-widgets/base';
import { Layout } from './main.layout.index';
import { StoreManager } from './store';

export /*bundle*/
	class Controller extends ReactWidgetController {
	get Widget() {
		return Layout;
	}

	#store: StoreManager;

	createStore() {
		this.#store = new StoreManager();
		return this.#store;
	}

	show() {
		this.#store.loadSidebarItems();
	}

	hide() {
		this.#store.hide();
	}
}
