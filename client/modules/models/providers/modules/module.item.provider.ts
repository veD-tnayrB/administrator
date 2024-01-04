import { ItemProvider } from '@essential-js/admin/helpers';

export class ModulesItemProvider extends ItemProvider {
	constructor() {
		super({
			endpoints: {
				publish: 'module',
				get: 'module',
				delete: 'module',
			},
		});
	}
}
