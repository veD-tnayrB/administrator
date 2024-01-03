import { ReactiveModel } from '@beyond-js/reactive/model';
import { UserItemProvider } from './user.item.provider';

interface IUser {
	id: string;
	active: boolean;
	email: string;
	lastNames: string;
	names: string;
	timeCreated: Date;
	timeUpdated: Date;
}

export /*bundle*/ class User extends ReactiveModel<IUser> {
	private provider: UserItemProvider = new UserItemProvider();

	get fullName() {
		let namesArray = this.names.split(' ');
		let lastNamesArray = this.lastNames.split(' ');

		return this.lastNames ? this.names : `${namesArray[0]} ${lastNamesArray[0]}`;
	}

	constructor() {
		super();
		this.reactiveProps(['id', 'names', 'lastNames', 'email', 'active', 'timeCreated', 'timeUpdated']);
	}

	login = async (params: { email: string; password?: string }) => {
		try {
			this.fetching = true;
			const response = await this.provider.login(params);
			if (!response.status) throw response.error;
			return response;
		} catch (error) {
			console.error(error);
			return { status: false, error };
		} finally {
			this.fetching = false;
		}
	};

	data = async ({ id }: { id: string }) => {
		try {
			this.fetching = true;
			const response = await this.provider.data({ id });
			if (!response.status) throw response.error;
			return response;
		} catch (error) {
			console.error(error);
			return { status: false, error };
		} finally {
			this.fetching = false;
		}
	};
}
