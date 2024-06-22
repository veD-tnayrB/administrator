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

			const response = await Get.model.findOne({ where: { id: params.id }, include: params.include });
			if (!response) return { status: true, data: null };

			const profile = response.dataValues;
			const moduleMap = {};
			profile.profileModulePermissions.forEach((permission) => {
				const action = permission.dataValues.action.dataValues;
				const module = action.module.dataValues;
				const moduleId = module.id;

				if (!moduleMap[moduleId]) {
					moduleMap[moduleId] = {
						id: module.id,
						label: module.label,
						to: module.to,
						icon: module.icon,
						actions: [],
					};
				}
				moduleMap[moduleId].actions.push({
					id: action.id,
					name: action.name,
					description: action.description,
					timeCreated: action.timeCreated,
					timeUpdated: action.timeUpdated,
				});
			});

			const modulesArray = Object.values(moduleMap);

			const widgetsProfiles = profile.widgetsProfiles.map((wp) => {
				const widgetProfile = wp.dataValues;
				const widget = widgetProfile.widget.dataValues;

				return {
					id: widget.id,
					identifier: widget.identifier,
					columnPosition: widgetProfile.columnPosition,
					rowPosition: widgetProfile.rowPosition,
					width: widget.width,
					height: widget.height,
					order: widget.order,
				};
			});

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
