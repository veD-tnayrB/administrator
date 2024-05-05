import { StoreListView } from '@essential-js/admin/components/list-view';
import { Modules } from '@essential-js/admin/models';

export class StoreManager extends StoreListView {
	declare specificFilters: { label: string; name: string }[];
	declare generalFilters: string[];
	constructor() {
		super({ collection: new Modules() });
		this.specificFilters = [
			{ label: 'ID', name: 'id' },
			{ label: 'Label', name: 'label' },
			{ label: 'Url', name: 'to' },
		];

		this.generalFilters = ['id', 'label', 'to'];
	}
}
