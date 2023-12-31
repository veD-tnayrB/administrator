import { CollectionProvider } from '@essential-js/admin/helpers';

export class UsersCollectionProvider extends CollectionProvider {
	constructor() {
		super({
			endpoints: {
				list: 'users',
			},
		});
	}
}
