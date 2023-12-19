import { ReactWidgetController } from '@beyond-js/react-18-widgets/base';
import { Layout } from './main.layout.index';
import { ns_2 } from '@beyond-js/widgets/controller';
import { StoreManager } from './store';

export /*bundle*/
class Controller extends ReactWidgetController {
	get Widget() {
		return Layout;
	}

	#store;

	createStore(language?: string): ns_2.IWidgetStore {
		this.#store = new StoreManager();
		this.#store.loadSidebarItems();
		return this.#store;
	}
}
