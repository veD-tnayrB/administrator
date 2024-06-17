import { Notifications } from '@essential-js/admin-server/engines/notifications';
import { Route, checkToken, checkPermission } from '@essential-js/admin-server/helpers';
import { Response as ResponseAPI } from '@bgroup/helpers/response';
import { Application, Request, Response } from 'express';

class NotificationsRoutes extends Route {
	declare manager: Notifications;

	constructor() {
		super({
			manager: Notifications,
			endpoints: {
				plural: 'notifications',
				singular: 'notification',
			},
		});
	}

	launch = (req: Request, res: Response) => {
		try {
			const params = req.params;
			const response = this.manager.launch(params);
			if (!response.status && 'error' in response) throw response.error;
			const formatedResponse = ResponseAPI.success(response);
			return res.status(200).json(formatedResponse);
		} catch (exc) {
			console.error('Error /launch', exc);
			const responseError = ResponseAPI.error({ code: 500, message: exc });
			res.status(500).send(responseError);
		}
	};

	markAsRead = async (req: Request, res: Response) => {
		try {
			const notificationsIds = req.body.ids;
			const userId = req.body.userId;
			const response = await this.manager.markAsRead({ notificationsIds, userId });
			if (!response.status && 'error' in response) throw response.error;
			const formatedResponse = ResponseAPI.success(response);
			return res.status(200).json(formatedResponse);
		} catch (exc) {
			console.error('Error /launch', exc);
			const responseError = ResponseAPI.error({ code: 500, message: exc });
			res.status(500).send(responseError);
		}
	};

	loadHistory = async (req: Request, res: Response) => {
		try {
			const userId = req.query.userId;
			const response = await this.manager.loadHistory({ userId });
			if (!response.status && 'error' in response) throw response.error;
			const formatedResponse = ResponseAPI.success(response);
			return res.status(200).json(formatedResponse);
		} catch (exc) {
			console.error('Error /launch', exc);
			const responseError = ResponseAPI.error({ code: 500, message: exc });
			res.status(500).send(responseError);
		}
	};

	setup = (app: Application) => {
		app.get('/notification/launch/:id', checkToken, checkPermission('notifications.launch'), this.launch);
		app.put('/notification/markAsRead', checkToken, this.markAsRead);
		app.post(`/notification`, checkToken, checkPermission('notifications.create'), this.create);
		app.put(`/notification/:id`, checkToken, checkPermission('notifications.update'), this.update);
		app.get(`/notifications`, checkToken, checkPermission('notifications.list'), this.list);
		app.get(`/notification/:id`, checkToken, checkPermission('notifications.get'), this.get);
		app.get(`/notifications/history`, checkToken, checkPermission('notifications.get'), this.loadHistory);

		app.put(
			`/notifications/history/mark-as-read`,
			checkToken,
			checkPermission('notifications.get'),
			this.markAsRead,
		);
	};
}

export const notifications = new NotificationsRoutes();
