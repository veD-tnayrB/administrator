import { CollectionProvider } from '@essential-js/admin/helpers';
import type { Api } from '@bgroup/http-suite/api';

export class ProfilesCollectionProvider extends CollectionProvider {
	declare endpoints: { list: string };
	declare api: Api;

	constructor() {
		super({
			endpoints: {
				list: 'profiles',
			},
		});
	}

	generateReport = async (params: {
		type: 'xlsx' | 'csv';
		header: { label: string; name: string }[];
		params: { [key: string]: any };
	}) => {
		return this.api.post(`${this.endpoints.list}/generate-report/${params.type}`, params);
	};

	getTemplate = async (params: { type: 'xlsx' | 'csv' }) => {
		return this.api.get(`${this.endpoints.list}/get-template/${params.type}`);
	};

	import = async params => {
		return this.api.post(`${this.endpoints.list}/import`, { file: params.file, multipart: true });
	};
}
