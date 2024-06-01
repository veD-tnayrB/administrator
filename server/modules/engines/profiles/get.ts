import { DB } from '@essential-js/admin-server/db';
import { actions } from '@bgroup/data-model/db';

export interface IGetParams {
	id: string;
	include?: unknown[];
}

export class Get {
	static model: typeof DB.models.Profiles = DB.models.Profiles;

	static execute = async (params: IGetParams) => {
		try {
			params.include = [
				{
					model: DB.models.ProfileModulePermissions,
					as: 'profileModulePermissions',
					include: [
						{
							model: DB.models.ModulesActions,
							as: 'action',
							include: [
								{
									model: DB.models.Modules,
									as: 'module',
								},
							],
						},
					],
				},
				{
					model: DB.models.WidgetsProfiles,
					as: 'widgetsProfiles',
					include: [
						{
							model: DB.models.Widgets,
							as: 'widget',
						},
					],
				},
			];
			const response = await actions.data(this.model, params, `/get/profile`);
			if (!response.status) throw response.error;

			const profile = response.data;
			const moduleMap = {};
			profile.profileModulePermissions.forEach((permission) => {
				const moduleId = permission.action.module.id;
				if (!moduleMap[moduleId]) {
					moduleMap[moduleId] = {
						id: permission.action.module.id,
						label: permission.action.module.label,
						to: permission.action.module.to,
						icon: permission.action.module.icon,
						actions: [],
					};
				}
				moduleMap[moduleId].actions.push({
					id: permission.action.id,
					name: permission.action.name,
					description: permission.action.description,
					timeCreated: permission.action.timeCreated,
					timeUpdated: permission.action.timeUpdated,
				});
			});

			const modulesArray = Object.values(moduleMap);

			const widgetsProfiles = profile.widgetsProfiles.map((wp) => ({
				id: wp.widget.id,
				identifier: wp.widget.identifier,
				columnPosition: wp.columnPosition,
				rowPosition: wp.rowPosition,
				width: wp.widget.width,
				height: wp.widget.height,
				order: wp.widget.order,
			}));

			const result = {
				id: profile.id,
				name: profile.name,
				description: profile.description,
				timeCreated: profile.timeCreated,
				timeUpdated: profile.timeUpdated,
				modules: modulesArray,
				widgets: widgetsProfiles,
			};

			return { status: true, data: result };
		} catch (error) {
			return { status: false, error };
		}
	};
}
