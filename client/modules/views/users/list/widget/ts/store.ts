import { StoreListView } from '@essential-js/admin/components/list-view';
import { Users } from '@essential-js/admin/models';

export class StoreManager extends StoreListView {
	constructor() {
		super({ collection: new Users() });
		this.propertiesToSearch = [
			{ label: 'ID', name: 'id' },
			{ label: 'Names', name: 'names' },
			{ label: 'Last name', name: 'lastNames' },
			{ label: 'GMAIL', name: 'email' },
			{ label: 'timeCreated', name: 'timeCreated', type: 'date' },
		];
	}
}
