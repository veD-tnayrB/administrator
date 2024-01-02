import { ItemProvider } from '@essential-js/admin/helpers';
import { session } from '@essential-js/admin/auth';

export class UserItemProvider extends ItemProvider {
	constructor() {
		super({
			endpoints: {
				publish: 'user',
				get: 'user',
			},
			token: session.token,
		});
	}

	login = (params: { email: string; password?: string }) => {
		return this.api.post('login', params);
	};
}
