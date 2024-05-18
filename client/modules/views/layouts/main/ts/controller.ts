import { ReactWidgetController } from '@beyond-js/react-18-widgets/base';
import { Layout } from './main.layout.index';
import { StoreManager } from './store';
import { IWidgetStore } from '@beyond-js/widgets/controller';

export /*bundle*/
	class Controller extends ReactWidgetController {
	get Widget() {
		return Layout;
	}

	#store: StoreManager = new StoreManager();

	createStore() {
		this.#store = new StoreManager();
		return this.#store as IWidgetStore;
	}

	show() {
		this.#store.loadSidebarItems();
	}

	hide() {
		this.#store.hide();
	}
}
