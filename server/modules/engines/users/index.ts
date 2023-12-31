import { DB } from '@essential-js/admin-server/db';
import { Manager } from '@essential-js/admin-server/helpers';

export class UsersManager extends Manager {
	constructor() {
		super({ model: DB.models.Users });
	}
}

export /*bundle*/ const Users = new UsersManager();
