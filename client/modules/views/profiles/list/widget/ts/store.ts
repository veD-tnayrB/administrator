import { StoreViewTable } from '@essential-js/admin/helpers';
import { Profiles } from '@essential-js/admin/models';

export class StoreManager extends StoreViewTable {
	constructor() {
		super({ collection: new Profiles() });
	}
}
