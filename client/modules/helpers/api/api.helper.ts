import { Api as BaseApi } from '@bgroup/http-suite/api';
import config from '@essential-js/admin/config';
import { session } from '@essential-js/admin/auth';

export /*bundle*/ class Api extends BaseApi {
	constructor(url?: string) {
		const toUseUrl = url || config.params.server;
		super(toUseUrl);

		this.bearer(session.token);
	}
}
