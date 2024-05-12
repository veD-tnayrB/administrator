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
			const params = req.body;
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

	markAsRead = (req: Request, res: Response) => {
		try {
			// const params = req.body;
			// const response = this.manager.launch(params);
			// if (!response.status && 'error' in response) throw response.error;
			// const formatedResponse = ResponseAPI.success(response);
			return res.status(200).json({ status: true });
		} catch (exc) {
			console.error('Error /launch', exc);
			const responseError = ResponseAPI.error({ code: 500, message: exc });
			res.status(500).send(responseError);
		}
	};

	setup = (app: Application) => {
		app.post('/notification/launch', checkToken, checkPermission('notifications.launch'), this.launch);
		app.put('/notification/markAsRead', checkToken, this.markAsRead);
		app.post(`/notification`, checkToken, checkPermission('notifications.create'), this.create);
		app.put(`/notification`, checkToken, checkPermission('notifications.update'), this.update);
		app.get(`/notifications`, checkToken, checkPermission('notifications.list'), this.list)
	};
}

export const notifications = new NotificationsRoutes();
