import { DB } from '@essential-js/admin-server/db';
import { v4 as uuid } from 'uuid';
import { Op } from 'sequelize';

export interface IPublish {
	id: string;
	modules: Record<string, Record<string, boolean>>;
	name: string;
	description: string;
	timeCreated: Date;
	widgets: string[];
	timeUpdated: Date;
}

export class Publish {
	static model: typeof DB.models.Profiles = DB.models.Profiles;
	static modulesModel: typeof DB.models.ProfileModulePermissions = DB.models.ProfileModulePermissions;
	static widgetsModel: typeof DB.models.WidgetsProfiles = DB.models.WidgetsProfiles;
	static usersWidgetsModel: typeof DB.models.UsersWidgets = DB.models.UsersWidgets;

	static async handleModules(profileId: string, modules: Record<string, Record<string, boolean>>, transaction) {
		const profile = await Publish.model.findByPk(profileId, { transaction });
		if (!profile) throw 'PROFILE_WASNT_CREATED_CORRECTLY';

		// First, remove all existing permissions for the profile
		await Publish.modulesModel.destroy({
			where: { profileId },
			transaction,
		});

		// Prepare bulk insert data
		const permissionsToInsert = [];
		Object.entries(modules).forEach(([moduleId, actions]) => {
			Object.entries(actions).forEach(([actionId, allowed]) => {
				if (allowed) {
					permissionsToInsert.push({
						profileId,
						moduleId,
						actionId,
					});
				}
			});
		});

		// Bulk insert new permissions
		await Publish.modulesModel.bulkCreate(permissionsToInsert, { transaction });
	}

	static async handleWidgets(profileId: string, widgets: string[], transaction) {
		await Publish.widgetsModel.destroy({ where: { profileId }, transaction });
		const records = widgets.map((widgetId) => ({ id: uuid(), profileId, widgetId }));
		await Publish.widgetsModel.bulkCreate(records, { transaction });

		// Get the users associated with current modififyng profile
		
		// Get the widgets associated with each users profile's

		// Check for each widgetProfile if the user has other profile with the same widget that is being iterated

		// If not, remove the widget for the user
	}

	static async create(params: IPublish) {
		const transaction = await DB.sequelize.transaction();
		try {
			const { modules, widgets, ...profileData } = params;
			const profile = await Publish.model.create(profileData, { transaction });
			await this.handleModules(profileData.id, modules, transaction);
			await this.handleWidgets(profileData.id, widgets || [], transaction);
			await transaction.commit();
			return { status: true, data: { id: profileData.id } };
		} catch (error) {
			await transaction.rollback();
			return { status: false, error: { message: 'Failed to create profile', error, target: 'profile/update' } };
		}
	}

	static async update(params: IPublish) {
		console.log('USERID: ', params);
		const transaction = await DB.sequelize.transaction();
		try {
			const { id, modules, widgets, ...profileData } = params;
			await Publish.model.update(profileData, { where: { id }, transaction });
			await this.handleModules(id, modules, transaction);
			await this.handleWidgets(id, widgets || [], transaction);
			await transaction.commit();
			return { status: true, data: { id } };
		} catch (error) {
			await transaction.rollback();
			return { status: false, error: { message: 'Failed to update profile', error, target: 'profile/update' } };
		}
	}
}
