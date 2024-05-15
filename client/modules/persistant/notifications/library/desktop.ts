import { initializeApp } from 'firebase/app';
import { Messaging, getMessaging, getToken, onMessage } from 'firebase/messaging';
import { getAuth } from 'firebase/auth';
import { Notifier } from './notifier.index';

/**
 * Interface for Desktop Credentials.
 * @interface
 */
export interface IDesktopCredentials {
	apiKey: string;
	authDomain: string;
	databaseURL: string;
	projectId: string;
	storageBucket: string;
	messagingSenderId: string;
	appId: string;
	measurementId: string;
	VAPID_KEY: string;
}

const DESKTOP_KEY = 'Desktop';

/**
 * Class representing Desktop Notifications.
 * @class
 */
export class Desktop {
	/** @private */
	#parent: Notifier | undefined;
	/** @private */
	#messaging: Messaging | undefined;
	/** @private */
	#token: string = '';

	/**
	 * Getter for token.
	 */
	get token() {
		return this.#token;
	}

	/** @private */
	#credentials: IDesktopCredentials | undefined;

	/**
	 * Initializes Desktop Notifications.
	 * @async
	 * @param {FirebaseNotifications} parent - The parent FirebaseNotifications instance.
	 * @param {Object} params - The initialization parameters.
	 * @param {IDesktopCredentials} params.credentials - The credentials for Firebase.
	 * @param {Object} params.opts - Additional options.
	 * @param {string} params.opts.userId - The user ID.
	 */
	init = async (parent: Notifier, params: { credentials: IDesktopCredentials; opts?: { userId: string } }) => {
		this.#parent = parent;
		this.#credentials = params.credentials;
		const app = initializeApp(this.#credentials);
		this.#messaging = getMessaging(app);

		const permission = await window.Notification.requestPermission();
		if (permission !== 'granted') return;

		await this.#register();
		onMessage(this.#messaging, this.#parent.onMessagePreHandler);
	};

	/**
	 * Registers the device for notifications.
	 * @async
	 * @private
	 */
	#register = async () => {
		if (!this.#messaging || !this.#credentials || !this.#parent) return;

		const token = await getToken(this.#messaging, { vapidKey: this.#credentials.VAPID_KEY });
		if (this.#token) return;
		this.#token = token;

		return this.#parent.onRegisterDevice({
			device: DESKTOP_KEY,
			tokenDevice: token,
		});
	};

	renewToken = async () => {
		if (!this.#parent) return;
		const currentUser = getAuth().currentUser;
		if (!currentUser) return;
		this.#token = await currentUser.getIdToken(true);
		this.#parent.onRegisterDevice({
			device: DESKTOP_KEY,
			tokenDevice: this.#token,
		});
		return { status: true };
	};
}
