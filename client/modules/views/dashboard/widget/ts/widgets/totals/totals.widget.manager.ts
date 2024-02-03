import { ReactiveModel } from '@beyond-js/reactive/model';
import { Widgets } from '@essential-js/admin/models';

export class TotalsWidgetManager extends ReactiveModel<TotalsWidgetManager> {
	#data: Record<string, number> = {};
	#totalsCollection: Widgets = new Widgets();

	get data() {
		return this.#data;
	}

	load = async () => {
		try {
			this.fetching = true;
			const response = await this.#totalsCollection.getTotals();
			if (!response.status) throw response.error;
			// this.#data = response.data;
		} catch (error) {
			console.error(error);
			return error;
		} finally {
			this.fetching = false;
		}
	};
}
