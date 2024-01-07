import { Api } from '@bgroup/http-suite/api';
import config from '@essential-js/admin/config';

export class UserItemProvider {
	#api: Api = new Api(config.params.server);

	login = (params: { email: string; password?: string }) => {
		return this.#api.post('login', params);
	};

	data = (params: { token: string }) => {
		return this.#api.get('auth/get-user', params);
	};
}
