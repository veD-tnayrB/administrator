import { Item } from '@beyond-js/reactive/entities';
import { UserItemProvider } from '../../providers/users/user.item.provider';
import config from '@essential-js/admin/config';

export /*bundle*/ interface IUser {
	id: string;
	active: boolean;
	email: string;
	lastNames: string;
	names: string;
	timeCreated: Date;
	timeUpdated: Date;
}

export /*bundle*/ class User extends Item<IUser> {
	protected properties = ['id', 'active', 'email', 'lastNames', 'names', 'timeCreated', 'timeUpdated'];

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
}
