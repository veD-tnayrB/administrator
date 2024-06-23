import { DB } from '@essential-js/admin-server/db';
import { Manager, ExcelHandler, IBulkImport, IGetTemplate, IGenerateReport } from '@essential-js/admin-server/helpers';
import { IProfile } from '@essential-js/admin-server/types';
import { Get, IGetParams } from './get';
import { IPublish, Publish } from './publish';

export class ProfilesManager extends Manager<IProfile> {
	#excelHandler: ExcelHandler;
	constructor() {
		super({ model: DB.models.Profiles, managerName: 'profiles' });
		this.#excelHandler = new ExcelHandler({
			model: this.model,
			managerName: 'profiles',
			templateConfig: {
				ID: 'id',
				Name: 'name',
				Description: 'description',
				Active: 'active',
				'Created at': 'timeCreated',
				'Updated at': 'timeUpdated',
			},
		});
	}

	bulkImport = (params: IBulkImport) => {
		return this.#excelHandler.bulkImport(params);
	};

	generateReport = (params: IGenerateReport) => {
		return this.#excelHandler.generateReport(params);
	};

	getTemplate = (params: IGetTemplate) => {
		return this.#excelHandler.getTemplate(params);
	};

	get = (params: IGetParams) => {
		return Get.execute(params);
	};

	create = (params: IPublish) => {
		return Publish.create(params);
	};

	update = (params: IPublish) => {
		return Publish.update(params);
	};
}

export /*bundle*/ const Profiles = new ProfilesManager();
