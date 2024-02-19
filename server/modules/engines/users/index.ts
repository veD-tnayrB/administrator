import { DB } from '@essential-js/admin-server/db';
import { Manager, ExcelHandler, IBulkImport, IGetTemplate, IGenerateReport } from '@essential-js/admin-server/helpers';
import { IGetRegisteredUsersByMonth, getRegisteredUsersByMonth } from './cases/get-registered-users-by-month';

export class UsersManager extends Manager {
	declare model: typeof DB.models.Users;
	#excelHandler: ExcelHandler;

	constructor() {
		super({ model: DB.models.Users, managerName: 'users' });
		this.#excelHandler = new ExcelHandler({
			model: this.model,
			managerName: 'users',
			templateConfig: {
				id: 'id',
				Names: 'names',
				'Last names': 'lastNames',
				Active: 'active',
				Email: 'email',
				'Created at': 'timeCreated',
				'Updated at': 'timeUpdated',
			},
		});
	}

	getRegisteredUsersByMonth = async (params: IGetRegisteredUsersByMonth) => {
		return getRegisteredUsersByMonth({ ...params, model: this.model });
	};

	bulkImport = (params: IBulkImport) => {
		return this.#excelHandler.bulkImport(params);
	};

	generateReport = (params: IGenerateReport) => {
		return this.#excelHandler.generateReport(params);
	};

	getTemplate = (params: IGetTemplate) => {
		return this.#excelHandler.getTemplate(params);
	};
}

export /*bundle*/ const Users = new UsersManager();
