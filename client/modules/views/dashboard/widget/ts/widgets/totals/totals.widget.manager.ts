import { ReactiveModel } from '@beyond-js/reactive/model';
import { ITotalItem } from './components/total.item.widget';
import { HARDCODED_DATA } from './data';

export class TotalsWidgetManager extends ReactiveModel<TotalsWidgetManager> {
	#data: ITotalItem[] = [];

	get data() {
		return this.#data;
	}

	load = () => {
		try {
			this.fetching = true;

			setTimeout(() => {
				this.#data = HARDCODED_DATA;
				this.fetching = false;
			}, 1000);
		} catch (error) {
			console.error(error);
			return error;
		} finally {
		}
	};
}
