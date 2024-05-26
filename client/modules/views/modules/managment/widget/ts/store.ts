import { ReactiveModel } from '@beyond-js/reactive/model';
import { Module, IPermission, IModule, IAction } from '@essential-js/admin/models';
import { session } from '@essential-js/admin/auth';
import { routing } from '@beyond-js/kernel/routing';
import { toast } from 'react-toastify';

export interface ISelectedAction extends IAction {
	isCreating?: boolean;
}

export class StoreManager extends ReactiveModel<StoreManager> {
	#item: Module = new Module();
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

	#selectedAction: ISelectedAction | null = null;
	get selectedAction() {
		return this.#selectedAction;
	}

	set selectedAction(value: ISelectedAction | null) {
		this.#selectedAction = value;
		this.triggerEvent();
	}

	load = async ({ id }: { id: string | undefined }) => {
		try {
			if (!id || id === 'create') {
				this.#isCreating = true;
				this.ready = true;
				return;
			}

			this.fetching = true;
			this.#id = id;

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

			await session.load();

			this.#error = '';
			const message = this.isCreating ? 'Module created successfully' : 'Module updated successfully';
			toast.success(message);
			routing.pushState('/modules');
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
