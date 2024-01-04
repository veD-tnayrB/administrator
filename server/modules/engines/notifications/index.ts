import { DB } from '@essential-js/admin-server/db';
import { Manager } from '@essential-js/admin-server/helpers';

export class NotificationsManager extends Manager {
	constructor() {
		super({ model: DB.models.Notifications });
	}
}

export /*bundle*/ const Notifications = new NotificationsManager();
