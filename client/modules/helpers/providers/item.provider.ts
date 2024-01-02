import { Api } from '@bgroup/http-suite/api';
import config from '@essential-js/admin/config';
import { session } from '@essential-js/admin/auth';

interface IItemEndpoints {
	publish: string;
	get: string;
}

export /*bundle*/ abstract class ItemProvider {
	#api: Api = new Api(config.params.server).bearer(session.token);
	get api() {
		return this.#api;
	}

	#endpoints: IItemEndpoints;

	constructor(params: { endpoints: IItemEndpoints }) {
		if (!params?.endpoints) throw new Error('Endpoints are required');
		this.#endpoints = params.endpoints;
		session.on('token-changed', () => this.#api.bearer(session.token));
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
		return this.#api[method](this.#endpoints.publish, { body: params });
	};

	data = async params => {
		return this.#api.get(this.#endpoints.get + `/${params.id}`);
	};
}
