import { Profiles } from '@essential-js/admin-server/engines/profiles';
import { Route } from '@essential-js/admin-server/helpers';

class ProfilesRoutes extends Route {
	constructor() {
		super({
			manager: Profiles,
			endpoints: {
				plural: 'profiles',
				singular: 'profile',
			},
		});
	}
}

export const profiles = new ProfilesRoutes();
