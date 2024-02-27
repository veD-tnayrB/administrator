import { IListParams } from '../actions/types/collection.types';
import { Utils } from '@bgroup/helpers/utils';
import { Api } from '../api/api.helper';

export /*bundle*/ abstract class CollectionProvider {
	#api: Api = new Api();
	get api() {
		return this.#api;
	}

	#endpoints: {
		list: string;
	};

	get endpoints() {
		return this.#endpoints;
	}

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
}
