import { ReactiveModel } from '@beyond-js/reactive/model';
import { Notification, INotification } from '@essential-js/admin/models';
import { routing } from '@beyond-js/kernel/routing';
import { toast } from 'react-toastify';
import { ProfilesManager } from './managers/profiles';
import { UsersManager } from './managers/users';

export class StoreManager extends ReactiveModel<StoreManager> {
	#item: Notification = new Notification();
	get item() {
		return this.#item;
	}

	#profiles: ProfilesManager = new ProfilesManager();
	get profiles() {
		return this.#profiles;
	}

	#users: UsersManager = new UsersManager();
	get users() {
		return this.#users;
	}

	#isCreating: boolean = false;
	get isCreating() {
		return this.#isCreating;
	}

	load = async ({ id }: { id: string }) => {
		if (id === 'create') {
			await this.#profiles.load();
			await this.#users.load({ active: true });
			this.#isCreating = true;
			this.triggerEvent();
			return;
		}
		try {
			this.fetching = true;

			const response = await this.#item.load({ id });
			globalThis.i = this.#item;
			if (!response.status) throw response.error;
			console.log('REPSONSE= > ', response);

			await this.#profiles.load({ order: 'id', ids: response.data.profiles });
			await this.#users.load({ active: true, order: 'id', ids: response.data.users });
			return { status: true };
		} catch (error) {
			return { status: false, error };
		} finally {
			this.fetching = false;
		}
	};

	save = async (values: Partial<INotification>) => {
		try {
			this.fetching = true;
			const profiles = [...this.#profiles.selectedItems.keys()];
			const users = [...this.#users.selectedItems.keys()];
			await this.#item.set({ ...values, profiles, users });
			const response = await this.#item.publish();

			if (!response.status) throw response.error;

			toast.success(this.isCreating ? 'Notification created' : 'Notification updated');
			routing.pushState('/notifications');
			return { status: true };
		} catch (error) {
			return { status: false, error };
		} finally {
			this.fetching = false;
		}
	};

	reset = () => {
		this.#item = new Notification();
		this.triggerEvent();
	};
}
