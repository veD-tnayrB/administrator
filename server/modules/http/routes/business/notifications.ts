import { Notifications } from '@essential-js/admin-server/engines/notifications';
import { Route } from '@essential-js/admin-server/helpers';

class NotificationsRoutes extends Route {
	constructor() {
		super({
			manager: Notifications,
			endpoints: {
				plural: 'notifications',
				singular: 'notification',
			},
		});
	}
}

export const notifications = new NotificationsRoutes();
