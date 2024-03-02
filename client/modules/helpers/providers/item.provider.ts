import { Api } from '../api/api.helper';

interface IItemEndpoints {
	publish: string;
	get: string;
	delete: string;
}

export /*bundle*/ abstract class ItemProvider {
	#api: Api = new Api();
	get api() {
		return this.#api;
	}

	#endpoints: IItemEndpoints;

	constructor(params: { endpoints: IItemEndpoints }) {
		if (!params?.endpoints) throw new Error('Endpoints are required');
		this.#endpoints = params.endpoints;
	}

	publish = (params: {
		isNew: boolean;
		instanceId: number;
		userId: number;
		comment: string;
		timeCreated: string;
		timeUpdated: string;
	}) => {
		const method = params.isNew ? 'post' : 'put';
		return this.#api[method](this.#endpoints.publish, params);
	};

	data = async params => {
		console.log('PARAMS= > ', params);
		return this.#api.get(this.#endpoints.get + `/${params.id}`);
	};

	delete = (id: string) => {
		return this.#api.delete(this.#endpoints.delete + `/${id}`, {});
	};
}
