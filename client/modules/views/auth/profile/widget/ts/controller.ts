import { PageReactWidgetController } from '@beyond-js/react-18-widgets/page';
import { StoreManager } from './store';
import { View } from './views';
import { IWidgetStore } from '@beyond-js/widgets/controller';

export /*bundle*/
class Controller extends PageReactWidgetController {
	#store: StoreManager = new StoreManager();
	declare uri: { vars: Map<string, string> };

	createStore() {
		this.#store = new StoreManager();
		return this.#store as IWidgetStore;
	}
	get Widget() {
		return View;
	}

	/**
	 * this method is executed when the widget is showd
	 */
	show() {
		this.#store.load();
	}

	/**
	 * this method is executed when the widget is hidden
	 */
	hide() {
		this.#store.reset();
	}
}
