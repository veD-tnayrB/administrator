import { ReactiveModel } from '@beyond-js/reactive/model';
import {
	NotificationHistory,
	NotificationsHistory,
} from '@essential-js/admin/models';
import { Notifier } from './library/notifier.index';

class NotificationsHandler extends ReactiveModel<NotificationsHandler> {
	#provider: Notifier = new Notifier();
	#token: string = this.#provider.deviceToken;
	get token() {
		return this.#token;
	}

	#userId: string = '';

	#notifications: NotificationsHistory = new NotificationsHistory();

	#items: NotificationHistory[] = [];
	get items() {
		return this.#items;
	}

	#current: NotificationHistory | null = null;
	get current() {
		return this.#current;
	}

	constructor() {
		super();
		this.#provider.onMessageReceived = this.#onMessageReceived;
	}

	init = async () => {
		try {
			this.fetching = true;
			await this.#provider.init();
			this.#token = this.#provider.deviceToken;
			return this.#token;
		} catch (error) {
			return { status: false, error };
		} finally {
			this.fetching = false;
		}
	};

	load = async (params: { userId: string }) => {
		try {
			this.#userId = params.userId;
			this.fetching = true;
			const response = await this.#notifications.load(params);
			if (!response.status) throw response.error;

			this.#items = response.data;
			this.fetching = false;
			this.triggerEvent();
			return response;
		} catch (error) {
			console.error('ERROR LOADING NOTIFICATIONS LISTS: ', error);
			return { status: false, error };
		}
	};

	markAsRead = async (params: { ids: string[]; userId: string }) => {
		try {
			this.#userId = params.userId;
			this.fetching = true;
			const response = await this.#notifications.markAsRead(params);
			if (response && !response.status) throw response.error;

			this.#current = null;
			this.load({ userId: this.#userId });
			return response;
		} catch (error) {
			console.error('ERROR LOADING NOTIFICATIONS LISTS: ', error);
			return { status: false, error };
		}
	};

	#onMessageReceived = async (params: {
		notification: { body: string; title: string };
	}) => {
		const current = new NotificationHistory();
		current.set(params.notification);
		this.#current = current;
		this.load({ userId: this.#userId });
		this.triggerEvent('notification.received');
	};
}

export /*bundle*/ const notificationsHandler = new NotificationsHandler();
