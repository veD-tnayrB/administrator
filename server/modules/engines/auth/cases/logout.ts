import { DB } from '@essential-js/admin-server/db';

export class Logout {
	static #accessTokensModel: DB.models.AccessTokens = DB.models.AccessTokens;

	static async execute(params: { token: string }) {
		try {
			await this.#accessTokensModel.destroy({ where: { accessToken: params.token } });
			return { status: true };
		} catch (error) {
			return { status: false, error };
		}
	}
}
