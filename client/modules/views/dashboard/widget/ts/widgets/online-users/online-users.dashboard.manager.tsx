import { ReactiveModel } from '@beyond-js/reactive/model';
import { Users } from '@essential-js/admin/models';

export interface IOnlineUsers {
	label: string;
	value: number;
}

export class OnlineUsersWidgetManager extends ReactiveModel<OnlineUsersWidgetManager> {
	#collection: Users = new Users();
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

			const response = await this.#collection.load();
			if (!response.status) throw new Error(response.error);

			const totals = {
				active: 0,
				inactive: 0,
			};

			response.data.forEach(item => {
				if (item.active) return totals.active++;
				totals.inactive++;
			});

			this.#data = [
				{
					label: 'Activos',
					value: totals.active,
				},
				{
					label: 'Inactivos',
					value: totals.inactive,
				},
			];
		} catch (error) {
			console.error(error);
			return error;
		} finally {
			this.fetching = false;
		}
	};
}
