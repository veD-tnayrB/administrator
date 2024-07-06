import { DB } from '@essential-js/admin-server/db';
import { Manager } from '@essential-js/admin-server/helpers';
import { GetDashboard, IGetDashboardParams } from './cases/dashboard/get';
import { ISaveDashboardParams, SaveDashboard } from './cases/dashboard/save';
import { IWidget } from '@essential-js/admin-server/types';
import { GetTotals } from './cases/widgets/get-totals';
import { GetUsersLocation } from './cases/widgets/get-users-location';

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
	getTotals = GetTotals.execute;
	getUsersLocation = GetUsersLocation.execute;
}

export /*bundle*/ const Widgets = new WidgetsManager();
