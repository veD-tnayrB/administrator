import * as cron from 'node-cron';
import { DB } from '@essential-js/admin-server/db';
import { rrulestr } from 'rrule';
import { Op } from 'sequelize';
import { sender } from '../library/sender';
import * as moment from 'moment-timezone';

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
			for (let notification of notificationsFound.map(n => n.dataValues)) {
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
									attributes: ['notificationsToken', 'timezone'],
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
						timezones: user.accessTokens.map(accessToken => accessToken.dataValues.timezone),
					};
				});
				console.log('DIRECT USERS => ', directUsers);

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

				let profileUsers = profilesNotifications.flatMap(profileNotificationInstance => {
					const usersProfiles = profileNotificationInstance.dataValues.profile.dataValues.usersProfiles;

					return usersProfiles.map(up => {
						const user = up.dataValues.user.dataValues;

						return {
							userId: user.id,
							notificationToken: user.accessTokens.map(
								accessToken => accessToken.dataValues.notificationsToken
							),
							timezones: user.accessTokens.map(accessToken => accessToken.dataValues.timezone),
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
		try {
			const todayDate = moment().format('DD-MM-YYYY'); // Obtener la fecha actual en formato 'DD-MM-YYYY'
			for (const notification of notifications) {
				for (const user of notification.users) {
					// Iterar sobre cada zona horaria del usuario
					for (const timezone of user.timezones || ['UTC']) {
						// Asumir UTC si no se especifica
						console.log('USER.TIMEZONE => ', { user, timezone, notification });

						const notificationTimes = notification.times.map(time => {
							const formattedTime = time.replace('-', ':'); // Cambiar 'hh-mm' a 'hh:mm'
							const localTime = moment.tz(`${todayDate} ${formattedTime}`, 'DD-MM-YYYY HH:mm', timezone);
							// Convertir esa hora local a UTC para programar el envío
							return localTime.tz('UTC').toDate();
						});

						for (const time of notificationTimes) {
							const now = new Date();
							const delay = time.getTime() - now.getTime();

							console.log('DELAY => ', {
								notification,
								delay,
								nowGetTime: now.getTime(),
								time,
								notificationTimes,
								timeGetTime: time.getTime(),
							});

							if (delay > 0) {
								// Programar el envío de la notificación solo si el tiempo de envío es futuro
								setTimeout(() => {
									this.sendNotification(notification);
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

	sendNotification(notification, user) {
		// Implementación para enviar la notificación a través del sistema de mensajería
		const message = {
			notification: {
				title: notification.title,
				body: notification.description,
			},
			token: user.notificationToken, // Asumiendo que el token es parte del objeto user
		};
		console.log('Sending notification to user:', user.userId, 'with message:', message);
		// Simular el envío
	}

	static sendNotification = async notification => {
		let tokens = notification.users.flatMap(user => user.notificationToken);
		// Deduplicar tokens por seguridad
		tokens = [...new Set(tokens)];

		const message = {
			notification: {
				title: notification.title,
				body: notification.description,
			},
			tokens,
		};

		const response = await sender.sendMultipleCast(message);
		if (!response.status) throw new Error(response.error);
	};
}
