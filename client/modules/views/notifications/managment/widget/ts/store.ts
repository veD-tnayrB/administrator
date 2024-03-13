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
			if (!response.status) throw response.error;

			await this.#profiles.load({ order: 'id', ids: response.data.profiles });
			await this.#users.load({ active: 1, order: 'id', ids: response.data.users });

			console.log('RESPONSE => ', { users: response.data.users, profiles: response.data.profiles });
			this.setItemsSelected({ users: response.data.users, profiles: response.data.profiles });
			return { status: true };
		} catch (error) {
			return { status: false, error };
		} finally {
			this.fetching = false;
		}
	};

	setItemsSelected = ({ users, profiles }: { profiles: string[]; users: string[] }) => {
		this.#users.setSelectedsItems(users);
		this.#profiles.setSelectedsItems(profiles);
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
