import { StoreListView } from '@essential-js/admin/components/list-view';
import { Notification, Notifications } from '@essential-js/admin/models';

export class StoreManager extends StoreListView {
	constructor() {
		super({ collection: new Notifications() });
		this.propertiesToSearch = [
			{ label: 'ID', name: 'id' },
			{ label: 'Title', name: 'title' },
			{ label: 'Description', name: 'description' },
			{ label: 'Time interval', name: 'timeInterval' },
		];
	}

	launchNotification = async (id: string) => {
		try {
			this.fetching = true;
			const notification = new Notification();
			await notification.load({ id });

			const response = await notification.launch();
			if (!response.status) throw response.error;
			return { status: true };
		} catch (error) {
			console.error(error);
			return { status: false, error };
		} finally {
			this.fetching = false;
		}
	};

	startJob = async (id: string) => {
		try {
			this.fetching = true;
			const notification = new Notification();
			const response = await notification.load({ id });
		} catch (error) {
			console.error(error);
			return { status: false, error };
		} finally {
			this.fetching = false;
		}
	};
}
