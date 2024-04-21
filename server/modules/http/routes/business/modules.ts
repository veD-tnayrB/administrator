import { Modules } from '@essential-js/admin-server/engines/modules';
import { Route, ISuccess, ResponseType, checkToken } from '@essential-js/admin-server/helpers';
import { Application, Request, Response } from 'express';
import { Response as ResponseAPI } from '@bgroup/helpers/response';

class ModulesRoutes extends Route {
	constructor() {
		super({
			manager: Modules,
			endpoints: {
				plural: 'modules',
				singular: 'module',
			},
		});
	}

	get = async (req: Request, res: Response) => {
		try {
			const response: ResponseType = await this.manager.get({
				...req.params,
			});
			if (!response.status && 'error' in response) throw response.error;
			const formatedResponse = ResponseAPI.success(response as ISuccess);
			return res.status(200).json(formatedResponse);
		} catch (exc) {
			console.error('Error /get', exc);
			const responseError = ResponseAPI.error({ code: 500, message: exc });
			res.status(500).send(responseError);
		}
	};

	setup(app: Application) {
		app.get(`/module/:id`, checkToken, this.get);
		app.get(`/modules`, checkToken, this.list);
	}
}

export const modules = new ModulesRoutes();
