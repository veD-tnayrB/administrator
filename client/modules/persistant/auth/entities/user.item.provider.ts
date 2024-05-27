import { Api } from '@bgroup/http-suite/api';
import config from '@essential-js/admin/config';
import { IUser } from './user.item';

export class UserItemProvider {
	#api: Api = new Api(config.params.server);

	login = (params: { email: string; password?: string; notificationsToken: string }) => {
		return this.#api.post('login', params);
	};

	data = (params: { token: string }) => {
		this.#api.bearer(params.token);
		return this.#api.get('auth/get-user', params);
	};

	logout = (params: { token: string }) => {
		this.#api.bearer(params.token);
		return this.#api.get('auth/logout', params);
	};

	publish = (params: Partial<IUser>) => {
		this.#api.bearer(params.token);
		return this.#api.put(`auth/update/user/${params.id}`, params);
	};
}
