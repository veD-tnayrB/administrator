import { StoreListView } from '@essential-js/admin/components/list-view';
import { Profiles } from '@essential-js/admin/models';

export class StoreManager extends StoreListView {
	declare specificFilters: { label: string; name: string }[];
	declare generalFilters: string[];
	constructor() {
		super({ collection: new Profiles(), id: 'profiles' });
		this.specificFilters = [
			{ label: 'ID', name: 'id' },
			{ label: 'Name', name: 'name' },
			{ label: 'Description', name: 'description' },
		];

		this.generalFilters = ['id', 'name', 'description'];
	}
}
