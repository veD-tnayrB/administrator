import { ItemProvider } from '@essential-js/admin/helpers';

export class EntityItemProvider extends ItemProvider {
	constructor() {
		super({
			collection: 'entities',
		});
	}
}
