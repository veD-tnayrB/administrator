import { Item } from '@beyond-js/reactive/entities';
import config from '@essential-js/admin/config';
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

export /*bundle*/ class User extends Item<IUser> {
	protected properties = ['active', 'email', 'lastNames', 'names', 'timeCreated', 'timeUpdated', 'id'];

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
