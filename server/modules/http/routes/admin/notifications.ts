import { Response as ResponseAPI } from '@bgroup/helpers/response';
import { Notifications } from '@essential-js/admin-server/engines/notifications';
import { Route, checkPermission, checkToken } from '@essential-js/admin-server/helpers';
import { Application, Request, Response } from 'express';

class NotificationsRoutes extends Route {
	constructor() {
		super({
			manager: Notifications,
		});
	}

	launch = async (req: Request, res: Response) => {
		try {
			const id = req.params.id;
			const response = await Notifications.launch({ id });
			if (!response.status && 'error' in response) throw response.error;
			const formatedResponse = response;
			return res.status(200).json(formatedResponse);
		} catch (exc) {
			console.error('Error /launch', exc);
			const responseError = ResponseAPI.error({ code: 500, message: exc.error });
			res.status(500).send(responseError);
		}
	};

	markAsRead = async (req: Request, res: Response) => {
		try {
			const notificationsIds = req.body.ids;
			const userId = req.body.userId;
			const response = await Notifications.markAsRead({ notificationsIds, userId });
			if (!response.status && 'error' in response) throw response.error;
			const formatedResponse = response;
			return res.status(200).json(formatedResponse);
		} catch (exc) {
			console.error('Error /launch', exc);
			const responseError = ResponseAPI.error({ code: 500, message: exc.error });
			res.status(500).send(responseError);
		}
	};

	loadHistory = async (req: Request, res: Response) => {
		try {
			const userId = req.query.userId as string;
			const response = await Notifications.loadHistory({ userId });
			if (!response.status && 'error' in response) throw response.error;
			const formatedResponse = response;
			return res.status(200).json(formatedResponse);
		} catch (exc) {
			console.error('Error /launch', exc);
			const responseError = ResponseAPI.error({ code: 500, message: exc.error });
			res.status(500).send(responseError);
		}
	};

	setup = (app: Application) => {
		app.get('/admin/notification/launch/:id', checkToken, checkPermission('notifications.launch'), this.launch);
		app.put('/admin/notification/markAsRead', checkToken, this.markAsRead);
		app.post(`/admin/notification`, checkToken, checkPermission('notifications.create'), this.create);
		app.put(`/admin/notification/:id`, checkToken, checkPermission('notifications.update'), this.update);
		app.get(`/admin/notifications`, checkToken, checkPermission('notifications.list'), this.list);
		app.get(`/admin/notification/:id`, checkToken, checkPermission('notifications.get'), this.get);
		app.get(`/admin/notifications/history`, checkToken, checkPermission('notifications.get'), this.loadHistory);
		app.put(
			`/admin/notifications/history/mark-as-read`,
			checkToken,
			checkPermission('notifications.get'),
			this.markAsRead
		);
	};
}

export const notifications = new NotificationsRoutes();
