import { Response as ResponseAPI } from '@bgroup/helpers/response';
import { Auth } from '@essential-js/admin-server/engines/auth';
import { checkToken } from '@essential-js/admin-server/helpers';
import { Application, Request, Response } from 'express';

export class AuthRoutes {
	async login(req: Request, res: Response) {
		try {
			const response = await Auth.login({
				email: req.body.email,
				password: req.body.password,
				notificationsToken: req.body.notificationsToken,
				timezone: req.body.timezone,
			});
			if (!response.status) throw response;

			const formatedResponse = ResponseAPI.success({ data: response.data });
			return res.json(formatedResponse);
		} catch (exc) {
			console.error('LOGIN error:', exc);
			const errorResponse = ResponseAPI.error({ code: 500, message: exc.error });
			return res.status(500).json(errorResponse);
		}
	}

	async getUser(req: Request, res: Response) {
		try {
			const params = req.query;
			if (!params.token || typeof params.token !== 'string') throw 'TOKEN_NOT_PROVIDED';
			const response = await Auth.getUser(params as { token: string });
			if (!response.status) throw response.error;

			const formatedResponse = ResponseAPI.success({ data: response.data });
			return res.json(formatedResponse);
		} catch (exc) {
			console.error('GET USER error:', exc);
			const errorResponse = ResponseAPI.error({ code: 500, message: exc.error });
			return res.status(500).json(errorResponse);
		}
	}
	async logout(req: Request, res: Response) {
		try {
			const params = req.query;
			if (!params.token || typeof params !== 'string') throw 'TOKEN_NOT_PROVIDED';
			const response = await Auth.logout(params);
			if (!response.status) throw response.error;

			const formatedResponse = { status: true };
			return res.json(formatedResponse);
		} catch (exc) {
			console.error('LOGOUT error:', exc);
			const errorResponse = ResponseAPI.error({ code: 500, message: exc.error });
			return res.status(500).json(errorResponse);
		}
	}

	async update(req: Request, res: Response) {
		try {
			const params = req.body;
			const response = await Auth.update(params);
			if (!response.status) throw response.error;

			const formatedResponse = { status: true };
			return res.json(formatedResponse);
		} catch (exc) {
			console.error('Update error:', exc);
			const errorResponse = ResponseAPI.error({ code: 500, message: exc.error });
			return res.status(500).json(errorResponse);
		}
	}

	async forgetPassword(req: Request, res: Response) {
		try {
			const params = req.params;
			if (!params.email) throw 'EMAIL_NOT_PROVIDED';
			const response = await Auth.forgetPassword(params);
			if (!response.status) throw response.error;

			const formatedResponse = { status: true };
			return res.json(formatedResponse);
		} catch (exc) {
			console.error('FORGET PASSWORD error:', exc);
			const errorResponse = ResponseAPI.error({ code: 500, message: exc.error });
			return res.status(500).json(errorResponse);
		}
	}

	async recoverPassword(req: Request, res: Response) {
		try {
			const params = req.params;
			const body = req.body;
			if (!params.token) throw 'INCORRECT_REQUEST';
			if (!body.newPassword) throw 'NEW_PASSWORD_NOT_PROVIDED';
			const specs = { newPassword: body.newPassword, token: params.token };
			const response = await Auth.recoverPassword(specs);
			if (!response.status) throw response.error;

			const formatedResponse = { status: true };
			return res.json(formatedResponse);
		} catch (exc) {
			console.error('RECOVER PASSWORD error:', exc);
			const errorResponse = ResponseAPI.error({ code: 500, message: exc.error });
			return res.status(500).json(errorResponse);
		}
	}

	setup(app: Application) {
		app.post('/login', this.login);
		app.get('/auth/get-user', checkToken, this.getUser);
		app.get('/auth/logout', checkToken, this.logout);
		app.get('/auth/forget-password/:email', this.forgetPassword);
		app.put('/auth/recover-password/:token', this.recoverPassword);
		app.put('/auth/update/user/:userId', checkToken, this.update);
	}
}

export const auth = new AuthRoutes();
