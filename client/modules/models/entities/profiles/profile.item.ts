import { Item } from '@beyond-js/reactive/entities';
import config from '@essential-js/admin/config';
import { ProfileItemProvider } from '../../providers/profiles/profile.item.provider';

interface IProfile {
	id: string;
	name: string;
	description: string;
	timeCreated: Date;
	timeUpdated: Date;
}

export /*bundle*/ class Profile extends Item<IProfile> {
	protected properties = ['id', 'name', 'description', 'timeCreated', 'timeUpdated'];

	constructor(params: { id: string | undefined } = { id: undefined }) {
		super({
			provider: ProfileItemProvider,
			storeName: 'profiles',
			db: config.params.application.localDB,
			...params,
		});
	}
}
