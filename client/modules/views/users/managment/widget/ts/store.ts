import { ReactiveModel } from '@beyond-js/reactive/model';
import { User, IUser, Profiles } from '@essential-js/admin/models';

export class StoreManager extends ReactiveModel<StoreManager> {
	#item: User = new User();
	get item() {
		return this.#item;
	}

	#profiles: Profiles = new Profiles();
	get profiles() {
		return this.#profiles;
	}

	#isCreating: boolean = false;
	get isCreating() {
		return this.#isCreating;
	}

	load = async ({ id }: { id: string }) => {
		if (id === 'create') {
			this.#isCreating = true;
			const profilesResponse = await this.#profiles.load();
			if (!profilesResponse.status) throw profilesResponse.error;
			return this.triggerEvent();
		}
		try {
			this.fetching = true;
			const response = await this.#item.load({ id });
			if (!response.status) throw response.error;

			const profilesResponse = await this.#profiles.load();
			if (!profilesResponse.status) throw profilesResponse.error;

			return { status: true };
		} catch (error) {
			return { status: false, error };
		} finally {
			this.fetching = false;
		}
	};

	save = async (values: Partial<IUser>) => {
		try {
			this.fetching = true;

			await this.#item.set(values);
			const response = await this.#item.publish({
				...values,
				profilesIds: ['0502b4cd-aabb-11ee-a26d-543aacbde303'],
			});

			if (!response.status) throw response.error;
			return { status: true };
		} catch (error) {
			return { status: false, error };
		} finally {
			this.fetching = false;
		}
	};

	reset = () => {
		this.#item = new User();
		this.triggerEvent();
	};
}
