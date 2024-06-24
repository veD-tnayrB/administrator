import { DB } from '@essential-js/admin-server/db';

export interface ILoadHistoryParams {
	userId: string;
}

export class LoadHistory {
	static model: typeof DB.models.SentNotifications = DB.models.SentNotifications;
	static notificationsModel: typeof DB.models.Notifications = DB.models.Notifications;

	static execute = async (params: ILoadHistoryParams) => {
		try {
			if (!params.userId) throw 'USER_ID_NOT_PROVIDED';
			const notificationsRecords = await LoadHistory.model.findAll({
				where: { userId: params.userId },
				include: [
					{
						model: LoadHistory.notificationsModel,
						as: 'notification',
					},
				],
				order: [['timeUpdated', 'DESC']],
			});
			const notifications = notificationsRecords.map((record) => record.dataValues);

			return { status: true, data: { entries: notifications } };
		} catch (error) {
			console.error('Error /loadHistory', error);
			return { status: false, error };
		}
	};
}
