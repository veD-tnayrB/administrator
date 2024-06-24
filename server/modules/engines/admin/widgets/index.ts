import { DB } from '@essential-js/admin-server/db';
import { Manager } from '@essential-js/admin-server/helpers';
import { GetDashboard, IGetDashboardParams } from './cases/dashboard/get';
import { ISaveDashboardParams, SaveDashboard } from './cases/dashboard/save';
import { IWidget } from '@essential-js/admin-server/types';

export class WidgetsManager extends Manager<IWidget> {
	constructor() {
		super({ model: DB.models.Widgets, managerName: 'widgets' });
	}

	getDashboard = (params: IGetDashboardParams) => {
		return GetDashboard.execute(params);
	};

	saveDashboard = (params: ISaveDashboardParams) => {
		return SaveDashboard.execute(params);
	};

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
