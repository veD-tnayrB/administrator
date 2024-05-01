import { Item } from '@beyond-js/reactive/entities';
import config from '@essential-js/admin/config';
import { NotificationItemProvider } from '../../providers/notifications/notification.item.provider';
import type { IUser } from '../users/user.item';
import { IProfile } from '../profiles/profile.item';

export /*bundle*/ interface INotification {
	id: string;
	title: string;
	description: string;
	icon: string;
	status: string;
	timeCreated: Date;
	timeUpdated: Date;
	users: IUser[];
	profiles: IProfile[];
	endDate: string;
	frecuency: string[];
}

export /*bundle*/ class Notification extends Item<INotification> {
	protected properties = [
		'id',
		'title',
		'description',
		'icon',
		'status',
		'timeCreated',
		'timeUpdated',
		'profiles',
		'users',
		'endDate',
		'frecuency',
	];

	get formatedFrecuency() {
		if (!this.frecuency) return [];
		return JSON.parse(this.frecuency);
	}

	constructor(params: { id: string | undefined } = { id: undefined }) {
		super({
			provider: NotificationItemProvider,
			storeName: 'notifications',
			db: config.params.application.localDB,
			...params,
		});
	}

	launch = async () => {
		try {
			this.fetching = true;
			const response = await this.provider.launch({ id: this.id });
			if (!response.status) response.error;
			return { status: true };
		} catch (error) {
			return { status: false, error };
		} finally {
			this.fetching = false;
		}
	};

	markAsRead = async ({ userId }: { userId: string }) => {
		try {
			this.fetching = true;
			const response = await this.provider.markAsRead({ id: this.id, userId });
			if (!response.status) response.error;
			return { status: true };
		} catch (error) {
			return { status: false, error };
		} finally {
			this.fetching = false;
		}
	};
}
