import { StoreListView } from '@essential-js/admin/components/list-view';
import { Notifications } from '@essential-js/admin/models';

export class StoreManager extends StoreListView {
	constructor() {
		super({ collection: new Notifications() });
		this.propertiesToSearch = [
			{ label: 'ID', name: 'id' },
			{ label: 'Title', name: 'title' },
			{ label: 'Description', name: 'description' },
			{ label: 'Time interval', name: 'timeInterval' },
		];
	}
}
