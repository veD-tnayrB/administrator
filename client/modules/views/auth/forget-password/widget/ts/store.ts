import { session } from '@essential-js/admin/auth';
import { ReactiveModel } from '@beyond-js/reactive/model';
import { routing } from '@beyond-js/kernel/routing';
const EMAIL_REGEX =
	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export class StoreManager extends ReactiveModel<StoreManager> {
	#error: string | null = null;
	get error() {
		return this.#error;
	}

	values = {
		email: '',
	};

	isFirstTime: boolean = true;
	success: boolean = false;

	sendForgetPasswordEmail = async (params: { email: string }) => {
		try {
			this.fetching = true;

			if (!EMAIL_REGEX.test(params.email)) throw 'INVALID_EMAIL';

			const response = await session.forgetPassword(params);
			if (!response.status) throw response.error;

			this.isFirstTime = false;
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
