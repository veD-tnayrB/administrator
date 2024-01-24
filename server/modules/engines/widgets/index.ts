import { DB } from '@essential-js/admin-server/db';
import { Manager } from '@essential-js/admin-server/helpers';

export class WidgetsManager extends Manager {
	constructor() {
		super({ model: DB.models.Widgets });
	}

	getTotals = async () => {
		try {
			const response = await DB.models.Totals.findAll({});
			const totals = response.map(t => t.get({ plain: true }))[0];

			return { status: true, data: totals };
		} catch (error) {
			return { status: false, error };
		}
	};
}

export /*bundle*/ const Widgets = new WidgetsManager();
