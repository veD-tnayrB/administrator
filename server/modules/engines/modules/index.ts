import { DB } from '@essential-js/admin-server/db';
import { Manager } from '@essential-js/admin-server/helpers';

export class ModulesManager extends Manager {
	declare model: DB.models.Modules;
	constructor() {
		super({ model: DB.models.Modules });
	}

	list = async params => {
		const modulesResponse = await this.model.findAll({
			include: [
				{
					model: DB.models.ModulesActions,
					as: 'actions',
				},
			],
		});
		const modules = modulesResponse.map(module => {
			const moduleData = module.get({ plain: true });
			moduleData.actions = moduleData.actions.map(action => ({
				id: action.id,
				name: action.name,
				description: action.description,
			}));
			return moduleData;
		});

		return { status: true, data: { entries: modules } };
	};
}

export /*bundle*/ const Modules = new ModulesManager();
