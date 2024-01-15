import { Notifications } from '@essential-js/admin-server/engines/notifications';
import { Route } from '@essential-js/admin-server/helpers';
import { Response as ResponseAPI } from '@bgroup/helpers/response';
import { Application, Request, Response } from 'express';
import { jwt } from '@bgroup/helpers/jwt';

class NotificationsRoutes extends Route {
	constructor() {
		super({
			manager: Notifications,
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

	setup = (app: Application) => {
		app.get(`/notifications`, jwt.verify, this.list);
		app.get(`/notification/:id`, jwt.verify, this.get);
		app.post(`/notification`, jwt.verify, this.create);
		app.put(`/notification`, jwt.verify, this.update);
		app.delete(`/notification/:id`, jwt.verify, this.delete);
		app.post('/notification/launch', jwt.verify, this.launch);
		app.put('/notification/markAsRead', jwt.verify, this.markAsRead);
	};
}

export const notifications = new NotificationsRoutes();
