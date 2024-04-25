import { DB } from '@essential-js/admin-server/db';
import { Manager } from '@essential-js/admin-server/helpers';
import { IPublish, Publish } from './cases/publish';
import { Get, IGet } from './cases/get';
import { ILaunch, Launch } from './cases/launch';

export class NotificationsManager extends Manager {
	declare model: DB.models.Notifications;

	constructor() {
		super({ model: DB.models.Notifications });
	}

	launch = async (params: ILaunch) => {
		return Launch.execute(params);
	};

	markAsRead = async (params: { userId: string; notificationId: string }) => {};

	create = (params: IPublish) => {
		return Publish.create(params, '/notifications/create');
	};

	update = (params: IPublish) => {
		return Publish.update(params, '/notifictations/update');
	};

	get = (params: IGet) => {
		return Get.execute(params);
	};
}

export /*bundle*/ const Notifications = new NotificationsManager();
