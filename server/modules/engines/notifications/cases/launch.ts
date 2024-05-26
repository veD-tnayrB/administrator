import { DB } from '@essential-js/admin-server/db';
import { sender } from '../library/sender';

export interface ILaunch {
	id: string;
}

export class Launch {
	static execute = async (params: ILaunch) => {
		try {
			const notifications = await Launch.getNotification(params);
			if (!notifications.status) throw new Error(`ERROR GETTING NOTIFICATION TO LAUNCH ${notifications.error}`);

			const users = await Launch.getUsers(notifications.data);
			if (!users.status) throw new Error(`ERROR GETTING USERS TO NOTIFY ${users.error}`);

			const result = await Launch.sendNotifications(users.data);
			if (!result.status) throw new Error(`ERROR SENDING NOTIFICATION ${result.error}`);

			return { status: true };
		} catch (error) {
			console.error('ERROR SENDING NOTIFICATIONS: ', error);
			return { status: false, error };
		}
	};

	static getNotification = async ({ id }: ILaunch) => {
		try {
			if (!id) throw new Error('NOTIFICATION_TO_LAUNCH_NOT_PROVIDED');
			const notificationRegistry = await DB.models.Notifications.findOne({ where: { id } });
			if (!notificationRegistry) throw new Error('NOTIFICATION_NOT_FOUND');
			const notification = notificationRegistry.dataValues;

			return { status: true, data: notification };
		} catch (error) {
			return { status: false, error };
		}
	};

	static getUsers = async (notification) => {
		try {
			let result = {};

			const notificationId = notification.id;

			const directUsersNotifications = await DB.models.UsersNotifications.findAll({
				where: { notificationId },
				include: [
					{
						model: DB.models.Users,
						as: 'user',
						include: [
							{
								model: DB.models.AccessTokens,
								as: 'accessTokens',
								attributes: ['notificationsToken', 'timezone'],
							},
						],
					},
				],
			});

			let directUsers = directUsersNotifications.map((notificationInstance) => {
				const { dataValues: notification } = notificationInstance;
				const user = notification.user.dataValues;

				const notificationToken = user.accessTokens.map(
					(accessToken) => accessToken.dataValues.notificationsToken,
				);
				return {
					userId: user.id,
					notificationToken,
					timezones: user.accessTokens.map((accessToken) => accessToken.dataValues.timezone),
				};
			});

			const profilesNotificationsIncludes = [
				{
					model: DB.models.Profiles,
					as: 'profile',
					include: [
						{
							model: DB.models.UsersProfiles,
							as: 'usersProfiles',
							include: [
								{
									model: DB.models.Users,
									as: 'user',
									include: [
										{
											model: DB.models.AccessTokens,
											as: 'accessTokens',
											attributes: ['notificationsToken', 'timezone'],
										},
									],
								},
							],
						},
					],
				},
			];

			// Obtener Perfiles asociados a las notificaciones
			const profilesNotifications = await DB.models.ProfilesNotifications.findAll({
				where: { notificationId },
				include: profilesNotificationsIncludes,
			});

			let profileUsers = profilesNotifications.flatMap((profileNotificationInstance) => {
				const usersProfiles = profileNotificationInstance.dataValues.profile.dataValues.usersProfiles;

				return usersProfiles.map((up) => {
					const user = up.dataValues.user.dataValues;

					return {
						userId: user.id,
						notificationToken: user.accessTokens.map(
							(accessToken) => accessToken.dataValues.notificationsToken,
						),
						timezones: user.accessTokens.map((accessToken) => accessToken.dataValues.timezone),
					};
				});
			});

			// Combinar Usuarios directos y Usuarios de Perfiles, eliminando duplicados
			let combinedUsers = [...directUsers, ...profileUsers].reduce((acc, curr) => {
				if (!acc.some((user) => user.userId === curr.userId)) {
					acc.push(curr);
				}
				return acc;
			}, []);

			result = {
				...notification,
				users: combinedUsers,
			};

			return {
				status: true,
				data: result,
			};
		} catch (error) {
			console.error('Error getting user tokens for notifications:', error);
			return { status: false, error: error.message };
		}
	};

	static sendNotifications = async (notification) => {
		try {
			let tokens = notification.users.flatMap((user) => user.notificationToken);
			tokens = [...new Set(tokens)];
			tokens = tokens.filter((token) => token);
			if (!tokens.length) return { status: true };

			const message = {
				notification: {
					title: notification.title,
					body: notification.description,
				},
				tokens,
			};

			const response = await sender.sendMultipleCast(message);
			if (!response.status) throw new Error(response.error);
			return { status: true };
		} catch (error) {
			return { status: false, error };
		}
	};
}
