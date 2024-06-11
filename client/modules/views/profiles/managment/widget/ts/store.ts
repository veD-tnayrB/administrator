import { ReactiveModel } from '@beyond-js/reactive/model';
import { IWidget, Widgets, Profile, IProfile, Modules, IModule, IAction } from '@essential-js/admin/models';
import { session } from '@essential-js/admin/auth';
import { IValues } from './views/form';
import { toast } from 'react-toastify';

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

	#widgets: Widgets = new Widgets();
	get widgets() {
		return this.#widgets;
	}

	#selectedModules: Record<string, Record<string, boolean>> = {};
	get selectedModules() {
		return this.#selectedModules;
	}
	set selectedModules(value) {
		this.#selectedModules = value;
		this.triggerEvent();
	}

	#selectedWidgets: Record<string, true> = {};
	get selectedWidgets() {
		return this.#selectedWidgets;
	}
	set selectedWidgets(value) {
		this.#selectedWidgets = value;
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

				const widgets = await this.#widgets.load();
				if (!widgets.status) throw widgets.error;
				this.#calculateselectedModules();
				return this.triggerEvent();
			}

			this.fetching = true;

			const response = await this.#item.load({ id });
			if (!response.status) throw response.error;
			const selected: Record<string, true> = {};
			response.data.widgets.forEach((widget: IWidget) => {
				selected[widget.id] = true;
			});
			this.#selectedWidgets = selected;

			const widgets = await this.#widgets.load();
			if (!widgets.status) throw widgets.error;

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
			const widgets = Object.keys(this.#selectedWidgets);
			const toSendValues = { ...values, modules: this.#selectedModules, widgets };
			await this.#item.set(toSendValues);

			const response = await this.#item.publish(toSendValues);
			if (!response.status) throw response.error;

			if (this.#refrestUser) await session.load();

			return { status: true };
		} catch (error) {
			toast.error('Something went wrong, please try again or contact the administrator');
			return { status: false, error };
		} finally {
			this.fetching = false;
		}
	};

	#validateValues = () => {
		if (!this.#item.name) return 'The profile must have a name.';
		if (Object.entries(this.#selectedModules).length) return 'The profile must have at least one module selected';
	};

	reset = () => {
		this.#item = new Profile();
		this.#refrestUser = false;
		this.#modules = new Modules();
		this.#widgets = new Widgets();
		this.#modulesPermissions = new Map();
		this.ready = false;
		this.triggerEvent();
	};
}
