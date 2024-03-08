import { StoreListView } from '@essential-js/admin/components/list-view';
import { Profiles } from '@essential-js/admin/models';

export class ProfilesManager extends StoreListView {
	constructor() {
		super({ collection: new Profiles() });
		this.propertiesToSearch = [
			{ label: 'ID', name: 'id' },
			{ label: 'Name', name: 'name' },
			{ label: 'Description', name: 'description' },
			{ label: 'Email', name: 'email' },
		];
	}
}
