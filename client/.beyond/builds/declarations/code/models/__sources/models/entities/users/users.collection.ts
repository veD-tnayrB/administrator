import { Collection } from '@beyond-js/reactive/entities';
import config from '@essential-js/admin/config';
import { UsersCollectionProvider } from '../../providers/users/users.collection.provider';
import { User } from './user.item';

export /*bundle*/ class Users extends Collection {
	constructor() {
		super({
			provider: UsersCollectionProvider,
			storeName: 'users',
			db: config.params.application.localDB,
			localdb: true,
			item: User,
		});
	}
}
