import { Collection } from '@beyond-js/reactive/entities';
import config from '@essential-js/admin/config';
import { NotificationHistory } from './notification-history.item';
import { NotificationsHistoryCollectionProvider } from '../../providers/notifications-history/notifications-history.collection.provider';

export /*bundle*/ class NotificationsHistory extends Collection {
	constructor() {
		super({
			provider: NotificationsHistoryCollectionProvider,
			storeName: 'notifications-history',
			db: config.params.application.localDB,
			localdb: true,
			item: NotificationHistory,
		});
	}

	markAsRead = async (params: { ids: string[]; userId: string }) => {
		try {
			if (!this.provider.markAsRead) return;
			const response = await this.provider.markAsRead(params);
			if (!response.status) throw response.error;

			return { status: true };
		} catch (error) {
			console.error('ERROR MARK AS READ', error);
			return { status: false, error };
		}
	};
}
