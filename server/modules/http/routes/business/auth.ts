import { auth } from '@essential-js/admin-server/engines/auth';
import { Response as ResponseAPI } from '@bgroup/helpers/response';
import { Application, Request, Response } from 'express';

export class AuthRoutes {
	static async login(req: Request, res: Response) {
		try {
			const response = await auth.login({ email: req.body.email, password: req.body.password });
			if (!response.status) throw response.error;

			const formatedResponse = ResponseAPI.success({ data: response.data });
			return res.json(formatedResponse);
		} catch (exc) {
			console.error('LOGIN error:', exc);
			const errorResponse = ResponseAPI.error({ code: 500, message: `Server error of ${exc}` });
			return res.status(500).json(errorResponse);
		}
	}

	static setup(app: Application) {
		app.post('/login', AuthRoutes.login);
	}
}
