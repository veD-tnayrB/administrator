import { routing } from '@beyond-js/kernel/routing';
import { Providers, session } from '@essential-js/admin/auth';
import { MultilanguageStore } from '@essential-js/admin/helpers';
import { notificationsHandler } from '@essential-js/admin/notifications';
import { module } from 'beyond_context';
import { ITexts } from './types';

export class StoreManager extends MultilanguageStore<StoreManager, ITexts> {
	#error: string | null = null;
	get error() {
		return this.#error;
	}

	values = {
		email: '',
		password: '',
	};

	constructor() {
		super(module.specifier);
		this.ready = true;
	}

	login = async (
		params: { email: string; password: string },
		provider?: Providers
	) => {
		try {
			this.fetching = true;
			const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
			const notificationsToken = notificationsHandler.token;
			const response = await session.login(
				{ ...params, timezone, notificationsToken },
				provider
			);
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
