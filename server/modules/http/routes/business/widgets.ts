import { Widgets } from '@essential-js/admin-server/engines/widgets';
import { Route, ISuccess, ResponseType, checkToken } from '@essential-js/admin-server/helpers';
import { Application, Request, Response } from 'express';
import { Response as ResponseAPI } from '@bgroup/helpers/response';

class WidgetsRoutes extends Route {
	declare manager: Widgets;
	declare list: (req: Request, res: Response) => Promise<Response>;
	constructor() {
		super({
			manager: Widgets,
			endpoints: {
				plural: 'widgets',
				singular: 'widget',
			},
		});
	}

	getDashboard = async (req: Request, res: Response) => {
		try {
			const userId = req.params.userId;
			const response: ResponseType = await this.manager.getDashboard({ userId });
			if (!response.status && 'error' in response) throw response.error;
			const formatedResponse = ResponseAPI.success(response as ISuccess);
			return res.status(200).json(formatedResponse);
		} catch (exc) {
			console.error('Error /get-dashboard', exc);
			const responseError = ResponseAPI.error({ code: 500, message: exc });
			res.status(500).send(responseError);
		}
	};

	getTotals = async (req: Request, res: Response) => {
		try {
			const response: ResponseType = await this.manager.getTotals();
			if (!response.status && 'error' in response) throw response.error;
			const formatedResponse = ResponseAPI.success(response as ISuccess);
			return res.status(200).json(formatedResponse);
		} catch (exc) {
			console.error('Error /get', exc);
			const responseError = ResponseAPI.error({ code: 500, message: exc });
			res.status(500).send(responseError);
		}
	};

	setup = (app: Application) => {
		app.get(`/widgets`, checkToken, this.list);
		app.get('/widgets/get-totals', checkToken, this.getTotals);
		app.get('/widgets/get-dashboard/:userId', checkToken, this.getDashboard);
	};
}

export const widgets = new WidgetsRoutes();
