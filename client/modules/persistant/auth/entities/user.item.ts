import { ReactiveModel } from '@beyond-js/reactive/model';
import { UserItemProvider } from './user.item.provider';
import { ILogin } from './types';

interface IUser {
	id: string;
	active: boolean;
	email: string;
	lastNames: string;
	names: string;
	timeCreated: Date;
	profiles: { id: string; name: string }[];
	permissions: { id: string; name: string }[];
	timeUpdated: Date;
}

export /*bundle*/ class User extends ReactiveModel<IUser> {
	private provider: UserItemProvider = new UserItemProvider();
	protected properties = [
		'id',
		'names',
		'lastNames',
		'email',
		'active',
		'timeCreated',
		'timeUpdated',
		'permissions',
		'profiles',
	];

	get fullName() {
		let namesArray = this.names.split(' ');
		let lastNamesArray = this.lastNames.split(' ');

		return this.lastNames ? this.names : `${namesArray[0]} ${lastNamesArray[0]}`;
	}

	constructor() {
		super();
		this.reactiveProps([
			'id',
			'names',
			'lastNames',
			'email',
			'active',
			'timeCreated',
			'timeUpdated',
			'permissions',
			'profiles',
			'loaded',
		]);
	}

	login = async (params: ILogin) => {
		try {
			this.fetching = true;
			const response = await this.provider.login(params);
			if (!response.status) throw response.error;
			return response;
		} catch (error) {
			console.error(error);
			return { status: false, error };
		} finally {
			this.fetching = false;
		}
	};

	load = async (params: { token: string }) => {
		try {
			this.fetching = true;
			const response = await this.provider.data(params);
			if (!response.status) throw response.error;
			return response;
		} catch (error) {
			console.error(error);
			return { status: false, error };
		} finally {
			this.fetching = false;
		}
	};

	logout = async () => {
		try {
			this.fetching = true;
			const response = await this.provider.logout({ token: this.token });
			if (!response.status) throw response.error;
			return response;
		} catch (error) {
			return { status: false, error };
		} finally {
			this.fetching = false;
		}
	};

	set(data: this): void {
		this.properties.forEach((property: string | { name: string }) => {
			if (typeof property === 'object') {
				if (data.hasOwnProperty(property.name)) {
				}
				return;
			}
			if (data.hasOwnProperty(property)) this[property] = data[property];
		});

		this.triggerEvent();
	}
}
