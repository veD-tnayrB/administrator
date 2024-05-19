import { ReactiveModel } from '@beyond-js/reactive/model';
import { Profile, IProfile, Modules, IModule, IAction } from '@essential-js/admin/models';
import { session } from '@essential-js/admin/auth';
import { IValues } from './views/form';

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

	#refrestUser: boolean = false;

	load = async ({ id }: { id: string | undefined }) => {
		try {
			if (!id || id === 'create') {
				this.#isCreating = true;
				const modulesResponse = await this.#modules.load();
				if (!modulesResponse.status) throw modulesResponse.error;
				this.#calculateselectedModules();
				return this.triggerEvent();
			}

			this.fetching = true;

			const response = await this.#item.load({ id });
			if (!response.status) throw response.error;

			this.#refrestUser = session.user.profiles.some((profile: IProfile) => profile.name === this.#item.name);
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
		const selectedModulesInProfile: Record<string, Record<string, boolean>> = {};
		this.#item.modules.forEach((module: IModule) => {
			const selectedActions: Record<string, boolean> = {};

			module.actions.forEach((action: IAction) => (selectedActions[action.id] = true));
			selectedModulesInProfile[module.id] = selectedActions;
		});

		this.#selectedModules = selectedModulesInProfile;
	};

	save = async (values: IValues) => {
		try {
			this.fetching = true;
			await this.#item.set({ ...values, modules: this.#selectedModules });

			const response = await this.#item.publish();
			if (!response.status) throw response.error;

			if (this.#refrestUser) await session.load();

			return { status: true };
		} catch (error) {
			return { status: false, error };
		} finally {
			this.fetching = false;
		}
	};

	#validateValues = () => {
		if (!this.#item.name) return 'The profile must have a name.';
		if (Object.entries(this.#selectedModules).length) return 'The profile must have at least one module selected';

	}

	reset = () => {
		this.#item = new Profile();
		this.#refrestUser = false;
		this.#modules = new Modules();
		this.ready = false;
		this.triggerEvent();
	};
}
