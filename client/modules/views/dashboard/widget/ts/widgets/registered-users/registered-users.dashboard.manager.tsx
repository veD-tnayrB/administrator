import { ReactiveModel } from '@beyond-js/reactive/model';
import { HARDCODED_DATA } from './data';

export interface IRegisteredUser {
	label: string;
	improved: string;
	value: number;
}

export class RegisteredUsersWidgetManager extends ReactiveModel<RegisteredUsersWidgetManager> {
	#data: IRegisteredUser[] = [];

	get data() {
		return this.#data;
	}

	load = () => {
		try {
			this.fetching = true;

			setTimeout(() => {
				this.#data = HARDCODED_DATA;
				this.fetching = false;
			}, 1000);
		} catch (error) {
			console.error(error);
			return error;
		} finally {
		}
	};
}
