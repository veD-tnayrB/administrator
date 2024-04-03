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
			let notificationsWithTokens = {};

			for (let notification of notifications) {
				// ID de la notificación actual
				const notificationId = notification.id;

				// Usuarios directamente asociados a la notificación
				const usersDirectly = await DB.models.UsersNotifications.findAll({
					where: { notificationId: notificationId },
					include: [
						{
							model: DB.models.AccessTokens,
							attributes: ['userId', 'notificationToken'],
						},
					],
				});

				const directTokens = usersDirectly.flatMap(u =>
					u.AccessTokens.map(token => ({
						notificationToken: token.notificationToken,
						userId: token.userId,
					}))
				);

				// Perfiles asociados a la notificación
				const profilesNotifications = await DB.models.ProfilesNotifications.findAll({
					where: { notificationId: notificationId },
					include: [
						{
							model: DB.models.UsersProfiles,
							required: true,
							include: [
								{
									model: DB.models.AccessTokens,
									attributes: ['userId', 'notificationToken'],
									required: true,
								},
							],
						},
					],
				});

				const profileTokens = profilesNotifications.flatMap(pn =>
					pn.UsersProfiles.flatMap(up =>
						up.AccessTokens.map(token => ({
							notificationToken: token.notificationToken,
							userId: token.userId,
						}))
					)
				);

				// Combinar y deduplicar tokens
				const allTokens = [...directTokens, ...profileTokens];
				const uniqueTokens = Array.from(new Map(allTokens.map(token => [token.userId, token])).values());

				// Asignar los tokens únicos a su ID de notificación correspondiente
				notificationsWithTokens[notificationId] = uniqueTokens;
			}

			return {
				status: true,
				data: notificationsWithTokens,
			};
		} catch (error) {
			console.error('Error getting user tokens for notifications:', error);
			return { status: false, error: error.message };
		}
	}
}
