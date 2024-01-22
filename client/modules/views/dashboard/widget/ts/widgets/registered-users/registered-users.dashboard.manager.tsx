import { ReactiveModel } from '@beyond-js/reactive/model';
import { HARDCODED_DATA } from './data';
import { Users } from '@essential-js/admin/models';

export interface IRegisteredUser {
	label: string;
	improved: string;
	value: number;
}

export class RegisteredUsersWidgetManager extends ReactiveModel<RegisteredUsersWidgetManager> {
	#data: IRegisteredUser[] = [];
	#collection: Users = new Users();
	get data() {
		return this.#data;
	}

	load = async () => {
		try {
			this.fetching = true;
			const response = await this.#collection.getRegisteredUsersByMonth({ year: 2024 });
			console.log('RESPONSE 222 => ', response);
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
