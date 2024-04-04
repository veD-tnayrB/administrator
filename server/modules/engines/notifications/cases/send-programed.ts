import * as cron from 'node-cron';
import { DB } from '@essential-js/admin-server/db';
import { rrulestr } from 'rrule';
import { Op } from 'sequelize';

export /*bundle*/ class SendProgramed {
	static startListener() {
		cron.schedule(process.env.NOTIFICATIONS_CRON_TIME_START_PATTERN, SendProgramed.execute, {
			scheduled: true,
			timezone: process.env.NOTIFICATIONS_CRON_TIMEZONE || 'UTC',
		});
	}

	static execute = async () => {
		try {
			console.log('EXECUTING NOTIFICATIONS PROGRAMED');
			const notifications = await SendProgramed.getDayNotifications();
			if (!notifications.status) throw new Error(`ERROR GETTING NOTIFICATIONS FOR TODAY ${notifications.error}`);

			const users = await SendProgramed.getUsers(notifications.data);
			if (!users.status) throw new Error(`ERROR GETTING USERS TO NOTIFY FOR TODAY ${users.error}`);

			const result = await SendProgramed.sendNotifications(users);
			if (!result.status) throw new Error(`ERROR SENDING NOTIFICATIONS ${result.error}`);

			return { status: true };
		} catch (error) {
			console.error('ERROR SENDING NOTIFICATIONS: ', error);
			return { status: false, error };
		}
	};

	static getDayNotifications = async () => {
		try {
			const startOfDay = new Date();
			startOfDay.setUTCHours(0, 0, 0, 0);

			const endOfDay = new Date();
			endOfDay.setUTCHours(23, 59, 59, 999);

			const notificationsFound = await DB.models.Notifications.findAll();
			const notifications = notificationsFound.map(notification => notification.dataValues);

			const notificationsToSendToday = notifications.filter(notification => {
				const frequencies = JSON.parse(notification.frecuency || '[]');

				return frequencies.some(frequencyString => {
					const rrule = rrulestr(frequencyString);
					return rrule.between(startOfDay, endOfDay).length > 0;
				});
			});

			return { status: true, data: notificationsToSendToday };
		} catch (error) {
			return { status: false, error };
		}
	};

	static async getUsers(notifications) {
		try {
			let results = {};

			for (const notification of notifications) {
				const notificationId = notification.id;

				// Obtener Usuarios directamente asociados a las notificaciones
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
									attributes: ['notificationsToken'],
								},
							],
						},
					],
				});

				let directUsers = directUsersNotifications.reduce((acc, notificationInstance) => {
					const user = notificationInstance.user.dataValues;
					const tokens = user.accessTokens.map(accessToken => accessToken.notificationsToken);

					acc[user.id] = {
						...user,
						tokens,
					};

					return acc;
				}, {});

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
												attributes: ['notificationsToken'],
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

				let profileUsers = profilesNotifications.reduce((acc, profileNotificationInstance) => {
					const usersProfiles = profileNotificationInstance.dataValues.profile.dataValues.usersProfiles;

					usersProfiles.forEach(up => {
						const user = up.dataValues.user.dataValues;
						const tokens = user.accessTokens.map(accessToken => accessToken.notificationsToken);

						if (!acc[user.id]) {
							acc[user.id] = {
								...user,
								tokens,
							};
						} else {
							// Concatenar tokens si el usuario ya está incluido por ser directo
							acc[user.id].tokens = [...new Set([...acc[user.id].tokens, ...tokens])];
						}
					});

					return acc;
				}, directUsers); // Iniciar con usuarios directos para combinar

				results[notificationId] = {
					...notification,
					users: profileUsers, // Ahora profileUsers incluye directos y perfiles
				};
			}

			return {
				status: true,
				data: results,
			};
		} catch (error) {
			console.error('Error getting user tokens for notifications:', error);
			return { status: false, error: error.message };
		}
	}

	static sendNotifications = async notifications => {
		try {
			console.log('NOTIFICATIONS => ', notifications);

			for (const notification of notifications) {
			}
		} catch (error) {
			return { status: false, error };
		}
	};
}
