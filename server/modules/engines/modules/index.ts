import { DB } from '@essential-js/admin-server/db';
import { Manager } from '@essential-js/admin-server/helpers';

export class ModulesManager extends Manager {
	constructor() {
		super({ model: DB.models.Modules });
	}
}

export /*bundle*/ const Modules = new ModulesManager();
