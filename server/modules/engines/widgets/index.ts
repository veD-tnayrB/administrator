import { DB } from '@essential-js/admin-server/db';
import { Manager } from '@essential-js/admin-server/helpers';
import { GetDashboard } from './cases/dashboard/get';
import { SaveDashboard } from './cases/dashboard/save';

export class WidgetsManager extends Manager {
	constructor() {
		super({ model: DB.models.Widgets });
	}

	getDashboard = GetDashboard.execute;

	saveDashboard = SaveDashboard.execute;

	getTotals = async () => {
		try {
			const users = await DB.models.Users.findAll({});
			const notifications = await DB.models.Notifications.findAll({});
			const profiles = await DB.models.Profiles.findAll({});

			return {
				status: true,
				data: { users: users.length, notifications: notifications.length, profiles: profiles.length },
			};
		} catch (error) {
			return { status: false, error };
		}
	};
}

export /*bundle*/ const Widgets = new WidgetsManager();
