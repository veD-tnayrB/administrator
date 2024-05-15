import { ItemProvider } from '@essential-js/admin/helpers';

export class NotificationItemProvider extends ItemProvider {
	constructor() {
		super({
			endpoints: {
				publish: 'notification',
				get: 'notification',
				delete: 'notification',
			},
		});
	}

	launch = async ({ id }: { id: string }) => {
		return this.api.get(`notification/launch/${id}`);
	};

	markAsRead = async ({ id, userId }: { id: string; userId: string }) => {
		return this.api.put('notification/markAsRead', { id: id, userId: userId });
	};
}
