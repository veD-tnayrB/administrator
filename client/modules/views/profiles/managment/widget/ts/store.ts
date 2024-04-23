import { ReactiveModel } from '@beyond-js/reactive/model';
import { Profile, IProfile, Modules } from '@essential-js/admin/models';

export class StoreManager extends ReactiveModel<StoreManager> {
	#item: Profile = new Profile();
	get item() {
		return this.#item;
	}

	#modules = new Modules();
	get modules() {
		return this.#modules;
	}

	#modulesPermissions = new Map<string, string[]>();
	get modulesPermissions() {
		return this.#modulesPermissions;
	}

	#selectedModules: Record<string, Record<string, boolean>> = {};
	get selectedModules() {
		return this.#selectedModules;
	}
	set selectedModules(value) {
		this.#selectedModules = value;
		this.triggerEvent();
	}

	#isCreating: boolean = false;
	get isCreating() {
		return this.#isCreating;
	}

	load = async ({ id }: { id: string }) => {
		try {
			if (id === 'create') {
				this.#isCreating = true;
				const modulesResponse = await this.#modules.load();
				if (!modulesResponse.status) throw modulesResponse.error;
				this.#calculateselectedModules();
				return this.triggerEvent();
			}

			this.fetching = true;

			const response = await this.#item.load({ id });
			if (!response.status) throw response.error;

			const modulesResponse = await this.#modules.load();
			if (!modulesResponse.status) throw modulesResponse.error;
			this.#calculateselectedModules();
			return { status: true };
		} catch (error) {
			return { status: false, error };
		} finally {
			this.fetching = false;
			this.ready = true;
		}
	};

	#calculateselectedModules = () => {
		const selectedModulesInProfile = {};
		this.#item.modules.forEach(module => {
			const selectedActions: Record<string, boolean> = {};

			module.actions.forEach(action => (selectedActions[action.id] = true));
			selectedModulesInProfile[module.id] = selectedActions;
		});

		this.#selectedModules = selectedModulesInProfile;
	};

	save = async (values: Partial<IProfile>) => {
		try {
			this.fetching = true;
			await this.#item.set({ ...values, modules: this.#selectedModules });
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
		this.ready = false;
		this.triggerEvent();
	};
}
