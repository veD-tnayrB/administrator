import { ItemProvider } from '@essential-js/admin/helpers';
import { IProfile } from '../../entities/profiles/profile.item';

export class ProfileItemProvider extends ItemProvider<IProfile> {
	constructor() {
		super({
			endpoints: {
				publish: 'profile',
				get: 'profile',
				delete: 'profile',
			},
		});
	}
}
