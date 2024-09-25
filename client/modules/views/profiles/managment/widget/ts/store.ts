import { routing } from '@beyond-js/kernel/routing';
import { ReactiveModel } from '@beyond-js/reactive/model';
import { session } from '@essential-js/admin/auth';
import { IAction, IModule, IProfile, IWidget, Modules, Profile, Widgets } from '@essential-js/admin/models';
import { toast } from 'react-toastify';
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

	#widgets: Widgets = new Widgets();
	get widgets() {
		return this.#widgets;
	}

	#error: string = '';
	get error() {
		return this.#error;
	}

	#selectedModules: Record<string, Record<string, boolean>> = {};
	get selectedModules() {
		return this.#selectedModules;
	}
	set selectedModules(value) {
		this.#selectedModules = value;
		this.triggerEvent();
	}

	notFound: boolean = false;

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
				if (!session.user.profilePermissions.has('profiles.create')) routing.pushState('/error/403');

				this.#isCreating = true;
				const modulesResponse = await this.#modules.load();
				if (!modulesResponse.status) throw modulesResponse.error;

				const widgets = await this.#widgets.load();
				if (!widgets.status) throw widgets.error;
				this.#calculateselectedModules();
				return this.triggerEvent();
			}
			if (!session.user.profilePermissions.has('profiles.update')) routing.pushState('/error/403');

			this.fetching = true;
			const response = await this.#item.load({ id });
			if (response.status && !response.data) this.notFound = true;
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
			const validationError = this.#validateValues(toSendValues);

			if (validationError) {
				this.#error = validationError;
				this.triggerEvent();
				return;
			}

			await this.#item.set(toSendValues);

			const response = await this.#item.publish(toSendValues);
			if (!response.status) throw response.error;

			if (this.#refrestUser) await session.load();

			toast.success(this.item.id ? 'Profile updated successfully' : 'Profile created successfully');
			routing.pushState('/profiles');
			this.reset();
			return { status: true };
		} catch (error) {
			toast.error('Something went wrong, please try again or contact the administrator');
			return { status: false, error };
		} finally {
			this.fetching = false;
		}
	};

	#validateValues = (values: IValues) => {
		if (!values.name) return 'The profile must have a name.';
		if (Object.entries(values.modules).length === 0) return 'The profile must have at least one module selected';
	};
	reset = () => {
		this.#item = new Profile();
		this.#refrestUser = false;
		this.#error = '';
		this.#modules = new Modules();
		this.#widgets = new Widgets();
		this.#modulesPermissions = new Map();
		this.ready = false;
		this.triggerEvent();
	};
}
