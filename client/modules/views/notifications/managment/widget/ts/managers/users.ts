import { StoreListView } from '@essential-js/admin/components/list-view';
import { Users, User } from '@essential-js/admin/models';

export class UsersManager extends StoreListView {
	declare collection: Users;
	declare specificFilters: { label: string; name: string }[];
	declare selectedItems: Map<string, User>;
	declare load: (params?: Record<string, any>) => Promise<void>;
	declare generalFilters: string[];
	declare propertiesDisplaying: string[];
	declare triggerEvent: (event?: string) => void;

	constructor() {
		super({ collection: new Users() });
		this.specificFilters = [
			{ label: 'ID', name: 'id' },
			{ label: 'Name', name: 'name' },
			{ label: 'Email', name: 'email' },
		];
		this.generalFilters = ['id', 'name', 'email'];

		this.propertiesDisplaying = ['id', 'names', 'lastNames', 'email'];
	}

	setSelectedsItems = (ids: string[]) => {
		ids.forEach(id => this.selectedItems.set(id));
		this.triggerEvent();
	};
}
