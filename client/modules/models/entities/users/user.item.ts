import { Item } from '@beyond-js/reactive/entities';
import { UserItemProvider } from '../../providers/users/user.item.provider';
import config from '@essential-js/admin/config';

export /*bundle*/ interface IUser {
	id: string;
	isNew: boolean;
	active: boolean;
	email: string;
	lastNames: string;
	profiles: string[];
	names: string;
	profileImg: string;
	timeCreated: Date;
	timeUpdated: Date;
}

export /*bundle*/ class User extends Item<IUser> {
	protected properties = [
		'id',
		'active',
		'email',
		'lastNames',
		'names',
		'timeCreated',
		'timeUpdated',
		'profileImg',
		'profiles',
	];

	get fullName() {
		let namesArray = this.names.split(' ');
		let lastNamesArray = this.lastNames.split(' ');

		return this.lastNames ? `${namesArray[0]} ${lastNamesArray[0]}` : this.names;
	}

	constructor(params: { id?: string | undefined } = { id: undefined }) {
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
