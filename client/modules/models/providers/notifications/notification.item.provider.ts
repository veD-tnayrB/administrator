import { ItemProvider } from '@essential-js/admin/helpers';

export class NotificationItemProvider extends ItemProvider {
	constructor() {
		super({
			endpoints: {
				publish: 'notification',
				get: 'notification',
				delete: 'notification',
			},
		});
	}
}
