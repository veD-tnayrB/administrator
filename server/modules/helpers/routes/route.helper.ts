import { Application, Request, Response } from 'express';
import { Manager } from '../manager/manager.helper';
import { Response as ResponseAPI } from '@bgroup/helpers/response';
import { checkToken } from '../middlewares/jwt';
import { checkPermission } from '../middlewares/permissions';

export /*bundle*/ interface ISuccess {
	status: boolean;
	data: {
		entries: object[];
		next: any;
		total: any;
	};
}

interface IError {
	status: boolean;
	error: {
		message: string;
		target: string;
	};
}

export /*bundle*/ type ResponseType = ISuccess | IError;
interface IEndpoints {
	plural: string;
	singular: string;
}

export /*bundle*/ class Route {
	#manager: Manager;
	get manager() {
		return this.#manager;
	}
	#endpoints: IEndpoints;

	constructor({ manager, endpoints }: { endpoints?: IEndpoints; manager: Manager }) {
		this.#manager = manager;
		this.#endpoints = endpoints;
	}

	setup(app: Application) {
		const singular = this.#endpoints.singular;
		const plural = this.#endpoints.plural;

		app.get(`/${plural}`, checkToken, checkPermission(`${plural}.list`), this.list);
		app.get(`/${singular}/:id`, checkToken, checkPermission(`${singular}.get`), this.get);
		app.post(`/${singular}`, checkToken, checkPermission(`${singular}.create`), this.create);
		app.put(`/${singular}`, checkToken, checkPermission(`${singular}.update`), this.update);
		app.delete(`/${singular}/:id`, checkToken, checkPermission(`${singular}.delete`), this.delete);
	}

	list = async (req: Request, res: Response) => {
		try {
			let { start, limit, order, des, asc, ...query } = req.query;

			const response: ResponseType = await this.#manager.list({
				start: Number(start),
				limit: Number(limit),
				order,
				des,
				asc,
				where: query,
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

	get = async (req: Request, res: Response) => {
		try {
			let { id } = req.params;
			const response: ResponseType = await this.#manager.get({
				id: id as string,
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

	create = async (req: Request, res: Response) => {
		try {
			const data = req.body;
			const response = await this.#manager.create(data);
			if (!response.status) throw response.error;
			const formatedResponse = ResponseAPI.success({ data: response.data });
			return res.status(200).json(formatedResponse);
		} catch (exc) {
			console.error('Error /create', exc);
			const responseError = ResponseAPI.error({ code: 500, message: exc });
			res.status(500).send(responseError);
		}
	};

	update = async (req: Request, res: Response) => {
		try {
			const data = req.body;
			const response = await this.#manager.update(data);
			if (!response.status) throw response.error;
			const formatedResponse = ResponseAPI.success({ data: response.data });
			return res.status(200).json(formatedResponse);
		} catch (exc) {
			console.error('Error /update', exc);
			const responseError = ResponseAPI.error({ code: 500, message: exc });
			res.status(500).send(responseError);
		}
	};

	delete = async (req: Request, res: Response) => {
		try {
			let { id } = req.params;
			const response = await this.#manager.delete({
				id: id as string,
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
}
