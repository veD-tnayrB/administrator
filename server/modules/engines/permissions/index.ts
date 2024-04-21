import { DB } from '@essential-js/admin-server/db';
import { Manager } from '@essential-js/admin-server/helpers';

export class PermissionsManager extends Manager {
	// constructor() {
	// 	super({ model: DB.models.Permissions });
	// }
}

export /*bundle*/ const Permissions = new PermissionsManager();
