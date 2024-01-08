import { DB } from '@essential-js/admin-server/db';
import { Manager } from '@essential-js/admin-server/helpers';
import { sender } from './sender';

export class NotificationsManager extends Manager {
	constructor() {
		super({ model: DB.models.Notifications });
	}

	launch = async (params: { id: string }) => {
		try {
			const notificationFind = await this.model.findOne({ where: { id: params.id } });
			const notification = notificationFind.get({ plain: true });
			if (!notification) throw 'NOTIFICATION_DOESNT_EXISTS';

			const usersNotificationsFind = await DB.models.UsersNotifications.findAll({
				where: { notificationId: params.id },
				attributes: ['userId'],
			});
			const usersNotifications = usersNotificationsFind.map(un => un.get({ plain: true }));

			const userIds = usersNotifications.map(un => un.userId);

			const tokensFind = await DB.models.AccessTokens.findAll({
				where: {
					userId: userIds,
				},
				attributes: ['userId', 'notificationsToken'],
			});

			const tokens = tokensFind.map(token => token.get({ plain: true }));

			// Mapear los tokens a la estructura deseada
			const result = tokens.map(token => {
				return {
					notification: {
						title: notification.title,
						body: notification.description,
					},
					token: token.notificationsToken,
					data: {
						id: notification.id,
					},
				};
			});

			const notifications = result.map(notification => sender.send(notification));

			const response = await Promise.all(notifications);

			return { status: true, data: result };
		} catch (error) {
			console.error(error);
			return { status: false, error };
		}
	};

	markAsRead = async (params: { userId: string; notificationId: string }) => {
		// console.log('MESSAGE RECEIVED', params);
	};
}

export /*bundle*/ const Notifications = new NotificationsManager();
