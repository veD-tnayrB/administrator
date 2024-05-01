import { Collection } from '@beyond-js/reactive/entities';
import config from '@essential-js/admin/config';
import { User } from './user.item';
import { UsersCollectionProvider } from '../providers/users.collection.provider';

export /*bundle*/ class Users extends Collection {
	constructor() {
		super({
			provider: UsersCollectionProvider,
			storeName: 'users',
			db: config.params.application.localDB,
			localdb: true,
			item: User,
		});
	}

	getRegisteredUsersByMonth = async (params: { year: number }) => {
		try {
			this.fetching = true;

			const response = await this.provider.getRegisteredUsersByMonth(params);
			if (!response.status) throw response;

			return response;
		} catch (error) {
			return error;
		} finally {
			this.fetching = false;
		}
	};

	generateReport = async (params: {
		header: { label: string; name: string }[];
		type: 'xlsx' | 'csv';
		params: { [key: string]: any };
	}) => {
		try {
			this.fetching = true;
			const response = await this.provider.generateReport(params);
			const downloadExcelUrl = URL.createObjectURL(response);
			return { status: true, data: downloadExcelUrl };
		} catch (error) {
			console.error(error);
			return error;
		} finally {
			this.fetching = false;
		}
	};

	getTemplate = async (params: { type: 'xlsx' | 'csv' }) => {
		try {
			this.fetching = true;
			const response = await this.provider.getTemplate(params);
			const downloadExcelUrl = URL.createObjectURL(response);
			return { status: true, data: downloadExcelUrl };
		} catch (error) {
			console.error(error);
			return error;
		} finally {
			this.fetching = false;
		}
	};

	import = async params => {
		try {
			this.fetching = true;
			const response = await this.provider.import(params);
			return { status: true };
		} catch (error) {
			console.error(error);
			return error;
		} finally {
			this.fetching = false;
		}
	};
}
