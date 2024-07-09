import { ReactiveModel } from '@beyond-js/reactive/model';
import { Widgets } from '@essential-js/admin/models';

export interface IOnlineUsers {
	label: string;
	value: number;
}

export class UsersLocationWidgetManager extends ReactiveModel<UsersLocationWidgetManager> {
	#collection: Widgets = new Widgets();
	get collection() {
		return this.#collection;
	}

	#data: IOnlineUsers[] = [];

	get data() {
		return this.#data;
	}

	load = async () => {
		try {
			this.fetching = true;

			const response = await this.#collection.getUsersLocation();
			const formatedData: Array<{ label: string; value: number }> = [];
			Object.entries(response.data).forEach(([key, value]) =>
				formatedData.push({ label: key, value: value as number })
			);

			this.#data = formatedData;
		} catch (error) {
			console.error(error);
			return error;
		} finally {
			this.fetching = false;
		}
	};
}
