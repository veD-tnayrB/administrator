import { StoreListView } from '@essential-js/admin/components/list-view';
import { Users } from '@essential-js/admin/models';

export class StoreManager extends StoreListView {
	constructor() {
		super({ collection: new Users() });
	}
}
