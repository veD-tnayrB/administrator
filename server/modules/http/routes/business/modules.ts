import { Modules } from '@essential-js/admin-server/engines/modules';
import { Route } from '@essential-js/admin-server/helpers';

class ModulesRoutes extends Route {
	constructor() {
		super({
			manager: Modules,
			endpoints: {
				plural: 'modules',
				singular: 'module',
			},
		});
	}
}

export const modules = new ModulesRoutes();
