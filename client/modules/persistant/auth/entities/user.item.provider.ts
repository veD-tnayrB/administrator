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

	forgetPassword = (params: { email: string }) => {
		return this.#api.get(`auth/forget-password/${params.email}`);
	};

	publish = (params: Partial<IUser>) => {
		this.#api.bearer(params.token);
		return this.#api.put(`auth/update/user/${params.id}`, params);
	};

	recoverPassword = ({ newPassword, token }: { newPassword: string; token: string }) => {
		return this.#api.put(`auth/recover-password/${token}`, { newPassword });
	};
}
