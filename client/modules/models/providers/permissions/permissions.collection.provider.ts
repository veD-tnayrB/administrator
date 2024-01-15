import { CollectionProvider } from '@essential-js/admin/helpers';

export class PermissionsCollectionProvider extends CollectionProvider {
	constructor() {
		super({
			endpoints: {
				list: 'permissions',
			},
		});
	}
}
