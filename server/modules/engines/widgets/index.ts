import { DB } from '@essential-js/admin-server/db';
import { Manager } from '@essential-js/admin-server/helpers';

export class WidgetsManager extends Manager {
	constructor() {
		super({ model: DB.models.Widgets });
	}

	getTotals = async () => {
		try {
			const users = await DB.models.Users.findAll({});
			const notifications = await DB.models.Notifications.findAll({});
			const profiles = await DB.models.Profiles.findAll({});

			return { status: true, data: { users: users.length, notifications: notifications.length, profiles: profiles.length } };
		} catch (error) {
			return { status: false, error };
		}
	};
}

export /*bundle*/ const Widgets = new WidgetsManager();
