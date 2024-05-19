import { StoreListView } from '@essential-js/admin/components/list-view';
import { Users } from '@essential-js/admin/models';

export class StoreManager extends StoreListView {

	constructor() {
		super({ collection: new Users(), id: "users" });
		this.params = {
			limit: this.limit,
			start: 0,
			order: 'timeUpdated',
			des: 'DES',
			where: { active: 1 },
		};
		this.specificFilters = [
			{ label: 'ID', name: 'id' },
			{ label: 'Names', name: 'names' },
			{ label: 'Last name', name: 'lastNames' },
			{ label: 'Email', name: 'email' },
		];
		this.generalFilters = ['id', 'names', 'lastNames'];
	}
}
