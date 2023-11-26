import { ItemProvider } from '@essential-js/admin/helpers';

export class UserItemProvider extends ItemProvider {
	constructor() {
		super({
			collection: 'users',
		});
	}
}
