import { FIREBASE_CREDENTIALS } from '@essential-js/admin/serverless-provider';
import { ReactiveModel } from '@beyond-js/reactive/model';
import { Notifier } from './library/notifier.index';
import { INotification } from './types';

class NotificationsHandler extends ReactiveModel<NotificationsHandler> {
	#provider: Notifier = new Notifier();
	#token: string = this.#provider.deviceToken;
	get token() {
		return this.#token;
	}

	#items: INotification[] = [];
	get items() {
		return this.#items;
	}

	#current: INotification | null = null;
	get current() {
		return this.#current;
	}

	constructor() {
		super();
		this.#provider.onMessageReceived = this.#onMessageReceived;
		this.init();
	}

	init = async () => {
		try {
			this.fetching = true;
			await this.#provider.init({ credentials: FIREBASE_CREDENTIALS });
			this.#token = this.#provider.deviceToken;
		} catch (error) {
			return { status: false, error };
		} finally {
			this.fetching = false;
		}
	};

	#onMessageReceived = async (params: { notification: INotification }) => {
		this.#current = params.notification;
		console.log('CURRENT NOTIFICATION: ', params);
		this.#items = [this.#current, ...this.#items];
		this.triggerEvent();
	};
}

export /*bundle*/ const notificationsHandler = new NotificationsHandler();
