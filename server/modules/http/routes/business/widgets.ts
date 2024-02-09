import { Widgets } from '@essential-js/admin-server/engines/widgets';
import { Route, ISuccess, ResponseType, checkToken } from '@essential-js/admin-server/helpers';
import { Application, Request, Response } from 'express';
import { Response as ResponseAPI } from '@bgroup/helpers/response';

class WidgetsRoutes extends Route {
	constructor() {
		super({
			manager: Widgets,
			endpoints: {
				plural: 'widgets',
				singular: 'widget',
			},
		});
	}

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
		super.setup(app);
		app.get('/widgets/get-totals', checkToken, this.getTotals);
	};
}

export const widgets = new WidgetsRoutes();
