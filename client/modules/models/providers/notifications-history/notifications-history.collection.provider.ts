import { CollectionProvider } from '@essential-js/admin/helpers';

export class NotificationsHistoryCollectionProvider extends CollectionProvider {
	constructor() {
		super({
			endpoints: {
				list: 'notifications/history',
			},
		});
	}

	markAsRead = async ({ ids, userId }: { ids: string[]; userId: string }) => {
		return this.api.put('notifications/history/mark-as-read', { ids, userId });
	};
}
