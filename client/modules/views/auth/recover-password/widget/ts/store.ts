import { routing } from '@beyond-js/kernel/routing';
import { session } from '@essential-js/admin/auth';
import { MultilanguageStore } from '@essential-js/admin/helpers';
import { module } from 'beyond_context';
import { ITexts } from './types';

export class StoreManager extends MultilanguageStore<StoreManager, ITexts> {
	#error: string | null = null;
	get error() {
		return this.#error;
	}

	values = {
		password: '',
		repeatedPassword: '',
	};

	success: boolean = false;

	constructor() {
		super(module.specifier);
	}

	getValidations = (password: string, repeatedPassword: string) => {
		return {
			isMoreOrEqualToEightCharacters: {
				condition: password.length >= 8,
				message: this.texts.validations.isMoreOrEqualToEightCharacters,
			},
			hasOneUppercaseLetter: {
				condition: /[A-Z]/.test(password),
				message: this.texts.validations.hasOneUppercaseLetter,
			},
			hasOneLowercaseLetter: {
				condition: /[a-z]/.test(password),
				message: this.texts.validations.hasOneLowercaseLetter,
			},
			isBothPasswordEqual: {
				condition: password === repeatedPassword && password !== '',
				message: this.texts.validations.isBothPasswordEqual,
			},
		};
	};

	recoverPassword = async (params: {
		token: string;
		newPassword: string;
	}) => {
		try {
			this.fetching = true;

			const response = await session.user.recoverPassword(params);
			console.log('RESPONSE RECOVER PASSWORD: ', response);
			if (!response.status) throw response.error;

			this.success = true;
			setTimeout(() => {
				this.success = false;
			}, 2000);
			routing.pushState('/auth/login');
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
