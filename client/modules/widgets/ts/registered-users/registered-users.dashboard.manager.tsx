import { ReactiveModel } from '@beyond-js/reactive/model';
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

	#selectedYear: number = 2024;
	get selectedYear() {
		return this.#selectedYear;
	}

	set selectedYear(value: number) {
		this.#selectedYear = value;
		this.load();
	}

	load = async () => {
		try {
			this.fetching = true;
			const response = await this.#collection.getRegisteredUsersByMonth({ year: this.#selectedYear });
			this.#data = response.data;
		} catch (error) {
			console.error(error);
			return error;
		} finally {
			this.fetching = false;
		}
	};
}
