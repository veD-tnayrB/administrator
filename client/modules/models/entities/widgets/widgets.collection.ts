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
}
