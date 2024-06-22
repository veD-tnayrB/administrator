import { ReactiveModel } from '@beyond-js/reactive/model';
import { Profile, User, IUser, Profiles } from '@essential-js/admin/models';
import { toast } from 'react-toastify';
import { routing } from '@beyond-js/kernel/routing';
import { session } from '@essential-js/admin/auth';

const EMAIL_REGEX =
	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export class StoreManager extends ReactiveModel<StoreManager> {
	#item: User = new User();
	get item() {
		return this.#item;
	}

	#profiles: Profiles = new Profiles();
	#profilesItems: Profile[] = [];
	get profilesItems() {
		return this.#profilesItems;
	}

	#error: string = '';
	get error() {
		return this.#error;
	}

	set error(value: string) {
		this.#error = value;
		this.triggerEvent();
	}

	notFound: boolean = false;

	#isCreating: boolean = false;
	get isCreating() {
		return this.#isCreating;
	}
	#id: string = 'create';

	#refreshUser: boolean = false;

	load = async ({ id }: { id: string | undefined }) => {
		try {
			if (!id || id === 'create') {
				this.#isCreating = true;
				this.#item.profiles = [];
				this.#item.active = 1;
				const profilesResponse = await this.#profiles.load({ where: { active: 1 } });
				if (!profilesResponse.status) throw profilesResponse.error;
				this.#profilesItems = profilesResponse.data;
				this.ready = true;
				return;
			}

			this.fetching = true;
			this.#id = id;
			this.#refreshUser = this.#id === session.user.id;

			const response = await this.#item.load({ id });
			if (response.status && !response.data) this.notFound = true;
			if (!response.status) throw response.error;

			const profilesResponse = await this.#profiles.load({ where: { active: 1 } });
			if (!profilesResponse.status) throw profilesResponse.error;
			this.#profilesItems = profilesResponse.data;

			this.ready = true;
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

			if (!values.profiles) values.profiles = [];
			const validationResults = this.#validateValues(values);

			if (validationResults) {
				this.#error = validationResults;
				return { status: false, error: validationResults };
			}

			await this.#item.set(values);
			const response = await this.#item.publish(values);
			if (!response.status) throw response.error;
			if (this.#refreshUser) await session.load();

			this.#error = '';
			this.fetching = false;
			const message = this.isCreating ? 'User created successfully' : 'User updated successfully';
			toast.success(message);
			routing.pushState('/users');
			return { status: true };
		} catch (error) {
			toast.error('Something went wrong, please try again or contact the administrator');
			return { status: false, error };
		} finally {
			this.fetching = false;
		}
	};

	#validateValues = (values: Partial<IUser>) => {
		if (!values.names) return 'The names are required.';
		if (!values.lastNames) return 'The last names are required.';
		if (!values.email) return 'The email is required.';
		if (!EMAIL_REGEX.test(values.email)) return 'The email is not valid, please check it and try again.';
		if (!values.profiles || !values.profiles.length) return 'At least one profile is required.';
		return '';
	};

	reset = () => {
		this.#profiles = new Profiles();
		this.#item = new User();
		this.ready = false;
		this.triggerEvent('hide');
	};
}
