import { DB } from '@essential-js/admin-server/db';

export interface IMarkAsRead {
	userId: string;
	notificationIds: string[];
}

export class MarkAsRead {
	static model: typeof DB.models.Notifications = DB.models.Notifications;

	static execute = async ({ userId, notificationIds }: IMarkAsRead) => {
		try {
			if (!notificationIds) throw 'NOTIFICATION_IDS_NOT_PROVIDED';
			if (!userId) throw 'USER_ID_NOT_PROVIDED';
		} catch (error) {
			console.error('Error /markAsRead', error);
			return { status: false, error };
		}
	};
}
