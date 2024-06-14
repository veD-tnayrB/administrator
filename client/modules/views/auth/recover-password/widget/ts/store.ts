import { session } from '@essential-js/admin/auth';
import { ReactiveModel } from '@beyond-js/reactive/model';
import { routing } from '@beyond-js/kernel/routing';

export class StoreManager extends ReactiveModel<StoreManager> {
	#error: string | null = null;
	get error() {
		return this.#error;
	}

	values = {
		password: '',
		repeatedPassword: '',
	};

	success: boolean = false;

	recoverPassword = async (params: { token: string; newPassword: string }) => {
		try {
			this.fetching = true;

			const response = await session.user.recoverPassword(params);
			if (!response.status) throw response.error;

			this.success = true;
			setTimeout(() => {
				this.success = false;
			}, 2000);
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
