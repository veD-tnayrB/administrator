import { Users } from '@essential-js/admin-server/engines/users';
import { Route } from '@essential-js/admin-server/helpers';

class UsersRoutes extends Route {
	constructor() {
		super({
			manager: Users,
			endpoints: {
				plural: 'users',
				singular: 'user',
			},
		});
	}
}

export const users = new UsersRoutes();
