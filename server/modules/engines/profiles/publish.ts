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
		// Destruye asociaciones previas de widgets para este perfil
		await Publish.widgetsModel.destroy({ where: { profileId }, transaction });

		// Crea nuevas asociaciones de widgets
		const records = widgets.map((widgetId) => ({ id: uuid(), profileId, widgetId }));
		await Publish.widgetsModel.bulkCreate(records, { transaction });

		// Obtener todos los usuarios vinculados a este perfil
		const userProfileLinks = await DB.models.UsersProfiles.findAll({
			where: { profileId },
			attributes: ['userId'],
			transaction,
			raw: true,
		});

		// Iterar sobre cada usuario para actualizar sus widgets
		for (const link of userProfileLinks) {
			const userId = link.userId;

			// Obtener todos los perfiles del usuario
			const userProfiles = await DB.models.UsersProfiles.findAll({
				where: { userId },
				attributes: ['profileId'],
				transaction,
				raw: true,
			});
			const profileIds = userProfiles.map((up: { profileId: string }) => up.profileId);

			const allWidgetsForUser = await DB.models.WidgetsProfiles.findAll({
				where: { profileId: { [Op.in]: profileIds } },
				attributes: ['widgetId'],
				transaction,
				raw: true,
			});

			const widgetIds = allWidgetsForUser.map((wp: { widgetId: string }) => wp.widgetId);

			// Determinar si algún widget ya no está asociado a los perfiles activos del usuario
			const widgetsToRemove = await DB.models.UsersWidgets.findAll({
				where: {
					userId,
					widgetId: { [Op.notIn]: widgetIds }, // Solo selecciona widgets no presentes en los perfiles activos
				},
				attributes: ['widgetId'],
				transaction,
				raw: true,
			});

			// Elimina widgets del dashboard del usuario que ya no están asociados a ningún perfil activo
			const widgetIdsToRemove = widgetsToRemove.map((w: { widgetId: string }) => w.widgetId);
			if (widgetIdsToRemove.length > 0) {
				await DB.models.UsersWidgets.destroy({
					where: {
						userId,
						widgetId: { [Op.in]: widgetIdsToRemove },
					},
					transaction,
				});
			}
		}
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
