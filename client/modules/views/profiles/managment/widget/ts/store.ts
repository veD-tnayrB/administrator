import { ReactiveModel } from '@beyond-js/reactive/model';
import { Profile, IProfile, Modules, Permissions } from '@essential-js/admin/models';

export class StoreManager extends ReactiveModel<StoreManager> {
	#item: Profile = new Profile();
	get item() {
		return this.#item;
	}

	#modules = new Modules();
	get modules() {
		return this.#modules;
	}
	#permissions = new Permissions();
	get permissions() {
		return this.#permissions;
	}

	#modulesPermissions = new Map<string, string[]>();
	get modulesPermissions() {
		return this.#modulesPermissions;
	}

	#isCreating: boolean = false;
	get isCreating() {
		return this.#isCreating;
	}

	load = async ({ id }: { id: string }) => {
		if (id === 'create') {
			this.#isCreating = true;
			return this.triggerEvent();
		}
		try {
			this.fetching = true;

			const response = await this.#item.load({ id });
			if (!response.status) throw response.error;

			const modulesResponse = await this.#modules.load();
			if (!modulesResponse.status) throw response.error;

			const permissionsResponse = await this.#permissions.load();
			if (!permissionsResponse.status) throw response.error;

			this.#modules.items.forEach(module => {
				this.#modulesPermissions.set(module.id, []);
			});

			return { status: true };
		} catch (error) {
			return { status: false, error };
		} finally {
			this.fetching = false;
		}
	};

	save = async (values: Partial<IProfile>) => {
		try {
			this.fetching = true;

			await this.#item.set(values);
			const response = await this.#item.publish();

			if (!response.status) throw response.error;
			return { status: true };
		} catch (error) {
			return { status: false, error };
		} finally {
			this.fetching = false;
		}
	};

	reset = () => {
		this.#item = new Profile();
		this.triggerEvent();
	};
}
