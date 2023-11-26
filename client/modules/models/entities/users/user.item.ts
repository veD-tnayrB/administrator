import { Item } from '@beyond-js/reactive/entities';
import { UserItemProvider } from '../../providers/users/user.item.provider';
import config from '@essential-js/admin/config';

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
	protected properties = ['active', 'email', 'lastNames', 'names', 'timeCreated', 'timeUpdated'];

	constructor(params: { id: string | undefined } = { id: undefined }) {
		super({
			provider: UserItemProvider,
			storeName: 'address-types',
			db: config.params.application.localDB,
			...params,
		});
	}
}
