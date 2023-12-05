import { StoreViewTable } from '@essential-js/admin/helpers';
import { Users } from '@essential-js/admin/models';

export class StoreManager extends StoreViewTable {
	constructor() {
		super({ collection: new Users() });
	}
}
