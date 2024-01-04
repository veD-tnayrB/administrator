import { Collection } from '@beyond-js/reactive/entities';
import config from '@essential-js/admin/config';
import { Notification } from './notification.item';
import { NotificationsCollectionProvider } from '../../providers/notifications/notifications.collection.provider';

export /*bundle*/ class Notifications extends Collection {
	constructor() {
		super({
			provider: NotificationsCollectionProvider,
			storeName: 'notifications',
			db: config.params.application.localDB,
			localdb: true,
			item: Notification,
		});
	}
}
