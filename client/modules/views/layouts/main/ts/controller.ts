import { ReactWidgetController } from '@beyond-js/react-18-widgets/base';
import { Layout } from './main.layout.index';
import { StoreManager, layoutStore } from './store';
import { IWidgetStore } from '@beyond-js/widgets/controller';

export /*bundle*/
class Controller extends ReactWidgetController {
	get Widget() {
		return Layout;
	}

	#store: StoreManager = layoutStore;

	createStore() {
		this.#store = layoutStore;
		return this.#store as IWidgetStore;
	}

	show() {
		this.#store.loadSidebarItems();
	}

	hide() {
		this.#store.hide();
	}
}
