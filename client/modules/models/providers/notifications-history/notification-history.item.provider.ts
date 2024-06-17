import { ItemProvider } from '@essential-js/admin/helpers';
import { INotificationHistory } from '../../entities/notifications-history/notification-history.item';

export class NotificationHistoryItemProvider extends ItemProvider<INotificationHistory> {
	constructor() {
		super({
			endpoints: {
				publish: '',
				get: '',
				delete: '',
			},
		});
	}
}
