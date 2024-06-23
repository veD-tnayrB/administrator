import { DB } from '@essential-js/admin-server/db';
import { Manager } from '@essential-js/admin-server/helpers';
import { INotification } from '@essential-js/admin-server/types';
import { IPublish, Publish } from './cases/publish';
import { Get, IGet } from './cases/get';
import { ILaunch, Launch } from './cases/launch';
import { IMarkAsRead, MarkAsRead } from './cases/mark-as-read';
import { ILoadHistoryParams, LoadHistory } from './cases/load-history';

export class NotificationsManager extends Manager<INotification> {
	constructor() {
		super({ model: DB.models.Notifications, managerName: '/notifications' });
	}

	launch = async (params: ILaunch) => {
		return Launch.execute(params);
	};

	markAsRead = async (params: IMarkAsRead) => {
		return MarkAsRead.execute(params);
	};

	create = <IPublish>(params: IPublish) => {
		return Publish.create(params, '/notifications/create');
	};

	update = <IPublish>(params: IPublish) => {
		return Publish.update(params, '/notifictations/update');
	};

	get = (params: IGet) => {
		return Get.execute(params);
	};

	loadHistory = (params: ILoadHistoryParams) => {
		return LoadHistory.execute(params);
	};
}

export /*bundle*/ const Notifications = new NotificationsManager();
