import { StoreListView } from '@essential-js/admin/components/list-view';
import { Profiles } from '@essential-js/admin/models';

export class ProfilesManager extends StoreListView {
	declare specificFilters: { label: string; name: string }[];
	declare load: (params?: Record<string, any>) => Promise<void>;
	declare generalFilters: string[];
	declare triggerEvent: (event?: string) => void;

	constructor() {
		super({ collection: new Profiles(), id: 'notifications-profiles' });
		this.specificFilters = [
			{ label: 'ID', name: 'id' },
			{ label: 'Name', name: 'name' },
			{ label: 'Description', name: 'description' },
		];
		this.params = {
			limit: this.limit,
			start: 0,
			order: 'timeUpdated',
			des: 'DES',
			where: { active: 1 },
		};
		this.generalFilters = ['id', 'name'];
		this.propertiesDisplaying = ['id', 'name', 'description'];
	}

	setSelectedsItems = (ids: string[] | undefined) => {
		if (!ids) return;
		ids.forEach((id) => this.selectedItems.set(id, {}));
		this.triggerEvent();
	};
}
