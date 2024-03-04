import { ReactWidgetController } from '@beyond-js/react-18-widgets/base';
import { StoreManager } from './store';
import { View } from './views';

export /*bundle*/
class Controller extends ReactWidgetController {
	#store: StoreManager;
	//@ts-ignore
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
	load() {}

	/**
	 * this method is executed when the widget is hidden
	 */
	hide() {}
}
