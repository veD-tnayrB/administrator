import { StoreListView } from '@essential-js/admin/components/list-view';
import { Profiles, Profile } from '@essential-js/admin/models';

export class ProfilesManager extends StoreListView {
	declare collection: Profiles;
	declare propertiesToSearch: { label: string; name: string }[];
	declare selectedItems: Map<string, Profile>;
	declare load: (params?: Record<string, any>) => Promise<void>;

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
