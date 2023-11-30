import { CollectionProvider } from '@essential-js/admin/helpers';

export class ProfilesCollectionProvider extends CollectionProvider {
	constructor() {
		super({
			collection: 'profiles',
		});
	}
}
