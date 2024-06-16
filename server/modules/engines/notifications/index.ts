import { DB } from '@essential-js/admin-server/db';
import { Manager } from '@essential-js/admin-server/helpers';
import { IPublish, Publish } from './cases/publish';
import { Get, IGet } from './cases/get';
import { ILaunch, Launch } from './cases/launch';
import { IMarkAsRead, MarkAsRead } from './cases/mark-as-read';

export class NotificationsManager extends Manager {
	constructor() {
		super({ model: DB.models.Notifications });
	}

	launch = async (params: ILaunch) => {
		return Launch.execute(params);
	};

	markAsRead = async (params: IMarkAsRead) => {
		return MarkAsRead.execute(params);
	};

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
