import { DB } from '@essential-js/admin-server/db';
import { Manager } from '@essential-js/admin-server/helpers';

export class ProfilesManager extends Manager {
	constructor() {
		super({ model: DB.models.Profiles });
	}
}

export /*bundle*/ const Profiles = new ProfilesManager();
