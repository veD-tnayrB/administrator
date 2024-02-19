import { IListParams } from '../actions/types/collection.types';
import { Utils } from '@bgroup/helpers/utils';
import { Api } from '../api/api.helper';
import config from '@essential-js/admin/config';

export /*bundle*/ abstract class CollectionProvider {
	#api: Api = new Api();
	get api() {
		return this.#api;
	}

	#endpoints: {
		list: string;
	};

	constructor(params: { endpoints: { list: string } }) {
		if (!params?.endpoints) throw new Error('Endpoints are required');
		this.#endpoints = params.endpoints;
	}

	list = async (params: IListParams) => {
		const { where, ...propertiesToUse } = params;
		const rawQuery = { ...propertiesToUse, ...where };
		const query = Utils.convertObjectToQuery(rawQuery);

		return this.#api.get(`${this.#endpoints.list}${query}`);
	};

	generateReport = async (params: {
		type: 'xlsx' | 'csv';
		header: { label: string; name: string }[];
		params: { [key: string]: any };
	}) => {
		return this.#api.post(`${this.#endpoints.list}/generate-report/${params.type}`, params);
	};

	import = async params => {
		// TODO: Change to the http-suite

		// const formData = new FormData();
		// formData.append('file', params.file); // 'file' es el key esperado en el backend

		// // Realiza la solicitud fetch
		// const response = await fetch(`${config.params.server}${this.#endpoints.list}/import`, {
		// 	method: 'POST',
		// 	body: formData, // envía el objeto FormData
		// 	// No establezcas el Content-Type header, let fetch do it
		// });
		return this.#api.post(`${this.#endpoints.list}/import`, { file: params.file, multipart: true });
	};
}
