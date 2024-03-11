import { DB } from '@essential-js/admin-server/db';

export interface IGet {
	id: string;
}

export class Get {
	static model: DB.models.Notifications = DB.models.Notifications;
	static usersNotificationsModel: DB.models.UsersProfiles = DB.models.UsersNotifications;
	static profilesNotificationsModel: DB.models.ProfilesNotifications = DB.models.ProfilesNotifications;

	static execute = async (params: { id: string }) => {
		try {
			const notificationFind = await Get.model.findOne({
				where: { id: params.id },
				include: [
					{
						model: Get.usersNotificationsModel,
						attributes: ['userId'], // Solo selecciona la columna userId
						as: 'usersNotifications', // El nombre del alias definido en las asociaciones
					},
					{
						model: Get.profilesNotificationsModel,
						attributes: ['profileId'], // Solo selecciona la columna profileId
						as: 'profilesNotifications', // El nombre del alias definido en las asociaciones
					},
				],
			});
			if (!notificationFind) throw 'NOTIFICATION_DOESNT_EXISTS';
			const notification = notificationFind.dataValues;

			// Como ahora 'notification' incluye las asociaciones, puedes extraer los IDs directamente
			const users = notification.usersNotifications.map(un => un.dataValues.userId);
			const profiles = notification.profilesNotifications.map(pn => pn.dataValues.profileId);

			const result = {
				...notification,
				users: users,
				profiles: profiles,
			};
			return { status: true, data: result };
		} catch (error) {
			console.error(error);
			return { status: false, error };
		}
	};
}
