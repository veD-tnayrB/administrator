import { ILoginParams, Login } from './cases/login';
import { Get, IGet } from './cases/get';
import { Logout } from './cases/logout';

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
}

export /*bundle*/ const Auth = new AuthManager();
