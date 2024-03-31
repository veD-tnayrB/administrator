import { ReactiveModel } from '@beyond-js/reactive/model';
import { Notification, INotification } from '@essential-js/admin/models';
import { routing } from '@beyond-js/kernel/routing';
import { toast } from 'react-toastify';
import { ProfilesManager } from './managers/profiles';
import { UsersManager } from './managers/users';
import { FrecuencyManager } from './managers/frecuency';
import { Frequency, RRule } from 'rrule';

export class StoreManager extends ReactiveModel<StoreManager> {
	#frecuencyManager: FrecuencyManager = new FrecuencyManager();
	get frecuencyManager() {
		return this.#frecuencyManager;
	}

	#item: Notification = new Notification();
	get item() {
		return this.#item;
	}

	#currentTab: number = 0;
	get currentTab() {
		return this.#currentTab;
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
			await this.#users.load({ active: 1 });
			this.#isCreating = true;
			this.ready = true;
			return;
		}
		try {
			this.fetching = true;

			const response = await this.#item.load({ id });
			if (!response.status) throw response.error;

			await this.#profiles.load({ order: 'id', ids: response.data.profiles });
			await this.#users.load({ active: 1, order: 'id', ids: response.data.users });

			this.setItemsSelected({ users: response.data.users, profiles: response.data.profiles });
			this.ready = true;

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
			await this.#item.set({ ...values, frecuency: JSON.stringify(values.frecuency), profiles, users });
			console.log('THIS.#ITEM => ', this.#item);
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

	setTab = (tab: number) => {
		this.#currentTab = tab;
		this.triggerEvent('tabs.changed');
	};

	reset = () => {
		this.ready = false;
		this.#item = new Notification();
		this.setTab(0);
		this.triggerEvent('tabs.changed');
		this.#users.resetAll();
		this.#profiles.resetAll();
		this.triggerEvent();
	};
}
