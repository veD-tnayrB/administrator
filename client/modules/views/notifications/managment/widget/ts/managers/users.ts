import { StoreListView } from '@essential-js/admin/components/list-view';
import { Users } from '@essential-js/admin/models';

export class UsersManager extends StoreListView {
	declare specificFilters: { label: string; name: string }[];
	declare load: (params?: Record<string, any>) => Promise<void>;
	declare generalFilters: string[];

	constructor() {
		super({ collection: new Users(), id: 'notifications-users' });
		this.specificFilters = [
			{ label: 'ID', name: 'id' },
			{ label: 'Name', name: 'name' },
			{ label: 'Email', name: 'email' },
		];
		this.params = {
			limit: this.limit,
			start: 0,
			order: 'timeUpdated',
			des: 'DES',
			where: { active: 1 },
		};
		this.generalFilters = ['id', 'name', 'email'];

		this.propertiesDisplaying = ['id', 'names', 'lastNames', 'email'];
	}

	setSelectedsItems = (ids: string[] | undefined) => {
		if (!ids) return;
		ids.forEach(id => this.selectedItems.set(id, {}));
		this.triggerEvent();
	};
}
