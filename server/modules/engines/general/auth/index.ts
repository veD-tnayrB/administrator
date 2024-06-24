import { IAuthUser } from '@essential-js/admin-server/types';
import { ILoginParams, Login } from './cases/login';
import { Get, IGet } from './cases/get';
import { ILogoutParams, Logout } from './cases/logout';
import { Update } from './cases/update';
import { ForgetPassword, IRecoverPassword, ISendEmailForgetPassword } from './cases/forget-password';

class AuthManager {
	login = async (params: ILoginParams) => {
		return Login.execute(params);
	};

	getUser = async (params: IGet) => {
		return Get.execute(params);
	};

	logout = async (params: ILogoutParams) => {
		return Logout.execute(params);
	};

	update = async (params: Partial<IAuthUser>) => {
		return Update.execute(params);
	};

	forgetPassword = async (params: ISendEmailForgetPassword) => {
		return ForgetPassword.sendEmail(params);
	};

	recoverPassword = async (params: IRecoverPassword) => {
		return ForgetPassword.recover(params);
	};
}

export /*bundle*/ const Auth = new AuthManager();
