import { DB } from '@essential-js/admin-server/db';

export interface IPublish {
	id: string;
	modules: Record<string, Record<string, boolean>>;
	name: string;
	description: string;
	timeCreated: Date;
	timeUpdated: Date;
}

export class Publish {
	static model: typeof DB.models.Profiles = DB.models.Profiles;
	static modulesModel: typeof DB.models.ProfileModulePermissions = DB.models.ProfileModulePermissions;

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

	static async create(params: IPublish) {
		const transaction = await DB.sequelize.transaction();
		try {
			const { modules, ...profileData } = params;
			const profile = await Publish.model.create(profileData, { transaction });
			await this.handleModules(profileData.id, modules, transaction);
			await transaction.commit();
			return { status: true, data: { id: profileData.id } };
		} catch (error) {
			await transaction.rollback();
			return { status: false, error: { message: 'Failed to create profile', error, target: 'profile/update' } };
		}
	}

	static async update(params: IPublish) {
		const transaction = await DB.sequelize.transaction();
		try {
			const { id, modules, ...profileData } = params;
			await Publish.model.update(profileData, { where: { id }, transaction });
			await this.handleModules(id, modules, transaction);
			await transaction.commit();
			return { status: true, data: { id } };
		} catch (error) {
			await transaction.rollback();
			return { status: false, error: { message: 'Failed to update profile', error, target: 'profile/update' } };
		}
	}
}
