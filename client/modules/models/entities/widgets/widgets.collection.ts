import { Collection } from '@beyond-js/reactive/entities';
import config from '@essential-js/admin/config';
import { WidgetsCollectionProvider } from '../../providers/widgets/widgets.collection.provider';
import { Widget } from './widget.item';

export /*bundle*/ class Widgets extends Collection {
	constructor() {
		super({
			provider: WidgetsCollectionProvider,
			storeName: 'widgets',
			db: config.params.application.localDB,
			localdb: true,
			item: Widget,
		});
	}

	getDashboard = (params: { userId: string }) => {
		if (!this.provider.getDashboard) return;
		return this.provider.getDashboard(params);
	};

	saveDashboard = (selectedWidgets: Widget[]) => {
		if (!this.provider.saveDashboard) return;
		return this.provider.saveDashboard(selectedWidgets);
	};

	getTotals = () => {
		if (!this.provider.getTotals) return;
		return this.provider.getTotals();
	};

	getUsersLocation = () => {
		if (!this.provider.getUsersLocation) return;
		return this.provider.getUsersLocation();
	};
}
