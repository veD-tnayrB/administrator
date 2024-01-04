import { Widgets } from '@essential-js/admin-server/engines/widgets';
import { Route } from '@essential-js/admin-server/helpers';

class WidgetsRoutes extends Route {
	constructor() {
		super({
			manager: Widgets,
			endpoints: {
				plural: 'widgets',
				singular: 'widget',
			},
		});
	}
}

export const widgets = new WidgetsRoutes();
