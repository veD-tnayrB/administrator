import { ReactiveModel } from '@beyond-js/reactive/model';
import { Notification, INotification } from '@essential-js/admin/models';
import { routing } from '@beyond-js/kernel/routing';
import { toast } from 'react-toastify';

export class StoreManager extends ReactiveModel<StoreManager> {
	#item: Notification = new Notification();
	get item() {
		return this.#item;
	}

	#isCreating: boolean = false;
	get isCreating() {
		return this.#isCreating;
	}

	load = async ({ id }: { id: string }) => {
		if (id === 'create') {
			this.#isCreating = true;
			this.ready = true;
			return this.triggerEvent();
		}
		try {
			this.fetching = true;

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

	save = async (values: Partial<INotification>) => {
		try {
			this.fetching = true;

			await this.#item.set(values);
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
