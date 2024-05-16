import { ReactiveModel } from '@beyond-js/reactive/model';
import { Desktop, IDesktopCredentials } from './desktop';

/** Enumeration for Device types. */
enum Device {
	Mobile = 'Mobile',
	Web = 'Web',
}

/**
 * Class representing Firebase Notifications.
 * @class
 * @extends {ReactiveModel<Notifier>}
 */
export /*bundle*/ class Notifier extends ReactiveModel<Notifier> {
	/** @private */
	#device: Desktop = new Desktop();
	/** Callback for message received event. */
	onMessageReceived: (params: { notification: any; metadata: any }) => void = () => { };;
	/** Callback for message error event. */
	onMessageError: (error: string) => void = () => { };
	/** Callback for handle the device registration. */
	onRegisterDevice: (params: { tokenDevice: string; device: string }) => void | Promise<any> = () => { };
	/** @private */
	#deviceToken: string = '';
	#lastMessageId: string = '';

	/** Getter for device token.
	 */
	get deviceToken() {
		return this.#deviceToken;
	}

	/** Constructor for FirebaseNotifications. */
	constructor() {
		super();
		//const device = this.#getDevice();

		setInterval(() => {
			this.renewDeviceToken();
		}, 50 * 60 * 1000);
	}

	onMessagePreHandler = (payload: Record<string, any>) => {
		if (this.#getDevice() === Device.Web) {
			const { notification, ...metadata } = payload;
			if (this.#lastMessageId === metadata.messageId) return;

			this.#lastMessageId = metadata.messageId;
			this.onMessageReceived({ notification, metadata });
			return;
		}

		const { body, title, ...metadata } = payload;
		this.onMessageReceived({ notification: { body, title }, metadata });
	};

	/**
	 * Method to get the device type.
	 * @private
	 */
	#getDevice = () => {
		const userAgent = navigator.userAgent

		const isMobile =
			/windows phone/i.test(userAgent) ||
			/android/i.test(userAgent) ||
			(/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream);

		if (isMobile) return Device.Mobile;
		return Device.Web;
	};

	/**
	 * Method to initialize notifications.
	 * @async
	 * @param {Object} params - The initialization parameters.
	 * @param {IDesktopCredentials} params.credentials - The desktop credentials.
	 * @param {Object} params.opts - Additional options.
	 * @param {string} params.opts.userId - The user ID.
	 */
	init = async (params: { credentials: IDesktopCredentials; opts?: any }) => {
		if (!this.onMessageReceived || (!this.onMessageError)) {
			const extraMessage = 'or onMessageError arent defined';
			console.error(`onMessageReceived ${extraMessage}`);
			return;
		}

		await this.#device.init(this, params);
		this.#deviceToken = this.#device.token;
		return { status: true };
	};

	/**
	 * Renueva el token del dispositivo si es necesario.
	 * @async
	 */
	renewDeviceToken = async () => {
		return await this.#device.renewToken();
	};
}
