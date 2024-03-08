import { StoreListView } from '@essential-js/admin/components/list-view';
import { Users } from '@essential-js/admin/models';

export class UsersManager extends StoreListView {
	constructor() {
		super({ collection: new Users() });
		this.propertiesToSearch = [
			{ label: 'ID', name: 'id' },
			{ label: 'Name', name: 'name' },
			{ label: 'Description', name: 'description' },
			{ label: 'Email', name: 'email' },
		];
	}
}
