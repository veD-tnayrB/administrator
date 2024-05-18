import { ReactiveModel } from '@beyond-js/reactive/model';
import { Module, IModule, IAction } from '@essential-js/admin/models';
import { session } from '@essential-js/admin/auth';
import { routing } from '@beyond-js/kernel/routing';
import { toast } from 'react-toastify';

export class StoreManager extends ReactiveModel<StoreManager> {
	#item: IModule = new Module();
	get item() {
		return this.#item;
	}

	#error: string = '';
	get error() {
		return this.#error;
	}

	set error(value: string) {
		this.#error = value;
		this.triggerEvent();
	}

	#isCreating: boolean = false;
	get isCreating() {
		return this.#isCreating;
	}
	#id: string = 'create';
	#refreshUser: boolean = false;

	#selectedAction: IAction | null = null;
	get selectedAction() {
		return this.#selectedAction;
	}

	set selectedAction(value: IAction | null) {
		this.#selectedAction = value;
		this.triggerEvent();
	}

	load = async ({ id }: { id: string }) => {
		try {
			if (id === 'create') {
				this.#isCreating = true;
				this.ready = true;
				return;
			}

			this.fetching = true;
			this.#id = id;
			const userPermissions = session.user.permissions
			this.#refreshUser = userPermissions.some(permission => permission.moduleId === this.#id)

			const response = await this.#item.load({ id });
			if (!response.status) throw response.error;

			this.ready = true;
			return { status: true };
		} catch (error) {
			return { status: false, error };
		} finally {
			this.fetching = false;
		}
	};

	save = async (values: Partial<IModule>) => {
		try {
			this.fetching = true;
			await this.#item.set(values);
			const response = await this.#item.publish();
			if (!response.status) throw response.error;

			if (this.#refreshUser) await session.load();

			this.#error = '';
			const message = this.isCreating ? 'Module created successfully' : 'Module updated successfully';
			toast.success(message);
			routing.pushState('/users');
			return { status: true };
		} catch (error) {
			return { status: false, error };
		} finally {
			this.fetching = false;
		}
	};

	reset = () => {
		this.triggerEvent('hide');
	};
}
