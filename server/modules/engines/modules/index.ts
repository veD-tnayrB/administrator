import { DB } from '@essential-js/admin-server/db';
import { Manager } from '@essential-js/admin-server/helpers';
import { actions } from '@bgroup/data-model/db';

export class ModulesManager extends Manager {
	constructor() {
		super({ model: DB.models.Modules });
	}

	list = async params => {
		const modulesResponse = await this.model.findAll({});
		const modules = modulesResponse.map(module => module.get({ plain: true }));

		const permissionsResponse = await DB.models.ProfileModulePermissions.findAll({
			include: [
				{
					model: DB.models.Profiles,
					as: 'profile',
				},
				{
					model: DB.models.Permissions,
					as: 'permission',
				},
			],
		});
		const permissions = permissionsResponse.map(permission => permission.get({ plain: true }));

		const modulesPermissions = new Map();
		permissions.forEach(permission => {
			const existingPermissions = modulesPermissions.get(permission.moduleId) || [];
			existingPermissions.push({
				permissionId: permission.permission.id,
				permissionName: permission.permission.name,
				profileId: permission.profileId,
				profileName: permission.profile.name,
			});
			modulesPermissions.set(permission.moduleId, existingPermissions);
		});

		console.log('PER,ONS => ', modulesPermissions);

		const result = modules.map(module => {
			return {
				...module,
				permissions: modulesPermissions.get(module.id) || [],
			};
		});

		console.log('RESULT => ');

		return { status: true, data: result };
	};
}

export /*bundle*/ const Modules = new ModulesManager();
