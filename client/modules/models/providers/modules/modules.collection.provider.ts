import { CollectionProvider } from '@essential-js/admin/helpers';

export class ModulesCollectionProvider extends CollectionProvider {
	constructor() {
		super({
			endpoints: {
				list: 'modules',
			},
		});
	}
}
