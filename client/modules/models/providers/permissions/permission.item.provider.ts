import { ItemProvider } from '@essential-js/admin/helpers';

export class PermissionsItemProvider extends ItemProvider {
	constructor() {
		super({
			endpoints: {
				publish: 'permission',
				get: 'permission',
				delete: 'permission',
			},
		});
	}
}
