import { DB } from '@essential-js/admin-server/db';
import { Manager } from '@essential-js/admin-server/helpers';

export class WidgetsManager extends Manager {
	constructor() {
		super({ model: DB.models.Widgets });
	}
}

export /*bundle*/ const Widgets = new WidgetsManager();
