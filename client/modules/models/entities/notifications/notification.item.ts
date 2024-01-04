import { Item } from '@beyond-js/reactive/entities';
import config from '@essential-js/admin/config';
import { NotificationItemProvider } from '../../providers/notifications/notification.item.provider';

export /*bundle*/ interface INotification {
	id: string;
	title: string;
	description: string;
	icon: string;
	timeInterval: number;
	status: string;
	timeCreated: Date;
	timeUpdated: Date;
}

export /*bundle*/ class Notification extends Item<INotification> {
	protected properties = [
		'id',
		'title',
		'description',
		'icon',
		'timeInterval',
		'status',
		'timeCreated',
		'timeUpdated',
	];

	constructor(params: { id: string | undefined } = { id: undefined }) {
		super({
			provider: NotificationItemProvider,
			storeName: 'notifications',
			db: config.params.application.localDB,
			...params,
		});
	}
}
