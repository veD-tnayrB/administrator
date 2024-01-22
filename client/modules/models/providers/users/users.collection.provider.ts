import { CollectionProvider } from '@essential-js/admin/helpers';

export class UsersCollectionProvider extends CollectionProvider {
	constructor() {
		super({
			endpoints: {
				list: 'users',
			},
		});
	}

	getRegisteredUsersByMonth = (params: { year: number }) => {
		return this.api.get(`users/get-registered-users-by-month/${params.year}`);
	};
}
