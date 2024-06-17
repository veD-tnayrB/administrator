import { session, Providers } from '@essential-js/admin/auth';
import { ReactiveModel } from '@beyond-js/reactive/model';
import { routing } from '@beyond-js/kernel/routing';
import { notificationsHandler } from '@essential-js/admin/notifications';

export class StoreManager extends ReactiveModel<StoreManager> {
	#error: string | null = null;
	get error() {
		return this.#error;
	}

	values = {
		email: '',
		password: '',
	};

	login = async (params: { email: string; password: string }, provider?: Providers) => {
		try {
			this.fetching = true;
			const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
			const notificationsToken = await notificationsHandler.token;
			const response = await session.login({ ...params, timezone, notificationsToken }, provider);
			if (!response.status) throw response.error;

			const redirectTo = '/dashboard';
			routing.pushState(redirectTo);
		} catch (error) {
			console.error(error);
			this.#error = error as string;
		} finally {
			this.fetching = false;
		}
	};

	reset = () => {
		this.#error = null;
		this.triggerEvent('reset');
	};
}
