import { ReactiveModel } from '@beyond-js/reactive/model';
import { User } from '@essential-js/admin/models';

export class StoreManager extends ReactiveModel<StoreManager> {
	#item: User = new User();
	#isCreating: boolean = false;
	get isCreating() {
		return this.#isCreating;
	}

	load = ({ id }: { id: string }) => {
		if (id === 'create') {
			this.#isCreating = true;
			return this.triggerEvent();
		}
	};
}
