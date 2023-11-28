import { auth } from '@essential-js/admin/init';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { session } from '@essential-js/admin/auth';
import { ReactiveModel } from '@beyond-js/reactive/model';

type IProviders = 'Google';

export class StoreManager extends ReactiveModel<StoreManager> {
	#providers: {
		[key in IProviders]: any;
	} = {
		Google: new GoogleAuthProvider(),
	};

	#error: string | null = null;
	get error() {
		return this.#error;
	}

	login = async (params: { email: string; password: string }) => {
		try {
			this.fetching = true;
			// const provider = this.#providers[params.provider];
			const response = await session.login(params);
			if (!response.status) throw response.error;
			// const response = await signInWithPopup(auth, provider);
			// console.log('AUTH RESPONSE => ', response);
		} catch (error) {
			console.error(error);
			this.#error = error;
		} finally {
			this.fetching = false;
		}
	};
}
