import { DB } from '@essential-js/admin-server/db';
import { v4 as uuid } from 'uuid';

export interface IPublish {
	id: string;
	title: string;
	description: string;
	icon: string;
	status: string;
	profiles: string[];
	users: string[];
}

export class Publish {
	static model: typeof DB.models.Notifications = DB.models.Notifications;
	static usersNotificationsModel: typeof DB.models.UsersProfiles = DB.models.UsersNotifications;
	static profilesNotificationsModel: typeof DB.models.ProfilesNotifications = DB.models.ProfilesNotifications;

	static handleRelations = async (notificationId: string, profiles: string[], users: string[], transaction) => {
		const notification = await Publish.model.findOne({ where: { id: notificationId }, transaction });
		if (!notification) throw 'NOTIFICATION_WASNT_CREATED_CORRECTLY';

		await Publish.usersNotificationsModel.destroy({ where: { notificationId } }, { transaction });
		await Publish.profilesNotificationsModel.destroy({ where: { notificationId } }, { transaction });

		if (profiles.length) {
			const profilesToCreate = profiles.map((profileId) => ({ id: uuid(), notificationId, profileId }));

			await Publish.profilesNotificationsModel.bulkCreate(profilesToCreate, { transaction });
		}
		if (users.length) {
			const usersToCreate = users.map((userId) => ({ id: uuid(), notificationId, userId }));

			await Publish.usersNotificationsModel.bulkCreate(usersToCreate, { transaction });
		}
	};

	static create = async <T>(params: IPublish, target: string) => {
		const transaction = await DB.sequelize.transaction();
		try {
			const { profiles, users, ...notification } = params;
			await Publish.model.create(notification, { transaction });
			await this.handleRelations(params.id, profiles || [], users || [], transaction);

			await transaction.commit();
			return { status: true, data: { id: notification.id } };
		} catch (error) {
			await transaction.rollback();
			return { status: false, error: { error, target } };
		}
	};

	static update = async <T>(params: IPublish, target: string) => {
		const transaction = await DB.sequelize.transaction();
		try {
			const { id, profiles, users, ...notification } = params;
			await Publish.model.update(notification, { where: { id }, transaction });
			await this.handleRelations(id, profiles || [], users || [], transaction);

			await transaction.commit();
			return { status: true, data: { id } };
		} catch (error) {
			await transaction.rollback();
			return { status: false, error: { error, target } };
		}
	};
}
