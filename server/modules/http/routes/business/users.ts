import { Users } from '@essential-js/admin-server/engines/users';
import { Route, ISuccess, ResponseType } from '@essential-js/admin-server/helpers';
import { Response as ResponseAPI } from '@bgroup/helpers/response';
import { Application, Request, Response } from 'express';

class UsersRoutes extends Route {
	constructor() {
		super({
			manager: Users,
			endpoints: {
				plural: 'users',
				singular: 'user',
			},
		});
	}

	getRegisteredUsersByMonth = async (req: Request, res: Response) => {
		try {
			const response: ResponseType = await this.manager.getRegisteredUsersByMonth({
				year: Number(req.params.year),
			});
			if (!response.status && 'error' in response) throw response.error;
			const formatedResponse = ResponseAPI.success(response as ISuccess);
			return res.status(200).json(formatedResponse);
		} catch (exc) {
			console.error('Error /list', exc);
			const responseError = ResponseAPI.error({ code: 500, message: exc });
			res.status(500).send(responseError);
		}
	};

	setup = (app: Application) => {
		super.setup(app);
		app.get('/users/get-registered-users-by-month/:year', this.getRegisteredUsersByMonth);
	};
}

export const users = new UsersRoutes();
