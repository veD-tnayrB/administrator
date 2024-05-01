import { Item } from '@beyond-js/reactive/entities';
import config from '@essential-js/admin/config';
import { UserItemProvider } from '../providers/user.item.provider';

export /*bundle*/ interface IUser {
	id: string;
	active: boolean;
	email: string;
	lastNames: string;
	profiles: string[];
	names: string;
	timeCreated: Date;
	timeUpdated: Date;
}

export /*bundle*/ class User extends Item<IUser> {
	protected properties = ['id', 'active', 'email', 'lastNames', 'names', 'timeCreated', 'timeUpdated', 'profiles'];

	get fullName() {
		let namesArray = this.names.split(' ');
		let lastNamesArray = this.lastNames.split(' ');

		return this.lastNames ? this.names : `${namesArray[0]} ${lastNamesArray[0]}`;
	}

	constructor(params: { id: string | undefined } = { id: undefined }) {
		super({
			provider: UserItemProvider,
			storeName: 'users',
			db: config.params.application.localDB,
			...params,
		});
	}

	login = async (params: { email: string; password?: string; notificationsToken: string }) => {
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

	load = async (params: { token: string }) => {
		try {
			this.fetching = true;
			const response = await this.provider.data(params);
			if (!response.status) throw response.error;
			return response;
		} catch (error) {
			console.error(error);
			return { status: false, error };
		} finally {
			this.fetching = false;
		}
	};

	logout = async () => {
		try {
			this.fetching = true;
			const response = await this.provider.logout({ token: this.token });
			if (!response.status) throw response.error;
			return response;
		} catch (error) {
			return { status: false, error };
		} finally {
			this.fetching = false;
		}
	};
}
