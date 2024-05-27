import { IAuthUser } from '@essential-js/admin-server/types';
import { ILoginParams, Login } from './cases/login';
import { Get, IGet } from './cases/get';
import { Logout } from './cases/logout';
import { Update } from './cases/update';

class AuthManager {
	login = async (params: ILoginParams) => {
		return Login.execute(params);
	};

	getUser = async (params: IGet) => {
		return Get.execute(params);
	};

	logout = async (params: { token: string }) => {
		return Logout.execute(params);
	};

	update = async (params: Partial<IAuthUser>) => {
		return Update.execute(params);
	};
}

export /*bundle*/ const Auth = new AuthManager();
