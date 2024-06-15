import { PageReactWidgetController } from '@beyond-js/react-18-widgets/page';
import { IWidgetStore } from '@beyond-js/widgets/controller';
import { StoreManager } from './store';
import { View } from './views';
import { routing } from '@beyond-js/kernel/routing';

export /*bundle*/
class Controller extends PageReactWidgetController {
	#store: StoreManager = new StoreManager();
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
		if (!routing.uri.qs.has('token')) routing.pushState('/auth/login');
	}

	/**
	 * this method is executed when the widget is hidden
	 */
	hide() {
		this.#store.reset();
	}
}
