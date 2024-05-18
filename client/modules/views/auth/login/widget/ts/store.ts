import { session, Providers } from '@essential-js/admin/auth';
import { ReactiveModel } from '@beyond-js/reactive/model';
import { routing } from '@beyond-js/kernel/routing';
import type { IPermission } from '@essential-js/admin/models';

export class StoreManager extends ReactiveModel<StoreManager> {
	#error: string | null | unknown = null;
	get error() {
		return this.#error;
	}

	login = async (params: { email: string; password: string }, provider?: Providers) => {
		try {
			this.fetching = true;
			const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
			const response = await session.login({ ...params, timezone }, provider);
			if (!response.status) throw response.error;

			session.user.permissions.sort((a: IPermission, b: IPermission) => a.moduleTo.localeCompare(b.moduleTo));
			const redirectTo = session.user.permissions.length ? session.user.permissions[0].moduleTo : '/error/403';
			routing.pushState(redirectTo);
		} catch (error) {
			console.error(error);
			this.#error = error;
		} finally {
			this.fetching = false;
		}
	};
}
