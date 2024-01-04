import { CollectionProvider } from '@essential-js/admin/helpers';

export class NotificationsCollectionProvider extends CollectionProvider {
	constructor() {
		super({
			endpoints: {
				list: 'notifications',
			},
		});
	}
}
