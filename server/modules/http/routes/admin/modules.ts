import { Modules } from '@essential-js/admin-server/engines/modules';
import { Route, ISuccess, checkToken, checkPermission } from '@essential-js/admin-server/helpers';
import { Application, Request, Response } from 'express';
import { Response as ResponseAPI } from '@bgroup/helpers/response';

class ModulesRoutes extends Route {
	constructor() {
		super({
			manager: Modules,
		});
	}

	get = async (req: Request, res: Response) => {
		try {
			const id = req.params.id;
			const response = await this.manager.get({
				id,
			});
			if (!response.status && 'error' in response) throw response.error;
			const formatedResponse = ResponseAPI.success(response as ISuccess);
			return res.status(200).json(formatedResponse);
		} catch (exc) {
			console.error('Error /get', exc);
			const responseError = ResponseAPI.error({ code: 500, message: exc as string });
			return res.status(500).send(responseError);
		}
	};

	setup(app: Application) {
		app.get(`/admin/module/:id`, checkToken, this.get);
		app.get(`/admin/modules`, checkToken, this.list);
		app.post(`/admin/module`, checkToken, checkPermission('modules.create'), this.create);
		app.put(`/admin/module/:id`, checkToken, checkPermission('modules.update'), this.update);
	}
}

export const modules = new ModulesRoutes();
