import { Api } from '@bgroup/http-suite/api';
import config from '@essential-js/admin/config';

export class UserItemProvider {
	#api: Api = new Api(config.params.server);
	get api() {
		return this.#api;
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
		return this.#api[method]('user', params);
	};

	data = async params => {
		return this.#api.get('user' + `/${params.id}`);
	};

	delete = (id: string) => {
		return this.#api.delete('user' + `/${id}`, {});
	};

	login = (params: { email: string; password?: string; notificationsToken: string }) => {
		return this.#api.post('login', params);
	};

	logout = (params: { token: string }) => {
		this.#api.bearer(params.token);
		return this.#api.get('auth/logout', params);
	};
}
