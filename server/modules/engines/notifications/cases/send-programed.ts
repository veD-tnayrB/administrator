import * as cron from 'node-cron';
import { DB } from '@essential-js/admin-server/db';
import { sender } from '../library/sender';
import * as moment from 'moment-timezone';
import { v4 as uuid } from 'uuid';

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
			const today = new Date();
			const todayString = `${today.getDate().toString().padStart(2, '0')}-${(today.getMonth() + 1)
				.toString()
				.padStart(2, '0')}-${today.getFullYear()}`;

			const notificationsFound = await DB.models.Notifications.findAll();
			let notificationsToSendToday = [];
			for (let notification of notificationsFound.map((n) => n.dataValues)) {
				const frequencies = JSON.parse(notification.frecuency || '{}');

				// Verificar si hay notificaciones para enviar hoy
				if (frequencies[todayString]) {
					notificationsToSendToday.push({
						...notification,
						times: frequencies[todayString],
					});
				}
			}

			return { status: true, data: notificationsToSendToday };
		} catch (error) {
			return { status: false, error };
		}
	};

	static getUsers = async (notifications) => {
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

	static sendNotifications = async (notifications) => {
		try {
			const todayDate = moment().format('DD-MM-YYYY'); // Get today's date in 'DD-MM-YYYY' format
			for (const notification of notifications) {
				for (const user of notification.users) {
					for (const timezone of user.timezones || ['UTC']) {
						const notificationTimes = notification.times.map((time) => {
							const formattedTime = time.replace('-', ':'); // Change 'hh-mm' to 'hh:mm'
							const localTime = moment.tz(`${todayDate} ${formattedTime}`, 'DD-MM-YYYY HH:mm', timezone);
							return localTime.tz('UTC').toDate();
						});

						for (const time of notificationTimes) {
							const now = new Date();
							const delay = time.getTime() - now.getTime();

							if (delay > 0) {
								setTimeout(() => {
									SendProgramed.sendNotification(notification, user);
								}, delay);
							}
						}
					}
				}
			}
			return { status: true };
		} catch (error) {
			console.error('Error scheduling notifications:', error);
			return { status: false, error: error.message };
		}
	};

	static sendNotification = async (notification, user) => {
		let tokens = [user.notificationToken].filter(Boolean); // Filter out any null or undefined tokens

		if (!tokens.length) return;

		const message = {
			notification: {
				title: notification.title,
				body: notification.description,
			},
			tokens,
		};

		const response = await sender.sendMultipleCast(message);

		// Record the sent notification
		await DB.models.SentNotifications.create({
			id: uuid(),
			notification_id: notification.id,
			user_id: user.userId,
			status: response.status ? 'sent' : 'failed', // Assume 'sent' or 'failed' based on response status
			time_sent: new Date(),
		});

		if (!response.status) {
			console.error(`Error sending notification to ${user.userId}: ${response.error}`);
			throw new Error(response.error);
		}
	};
}
