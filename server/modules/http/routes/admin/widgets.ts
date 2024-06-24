import { Widgets } from '@essential-js/admin-server/engines/widgets';
import { Route, ISuccess, ResponseType, checkToken } from '@essential-js/admin-server/helpers';
import { Application, Request, Response } from 'express';
import { Response as ResponseAPI } from '@bgroup/helpers/response';

class WidgetsRoutes extends Route {
	constructor() {
		super({
			manager: Widgets,
		});
	}

	getDashboard = async (req: Request, res: Response) => {
		try {
			const userId = req.params.userId;
			const profiles = req.body.session.profiles;
			const response = await Widgets.getDashboard({ userId, profiles });
			if (!response.status && 'error' in response) throw response.error;
			const formatedResponse = response;
			return res.status(200).json(formatedResponse);
		} catch (exc) {
			console.error('Error /get-dashboard', exc);
			const responseError = ResponseAPI.error({ code: 500, message: exc as string });
			res.status(500).send(responseError);
		}
	};

	saveDashboard = async (req: Request, res: Response) => {
		try {
			const userId = req.body.session.id;
			const data = req.body.data;
			if (!data) throw new Error('DATA_PROPERY_NOT_PROVIDED');
			const response = await Widgets.saveDashboard({ data, userId });
			if (!response.status && 'error' in response) throw response.error;
			const formatedResponse = ResponseAPI.success(response as ISuccess);
			return res.status(200).json(formatedResponse);
		} catch (exc) {
			console.error('Error /save-dashboard', exc);
			const responseError = ResponseAPI.error({ code: 500, message: exc as string });
			res.status(500).send(responseError);
		}
	};

	getTotals = async (req: Request, res: Response) => {
		try {
			const response = await Widgets.getTotals();
			if (!response.status && 'error' in response) throw response.error;
			const formatedResponse = response;
			return res.status(200).json(formatedResponse);
		} catch (exc) {
			console.error('Error /get', exc);
			const responseError = ResponseAPI.error({ code: 500, message: exc as string });
			res.status(500).send(responseError);
		}
	};

	setup = (app: Application) => {
		app.get(`/admin/widgets`, checkToken, this.list);
		app.get('/admin/widgets/get-totals', checkToken, this.getTotals);
		app.get('/admin/widgets/get-dashboard/:userId', checkToken, this.getDashboard);
		app.post('/admin/widgets/save-dashboard', checkToken, this.saveDashboard);
	};
}

export const widgets = new WidgetsRoutes();
