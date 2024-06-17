import { Item } from '@beyond-js/reactive/entities';
import config from '@essential-js/admin/config';
import { NotificationItemProvider } from '../../providers/notifications/notification.item.provider';
import { INotification } from '../notifications/notification.item';

export /*bundle*/ enum NotificationHistoryStatus {
	Sent = 'sent',
	Read = 'read',
	Failed = 'failed',
}

export /*bundle*/ interface INotificationHistory {
	id: string;
	isNew: boolean;
	notificationId: string;
	userId: string;
	notification: INotification;
	timeSent: Date;
	status: NotificationHistoryStatus;
}

export /*bundle*/ class NotificationHistory extends Item<INotificationHistory> {
	protected properties = ['id', 'notificationId', 'userId', 'notification', 'timeSent', 'status'];

	get formatedFrecuency() {
		if (!this.frecuency) return [];
		return JSON.parse(this.frecuency);
	}

	constructor(params: { id?: string | undefined } = { id: undefined }) {
		super({
			provider: NotificationItemProvider,
			storeName: 'notifications-history',
			db: config.params.application.localDB,
			...params,
		});
	}
}
