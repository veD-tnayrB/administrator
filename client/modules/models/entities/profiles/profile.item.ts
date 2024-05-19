import { Item } from '@beyond-js/reactive/entities';
import config from '@essential-js/admin/config';
import { ProfileItemProvider } from '../../providers/profiles/profile.item.provider';
import { IModule } from '../modules/modules.item';

export /*bundle*/ interface IProfile {
	id: string;
	isNew: boolean;
	name: string;
	description: string;
	timeCreated: Date;
	timeUpdated: Date;
	modules: IModule[];
	active: boolean
}

export /*bundle*/ class Profile extends Item<IProfile> {
	protected properties = ['id', 'name', 'description', 'timeCreated', 'timeUpdated', 'modules', 'active'];

	constructor(params: { id?: string | undefined } = { id: undefined }) {
		super({
			provider: ProfileItemProvider,
			storeName: 'profiles',
			db: config.params.application.localDB,
			...params,
		});
	}
}
