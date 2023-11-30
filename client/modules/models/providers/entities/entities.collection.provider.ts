import { CollectionProvider } from '@essential-js/admin/helpers';

export class EntitiesCollectionProvider extends CollectionProvider {
	constructor() {
		super({
			collection: 'entities',
		});
	}
}
