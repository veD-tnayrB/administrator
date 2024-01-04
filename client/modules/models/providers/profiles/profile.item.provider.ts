import { ItemProvider } from '@essential-js/admin/helpers';

export class ProfileItemProvider extends ItemProvider {
	constructor() {
		super({
			endpoints: {
				publish: 'profile',
				get: 'profile',
				delete: 'profile',
			},
		});
	}
}
