import { IListParams } from '../actions/types/collection.types';
import { Api } from '@bgroup/http-suite/api';
import config from '@essential-js/admin/config';
import { Utils } from '@bgroup/helpers/utils';

export /*bundle*/ abstract class CollectionProvider {
	#api: Api = new Api(config.params.server);
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
}
