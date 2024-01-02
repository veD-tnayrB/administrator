import { ReactiveModel } from '@beyond-js/reactive/model';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '@essential-js/admin/serverless-provider';
import { User } from './user.item';

/**
 * Interface for login parameters.
 * @typedef {Object} ILoginParams
 * @property {string} email - User's email address.
 * @property {string} password - User's password.
 */
interface ILoginParams {
	email: string;
	password: string;
}

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

	#isLogged: boolean = false;

	/**
	 * Getter to check if the user is logged in.
	 * @returns {boolean} True if the user is logged in, false otherwise.
	 */
	get isLogged() {
		return this.#isLogged || !!localStorage.getItem('__session');
	}

	#token: string | null = null;
	get token() {
		const values = JSON.parse(localStorage.getItem('__session'));
		return this.#token || values?.token || null;
	}

	/**
	 * Session constructor.
	 */
	constructor() {
		super();
		this.#listenForSessionChanges();
	}

	/**
	 * Method to log in a user.
	 * @async
	 * @param {ILoginParams} [params] - Login parameters (for email/password login).
	 * @param {'Google'} [provider] - Authentication provider to use (currently only Google).
	 * @returns {Promise<{status: boolean, error?: any}>} Promise object representing the login status.
	 */
	login = async (params?: ILoginParams, provider?: 'Google') => {
		try {
			const theresNoParameters = params && !provider && (!params.email || !params.password);
			if (theresNoParameters) throw 'Email and password are required.';
			this.fetching = true;

			// Login using firebase
			let response: { status: boolean; email?: string };
			if (provider) response = await this.#loginWithGoogle();
			else response = await this.#loginWithEmailAndPassword(params);

			// Define the params to use
			const loadParams = provider ? { email: response?.email } : params;

			// Load the user in a item to be saved in this object
			const loadResponse = await this.#user.login(loadParams);
			if (!loadResponse.status) throw loadResponse.error.message;

			this.#isLogged = true;
			const toSave = {
				token: loadResponse.data.token,
			};
			localStorage.setItem('__session', JSON.stringify(toSave));
			this.#token = loadResponse.data.token;

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
	 * @async
	 * @returns {Promise<{status: boolean, email?: string, error?: any}>} Promise object representing the login status.
	 */
	#loginWithGoogle = async () => {
		try {
			const response = await signInWithPopup(auth, providers[Providers.Google]);
			return { status: true, email: response.user.email };
		} catch (error) {
			return { status: false, error };
		}
	};

	/**
	 * Private method to log in with email and password.
	 * @async
	 * @param {ILoginParams} params - Login parameters.
	 * @returns {Promise<{status: boolean, error?: any}>} Promise object representing the login status.
	 */
	#loginWithEmailAndPassword = async (params: ILoginParams) => {
		try {
			await signInWithEmailAndPassword(auth, params.email, params.password);
			return { status: true };
		} catch (error) {
			return { status: false, error };
		}
	};

	/**
	 * Method to log out the current user.
	 * @async
	 * @returns {Promise<void>} Promise object that resolves when the user is logged out.
	 */
	logout = async () => {
		localStorage.removeItem('__session');
		this.#isLogged = false;
		this.#token = null;
		this.#user = new User();
		this.triggerEvent('token-changed');
		return signOut(auth);
	};

	/**
	 * Private method to remove the current session from the remote server.
	 * @returns {Promise<void>|void} Promise that resolves when the session is removed, or void if there is no current user.
	 */
	#removeSessionFromRemote = () => {
		if (!auth.currentUser) return;
		return auth.currentUser.delete();
	};

	/**
	 * Private method to listen for changes in the authentication state.
	 * @async
	 * @returns {Promise<void>} Promise that resolves when the authentication state changes are handled.
	 */
	#listenForSessionChanges = async () => {
		auth.onAuthStateChanged(async user => {
			if (!user) {
				// Verificar si previamente había un usuario autenticado.
				if (this.#isLogged) {
					return this.logout();
				}
				return;
			}

			// Si hay un usuario, continuar con la carga del usuario.
			const loadResponse = await this.#user.load({ email: user.email });
			if (!loadResponse.status) throw loadResponse.error.message;
			this.#isLogged = true;
			this.triggerEvent('user-changed');
		});
	};
}

/**
 * Instance of the Session class.
 */
export /*bundle*/ const session = new Session();
