import { DB } from '@essential-js/admin-server/db';
import { Manager } from '@essential-js/admin-server/helpers';
import { IPublish, Publish } from './cases/publish';
import { IListParams, List } from './cases/lists';

export class ModulesManager extends Manager<IPublish> {
	constructor() {
		super({ model: DB.models.Modules, managerName: 'modules' });
	}

	list = async (params: IListParams) => {
		return List.execute(params);
	};

	create = (params: Partial<IPublish>) => {
		return Publish.create(params, '/modules/create');
	};

	update = (params: IPublish) => {
		return Publish.update(params, '/modules/update');
	};
}

export /*bundle*/ const Modules = new ModulesManager();
