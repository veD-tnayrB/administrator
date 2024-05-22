import { DB } from '@essential-js/admin-server/db';
import { Manager, List } from '@essential-js/admin-server/helpers';
import { IPublish, Publish } from './cases/publish';
import { IAction } from '@essential-js/admin-server/types';

export class ModulesManager extends Manager {
	declare model: typeof DB.models.Modules;
	constructor() {
		super({ model: DB.models.Modules });
	}

	list = async (params) => {
		try {
			const include = [
				{
					model: DB.models.ModulesActions,
					as: 'modulesActions',
				},
			];
			params.include = include;
			const response = await List.execute(this.model, params, 'modules/list');
			if (!response.status) throw response.error;

			const modules = response.data.entries.map((module) => {
				module.actions = module.modulesActions.map((action: IAction) => ({
					id: action.id,
					name: action.name,
					description: action.description,
				}));
				return module;
			});

			return { status: true, data: { entries: modules } };
		} catch (error) {
			console.error('ERROR GETTING MODULE LIST: ', error);
			return { status: false, error };
		}
	};

	create = (params: IPublish) => {
		return Publish.create(params, '/modules/create');
	};

	update = (params: IPublish) => {
		return Publish.update(params, '/modules/update');
	};
}

export /*bundle*/ const Modules = new ModulesManager();
