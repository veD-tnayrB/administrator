import { ItemProvider } from '@essential-js/admin/helpers';

export class ProfileItemProvider extends ItemProvider {
	constructor() {
		super({
			collection: 'profiles',
		});
	}
}
