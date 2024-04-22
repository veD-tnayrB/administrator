import { DB } from '@essential-js/admin-server/db';
import { actions } from '@bgroup/data-model/db';
import { Manager, ExcelHandler, IBulkImport, IGetTemplate, IGenerateReport } from '@essential-js/admin-server/helpers';

export class ProfilesManager extends Manager {
	declare model: typeof DB.models.Profiles;
	#excelHandler: ExcelHandler;
	constructor() {
		super({ model: DB.models.Profiles });
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

	get = async (params: { id: string; include?: unknown[] }) => {
		try {
			params.include = [
				{
					model: DB.models.ProfileModulePermissions, // Asegúrate de que este modelo está correctamente definido
					as: 'profileModulePermissions',
					include: [
						{
							model: DB.models.ModulesActions,
							as: 'action', // Asegúrate de que esta asociación está configurada en el modelo
							include: [
								{
									model: DB.models.Modules,
									as: 'module',
								},
							],
						},
					],
				},
			];
			const response = await actions.data(this.model, params, `/get/profile`);
			if (!response.status) throw response.error;

			const profile = response.data;
			const moduleMap = {};
			profile.profileModulePermissions.forEach(permission => {
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

			const result = {
				id: profile.id,
				name: profile.name,
				description: profile.description,
				timeCreated: profile.timeCreated,
				timeUpdated: profile.timeUpdated,
				modules: modulesArray,
			};

			return { status: true, data: result };
		} catch (error) {
			return { status: false, error };
		}
	};
}

export /*bundle*/ const Profiles = new ProfilesManager();
