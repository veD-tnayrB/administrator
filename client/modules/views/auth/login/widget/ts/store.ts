import { session, Providers } from '@essential-js/admin/auth';
import { ReactiveModel } from '@beyond-js/reactive/model';
import { routing } from '@beyond-js/kernel/routing';

export class StoreManager extends ReactiveModel<StoreManager> {
	#error: string | null = null;
	get error() {
		return this.#error;
	}

	login = async (params: { email: string; password: string }, provider?: Providers) => {
		try {
			this.fetching = true;
			const response = await session.login(params, provider);
			if (!response.status) throw response.error;
			routing.pushState('/dashboard');
		} catch (error) {
			console.error(error);
			this.#error = error;
		} finally {
			this.fetching = false;
		}
	};
}
