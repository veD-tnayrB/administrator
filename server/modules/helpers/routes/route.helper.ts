import { Application, Request, Response } from 'express';
import { Manager } from '../manager/manager.helper';
import { Response as ResponseAPI } from '@bgroup/helpers/response';

interface ISuccess {
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

type ResponseType = ISuccess | IError;
interface IEndpoints {
	plural: string;
	singular: string;
}

export /*bundle*/ class Route {
	#manager: Manager;
	#endpoints: IEndpoints;

	constructor({ manager, endpoints }: { endpoints: IEndpoints; manager: Manager }) {
		this.#manager = manager;
		this.#endpoints = endpoints;
	}

	setup = (app: Application) => {
		app.get(`/${this.#endpoints.plural}`, this.list);
		app.get(`/${this.#endpoints.singular}/:id`, this.get);
		app.post(`/${this.#endpoints.singular}`, this.create);
		app.put(`/${this.#endpoints.singular}`, this.update);
	};

	list = async (req: Request, res: Response) => {
		try {
			let { start, limit, ...query } = req.query;

			const response: ResponseType = await this.#manager.list({
				start,
				limit,
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
			const data = req.body.body;
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
			const data = req.body.data;
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
}
