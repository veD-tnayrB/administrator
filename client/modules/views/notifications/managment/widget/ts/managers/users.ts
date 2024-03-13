import { StoreListView } from '@essential-js/admin/components/list-view';
import { Users, User } from '@essential-js/admin/models';

export class UsersManager extends StoreListView {
	declare collection: Users;
	declare propertiesToSearch: { label: string; name: string }[];
	declare selectedItems: Map<string, User>;
	declare load: (params?: Record<string, any>) => Promise<void>;

	constructor() {
		super({ collection: new Users() });
		this.propertiesToSearch = [
			{ label: 'ID', name: 'id' },
			{ label: 'Name', name: 'name' },
			{ label: 'Description', name: 'description' },
			{ label: 'Email', name: 'email' },
		];
	}

	// setSelectedsItems = (ids: string[]) => {
	// 	ids.forEach(id => {
	// 		const item = this.items.find(item => item.id === id);

	// 		if (this.selectedItems.has(id)) {
	// 			this.selectedItems.delete(id);
	// 		} else {
	// 			this.selectedItems.set(id, item);
	// 		}
	// 	});

	// 	this.triggerEvent();
	// };
	setSelectedsItems = (ids: string[]) => {
		ids.forEach(id => this.selectItem({ id }));
	};
}
