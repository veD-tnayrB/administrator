import { ReactiveModel } from '@beyond-js/reactive/model';
import { User } from '@essential-js/admin/models';

interface ILoginParams {
	email: string;
	password: string;
}

class Session extends ReactiveModel<Session> {
	#user: User = new User();
	get user() {
		return this.#user;
	}

	#isLogged: boolean = false;
	get isLogged() {
		return this.#isLogged || !!localStorage.getItem('__session');
	}

	login = async (params: ILoginParams) => {
		try {
			this.fetching = true;
			const response = await this.#user.load({ email: params.email, password: params.password });
			console.log('RESPONSE LOGIN => ', response);
			if (!response.status) throw response.error.message;

			this.#isLogged = true;
			localStorage.setItem('__session', 'true');
			this.triggerEvent('user-changed');
		} catch (error) {
			console.error('ERROR LOGIN ', error);
			return { status: false, error };
		} finally {
			this.fetching = false;
		}
	};
}

export /*bundle*/ const session = new Session();
