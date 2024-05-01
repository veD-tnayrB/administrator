import { ReactiveModel } from '@beyond-js/reactive/model';
import { Users } from '@essential-js/admin/auth';

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

			const activesResponse = await this.#collection.load({ where: { active: 1 } });
			if (!activesResponse.status) throw new Error(activesResponse.error);
			const actives = activesResponse.data.length;

			const inactivesResponse = await this.#collection.load({ where: { active: 0 } });
			if (!inactivesResponse.status) throw new Error(inactivesResponse.error);
			const inactives = inactivesResponse.data.length;

			this.#data = [
				{
					label: 'Actives',
					value: actives,
				},
				{
					label: 'Inactives',
					value: inactives,
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
