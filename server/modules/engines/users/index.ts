import { DB } from '@essential-js/admin-server/db';
import { Manager, ExcelHandler, IBulkImport, IGetTemplate, IGenerateReport } from '@essential-js/admin-server/helpers';
import { IGetRegisteredUsersByMonth, getRegisteredUsersByMonth } from './cases/get-registered-users-by-month';
import { Publish } from './cases/publish';
import { IUser } from '@essential-js/admin-server/types';

export /*bundle*/ interface IUser {
	id: string;
	active: boolean;
	email: string;
	lastNames: string;
	profiles: string[];
	names: string;
	timeCreated: Date;
	timeUpdated: Date;
}

export class UsersManager extends Manager {
	declare model: typeof DB.models.Users;
	declare managerName: string;
	#excelHandler: ExcelHandler;

	constructor() {
		super({ model: DB.models.Users, managerName: 'users' });
		this.#excelHandler = new ExcelHandler({
			model: this.model,
			managerName: 'users',
			templateConfig: {
				ID: 'id',
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

	create = (params: IUser) => {
		return Publish.create(params, `/create/${this.managerName}`);
	};

	update = (params: IUser) => {
		return Publish.update(params, `/update/${this.managerName}`);
	};

	get = async (params: { id: string }) => {
		try {
			const specs: any = { where: { id: params.id } };
			const dataModel = await this.model.findOne(specs);
			if (!dataModel) return { status: true, data: [] };
			const data = dataModel.get({ plain: true });

			const profiles = await DB.models.UsersProfiles.findAll({
				where: { userId: params.id },
			});
			data.profiles = profiles.map((profile) => profile.dataValues.profileId);

			return { status: true, data };
		} catch (exc) {
			return {
				status: false,
				error: { message: exc, target: `/get/${this.managerName}` },
			};
		}
	};
}

export /*bundle*/ const Users = new UsersManager();
