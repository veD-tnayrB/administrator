import { ItemProvider } from '@essential-js/admin/helpers';

export class UserItemProvider extends ItemProvider {
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
