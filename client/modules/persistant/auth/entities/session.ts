import { ReactiveModel } from '@beyond-js/reactive/model';
import { auth } from '@essential-js/admin/serverless-provider';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { ILogin } from './types';
import { User } from './user.item';
/**
 * Interface for login parameters.
 */
interface ILoginParams {
	email: string;
	notificationsToken: string;
	password: string;
	timezone: string;
}

type ILoginMethodResponse = Promise<{ email: string; status: true } | { status: false; error: unknown }>;
/**
 * Enum for supported authentication providers.
 * @readonly
 * @enum {string}
 */
export /*bundle*/ enum Providers {
	Google = 'Google',
}

/**
 * Object containing instances of authentication providers.
 */
const providers = {
	[Providers.Google]: new GoogleAuthProvider(),
};

/**
 * Class representing a user session.
 * @extends ReactiveModel
 */
class Session extends ReactiveModel<Session> {
	#user: User = new User();
	get user() {
		return this.#user;
	}

	#isLogged: boolean = !!localStorage.getItem('__session');

	/**
	 * Getter to check if the user is logged in.
	 */
	get isLogged() {
		return this.#isLogged || !!localStorage.getItem('__session');
	}

	#isLoaded: boolean = false;
	get isLoaded() {
		return this.#isLoaded;
	}

	#token: string | null = JSON.parse(localStorage.getItem('__session') || '{}')?.token;
	get token() {
		const values = JSON.parse(localStorage.getItem('__session') || '{}');
		return this.#token || values?.token;
	}

	/**
	 * Session constructor.
	 */
	constructor() {
		super();
		this.#listenForSessionChanges();
		if (this.#isLogged) this.load();
	}

	/**
	 * Method to log in a user.
	 */
	login = async (params: ILoginParams, provider?: 'Google') => {
		try {
			const theresNoParameters = params && !provider && (!params.email || !params.password);
			if (theresNoParameters) throw 'Email and password are required.';
			this.fetching = true;

			// Login using firebase
			let response: { status: true; email: string } | { status: false; error: unknown } = {
				status: true,
				email: '',
			};
			if (provider && provider === 'Google') response = await this.#loginWithGoogle();
			if (!response.status) throw response.error;

			// Define the params to use
			const loadParams: ILogin = provider
				? { email: response.email, notificationsToken: params.notificationsToken }
				: { ...params };

			// Load the user in a item to be saved in this object
			const loadResponse = await this.#user.login(loadParams);
			if (!loadResponse.status) throw loadResponse.error;

			const toSave = {
				token: loadResponse.data.token,
			};
			localStorage.setItem('__session', JSON.stringify(toSave));
			this.#token = loadResponse.data.token;
			this.#user.set({ ...loadResponse.data.user, loaded: true });
			this.#isLogged = true;
			this.#isLoaded = true;
			this.triggerEvent('user-changed');
			this.triggerEvent('token-changed');

			return { status: true };
		} catch (error) {
			await this.#removeSessionFromRemote();
			await this.logout();
			return { status: false, error };
		} finally {
			this.fetching = false;
		}
	};

	/**
	 * Private method to log in with Google.
	 */
	#loginWithGoogle = async (): ILoginMethodResponse => {
		try {
			this.fetching = false;
			const response = await signInWithPopup(auth, providers[Providers.Google]);
			if (!response.user.email) throw 'User email not found';

			return { status: true, email: response.user.email as string };
		} catch (error) {
			console.error(error);
			return { status: false, error };
		}
	};

	/**
	 * Private method to log in with email and password.
	 */
	#loginWithEmailAndPassword = async (params: ILoginParams): ILoginMethodResponse => {
		try {
			await signInWithEmailAndPassword(auth, params.email, params.password);
			return { status: true, email: params.email };
		} catch (error) {
			return { status: false, error };
		}
	};

	load = async () => {
		try {
			this.fetching = true;
			if (!this.#isLogged || !this.#token) return;
			const response = await this.#user.load({ token: this.#token });
			if (!response.status) throw response.error;
			this.#user.set({ ...response.data.user, loaded: true });
			this.#isLoaded = true;
			this.#isLogged = true;
			this.triggerEvent('user-changed');
			return { status: true };
		} catch (error) {
			console.error(error);
			return { status: false, error };
		} finally {
			this.fetching = false;
		}
	};

	/**
	 * Method to log out the current user.
	 */
	logout = async () => {
		localStorage.removeItem('__session');
		this.#isLogged = false;
		await this.#user.logout();
		this.#token = null;
		this.#user = new User();
		this.#isLoaded = false;
		this.triggerEvent('token-changed');
		this.triggerEvent('user-changed');
		return signOut(auth);
	};

	/**
	 * Private method to remove the current session from the remote server.
	 */
	#removeSessionFromRemote = () => {
		if (!auth.currentUser) return;
		return auth.currentUser.delete();
	};

	/**
	 * Private method to listen for changes in the authentication state.
	 */
	#listenForSessionChanges = async () => {
		auth.onAuthStateChanged(async () => {
			if (!this.#user && this.#isLogged) {
				return this.logout();
			}

			// Si hay un usuario, continuar con la carga del usuario.
			// if (!this.#isLogged || !this.#token) return;
			// const loadResponse = await this.#user.load({ token: this.#token });
			// if (!loadResponse.status) throw loadResponse.error.message;
			// this.#isLogged = true;
			// this.triggerEvent('user-changed');
		});
	};
}

/**
 * Instance of the Session class.
 */
export /*bundle*/ const session = new Session();
