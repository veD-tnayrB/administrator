import { Auth } from '@essential-js/admin-server/engines/auth';
import { Response as ResponseAPI } from '@bgroup/helpers/response';
import { Application, Request, Response } from 'express';
import { checkToken } from '@essential-js/admin-server/helpers';

export class AuthRoutes {
	async login(req: Request, res: Response) {
		try {
			const response = await Auth.login({
				email: req.body.email,
				password: req.body.password,
				notificationsToken: req.body.notificationsToken,
				timezone: req.body.timezone,
			});
			if (!response.status) throw response.error;

			const formatedResponse = ResponseAPI.success({ data: response.data });
			return res.json(formatedResponse);
		} catch (exc) {
			console.error('LOGIN error:', exc);
			const errorResponse = ResponseAPI.error({ code: 500, message: exc });
			return res.status(500).json(errorResponse);
		}
	}

	async getUser(req: Request, res: Response) {
		try {
			const params = req.query;
			if (!params.token) throw 'TOKEN_NOT_PROVIDED';
			const response = await Auth.getUser(params);
			if (!response.status) throw response.error;

			const formatedResponse = ResponseAPI.success({ data: response.data });
			return res.json(formatedResponse);
		} catch (exc) {
			console.error('GET USER error:', exc);
			const errorResponse = ResponseAPI.error({ code: 500, message: exc });
			return res.status(500).json(errorResponse);
		}
	}
	async logout(req: Request, res: Response) {
		try {
			const params = req.query;
			if (!params.token) throw 'TOKEN_NOT_PROVIDED';
			const response = await Auth.logout(params);
			if (!response.status) throw response.error;

			const formatedResponse = ResponseAPI.success({ data: response.data });
			return res.json(formatedResponse);
		} catch (exc) {
			console.error('LOGOUT error:', exc);
			const errorResponse = ResponseAPI.error({ code: 500, message: exc });
			return res.status(500).json(errorResponse);
		}
	}

	setup(app: Application) {
		app.post('/login', this.login);
		app.get('/auth/get-user', checkToken, this.getUser);
		app.get('/auth/logout', checkToken, this.logout);
	}
}

export const auth = new AuthRoutes();
