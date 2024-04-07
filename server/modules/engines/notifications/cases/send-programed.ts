import * as cron from 'node-cron';
import { DB } from '@essential-js/admin-server/db';
import { rrulestr } from 'rrule';
import { Op } from 'sequelize';
import { sender } from '../library/sender';

export /*bundle*/ class SendProgramed {
	static startListener() {
		cron.schedule(process.env.NOTIFICATIONS_CRON_TIME_START_PATTERN, SendProgramed.execute, {
			scheduled: true,
			timezone: process.env.NOTIFICATIONS_CRON_TIMEZONE || 'UTC',
		});
	}

	static execute = async () => {
		try {
			console.log('EXECUTING NOTIFICATIONS PROGRAMED...');
			const notifications = await SendProgramed.getDayNotifications();
			if (!notifications.status) throw new Error(`ERROR GETTING NOTIFICATIONS FOR TODAY ${notifications.error}`);

			const users = await SendProgramed.getUsers(notifications.data);
			if (!users.status) throw new Error(`ERROR GETTING USERS TO NOTIFY FOR TODAY ${users.error}`);

			const result = await SendProgramed.sendNotifications(users.data);
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
			let notificationsToSendToday = [];
			console.log('NOTIFICATION FOUDN => ', notificationsFound);
			for (let notification of notificationsFound.map(n => n.dataValues)) {
				const frequencies = JSON.parse(notification.frecuency || '[]');

				frequencies.forEach(frequencyString => {
					const rrule = rrulestr(frequencyString);
					console.log('FRECUENCY STRING => ', { frequencyString, startOfDay, endOfDay });
					const occurrencesToday = rrule.between(startOfDay, endOfDay);

					occurrencesToday.forEach(occurrence => {
						notificationsToSendToday.push({
							...notification,
							sendAt: occurrence, // Aquí estás guardando el momento exacto de envío
						});
					});
				});
			}

			return { status: true, data: notificationsToSendToday };
		} catch (error) {
			return { status: false, error };
		}
	};

	static getUsers = async notifications => {
		try {
			let results = [];

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

				let directUsers = directUsersNotifications.map(notificationInstance => {
					const { dataValues: notification } = notificationInstance;
					const user = notification.user.dataValues;

					const notificationToken = user.accessTokens.map(
						accessToken => accessToken.dataValues.notificationsToken
					);
					return {
						userId: user.id,
						notificationToken,
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

				let profileUsers = profilesNotifications.flatMap(profileNotificationInstance => {
					const usersProfiles = profileNotificationInstance.dataValues.profile.dataValues.usersProfiles;

					return usersProfiles.map(up => {
						const user = up.dataValues.user.dataValues;

						return {
							userId: user.id,
							notificationToken: user.accessTokens.map(
								accessToken => accessToken.dataValues.notificationsToken
							),
						};
					});
				});

				// Combinar Usuarios directos y Usuarios de Perfiles, eliminando duplicados
				let combinedUsers = [...directUsers, ...profileUsers].reduce((acc, curr) => {
					if (!acc.some(user => user.userId === curr.userId)) {
						acc.push(curr);
					}
					return acc;
				}, []);

				results.push({
					...notification,
					users: combinedUsers,
				});
			}

			return {
				status: true,
				data: results,
			};
		} catch (error) {
			console.error('Error getting user tokens for notifications:', error);
			return { status: false, error: error.message };
		}
	};

	static sendNotifications = async notifications => {
		console.log('SEND NOTIFICATIOPNS => ', notifications);
		try {
			for (let i = 0; i < notifications.length; i++) {
				const notification = notifications[i];

				let tokens: string[] = [];
				notification.users.forEach(record => {
					tokens = [...record.notificationToken, ...tokens];
				});

				const message = {
					notification: {
						title: notification.title,
						body: notification.description,
					},
					tokens,
				};

				const response = await sender.sendMultipleCast(message);
				if (!response.status) throw new Error(response.error);
			}
			return { status: true };
		} catch (error) {
			return { status: false, error };
		}
	};
}
