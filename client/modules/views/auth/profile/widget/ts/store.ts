import { routing } from '@beyond-js/kernel/routing';
import { ReactiveModel } from '@beyond-js/reactive/model';
import { IUser, session, User } from '@essential-js/admin/auth';
import { toast } from 'react-toastify';

const EMAIL_REGEX =
	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export class StoreManager extends ReactiveModel<StoreManager> {
	#item: User = session.user;
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

	values: IUser = session.user.getProperties() as IUser;

	load = async () => {
		try {
			this.fetching = true;

			this.#item = session.user;
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

			const validationResults = this.#validateValues(values);
			if (validationResults) {
				this.#error = validationResults;
				throw new Error(validationResults);
			}

			this.#item.set(values);
			const response = await this.#item.publish();
			if (!response.status) throw response.error;

			await session.load();

			this.#error = '';
			this.fetching = false;
			const message = 'User updated successfully';
			toast.success(message);
			const firstPermissionRoute = (session.permissions && session.permissions[0].moduleTo) || '/dashboard';
			routing.pushState(firstPermissionRoute);
			return { status: true };
		} catch (error) {
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
		return '';
	};

	reset = () => {
		this.ready = false;
		this.values = this.#item.getProperties() as IUser;
		this.triggerEvent('hide');
	};
}
