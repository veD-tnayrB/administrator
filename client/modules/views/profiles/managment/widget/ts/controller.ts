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
		const id = this.uri.vars.get('id');
		this.#store.load({ id });
	}

	/**
	 * this method is executed when the widget is hidden
	 */
	hide() {
		this.#store.reset();
	}
}
