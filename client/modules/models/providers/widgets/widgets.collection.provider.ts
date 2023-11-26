import { CollectionProvider } from '@essential-js/admin/helpers';

export class WidgetsCollectionProvider extends CollectionProvider {
	constructor() {
		super({
			collection: 'widgets',
		});
	}
}
