import { ItemProvider } from '@essential-js/admin/helpers';
import { IUser } from '../../entities/users/user.item';

export class UserItemProvider extends ItemProvider<IUser> {
	constructor() {
		super({
			endpoints: {
				publish: 'user',
				get: 'user',
				delete: 'user',
			},
		});
	}

	login = (params: { email: string; password?: string }) => {
		return this.api.post('login', params);
	};
}
