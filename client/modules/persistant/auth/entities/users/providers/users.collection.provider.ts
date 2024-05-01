import { Api } from '@bgroup/http-suite/api';
import { Utils } from '@bgroup/helpers/utils';
import config from '@essential-js/admin/config';

export class UsersCollectionProvider {
	declare endpoints: { list: string };
	#api: Api = new Api(config.params.server);
	get api() {
		return this.#api;
	}

	getRegisteredUsersByMonth = (params: { year: number }) => {
		return this.api.get(`users/get-registered-users-by-month/${params.year}`);
	};

	generateReport = async (params: {
		type: 'xlsx' | 'csv';
		header: { label: string; name: string }[];
		params: { [key: string]: any };
	}) => {
		return this.api.post(`users/generate-report/${params.type}`, params);
	};

	getTemplate = async (params: { type: 'xlsx' | 'csv' }) => {
		return this.api.get(`users/get-template/${params.type}`);
	};

	import = async params => {
		return this.api.post(`users/import`, { file: params.file, multipart: true });
	};

	list = async params => {
		const { where, ...propertiesToUse } = params;
		const rawQuery = propertiesToUse;
		if (where) rawQuery.where = where;
		const query = Utils.convertObjectToQuery(rawQuery);

		return this.#api.get(`users${query}`);
	};
}
