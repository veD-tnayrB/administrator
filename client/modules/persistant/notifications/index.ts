import { FIREBASE_CREDENTIALS } from '@essential-js/admin/serverless-provider';
import { ReactiveModel } from '@beyond-js/reactive/model';
import { Notifier } from './library/notifier.index';
import { Api } from '@bgroup/http-suite/api';
import config from '@essential-js/admin/config';

export /*bundle*/ class NotificationsHandler extends ReactiveModel<NotificationsHandler> {
	#api: Api = new Api(config.params.server);
	#provider: Notifier = new Notifier();
	#token: string = this.#provider.deviceToken;
	get token() {
		return this.#token;
	}

	constructor({ session }) {
		super();
		this.#provider.onMessageReceived = this.#onMessageReceived;
		this.init();
		session.on('change', () => this.#api.bearer(session.token));
		this.#api.bearer(session.token);
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

	#onMessageReceived = async params => {
		const response = await this.#api.put('notification/markAsRead', { id: '', userId: '' });
	};
}
