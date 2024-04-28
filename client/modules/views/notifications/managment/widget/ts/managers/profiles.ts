import { StoreListView } from '@essential-js/admin/components/list-view';
import { Profiles, Profile } from '@essential-js/admin/models';

export class ProfilesManager extends StoreListView {
	declare collection: Profiles;
	declare specificFilters: { label: string; name: string }[];
	declare selectedItems: Map<string, Profile>;
	declare load: (params?: Record<string, any>) => Promise<void>;
	declare generalFilters: string[];
	declare propertiesDisplaying: string[];
	declare triggerEvent: (event?: string) => void;

	constructor() {
		super({ collection: new Profiles() });
		this.specificFilters = [
			{ label: 'ID', name: 'id' },
			{ label: 'Name', name: 'name' },
			{ label: 'Description', name: 'description' },
		];
		this.generalFilters = ['id', 'name'];
		this.propertiesDisplaying = ['id', 'name', 'description'];
	}

	setSelectedsItems = (ids: string[]) => {
		ids.forEach(id => this.selectedItems.set(id));
		this.triggerEvent();
	};
}
