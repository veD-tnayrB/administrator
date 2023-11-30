import { Collection } from '@beyond-js/reactive/entities';
import config from '@essential-js/admin/config';
import { ProfilesCollectionProvider } from '../../providers/profiles/profiles.collection.provider';
import { Profile } from './profile.item';

export /*bundle*/ class Profiles extends Collection {
	constructor() {
		super({
			provider: ProfilesCollectionProvider,
			storeName: 'profiles',
			db: config.params.application.localDB,
			localdb: true,
			item: Profile,
		});
	}
}
