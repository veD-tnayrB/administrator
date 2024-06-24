import { DB } from '@essential-js/admin-server/db';
import { Op } from 'sequelize';

export interface IMarkAsRead {
	userId: string;
	notificationsIds: string[];
}

export class MarkAsRead {
	static model: typeof DB.models.SentNotifications = DB.models.SentNotifications;

	static execute = async ({ userId, notificationsIds }: IMarkAsRead) => {
		try {
			if (!notificationsIds.length) throw 'NOTIFICATION_IDS_NOT_PROVIDED';
			if (!userId) throw 'USER_ID_NOT_PROVIDED';

			await MarkAsRead.model.update({ status: 'read' }, { where: { userId, id: { [Op.in]: notificationsIds } } });

			return { status: true };
		} catch (error) {
			console.error('Error /markAsRead', error);
			return { status: false, error };
		}
	};
}
