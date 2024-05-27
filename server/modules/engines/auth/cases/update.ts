import { IAuthUser } from '@essential-js/admin-server/types';
import { DB } from '@essential-js/admin-server/db';

export class Update {
	static execute = async (params: Partial<IAuthUser>) => {
		try {
			const userRegistry = await DB.models.Users.findOne({ where: { id: params.id } });
			const currentUser = userRegistry.dataValues;
			const isAccessTokenValid = await Update.checkAccessToken({ token: params.token, userId: params.id });
			if (!isAccessTokenValid) throw 'ACCESS_TOKEN_IS_NOT_VALID';
			delete params.password;

			await DB.models.Users.update(params, { where: { id: params.id } });

			return { status: true };
		} catch (error) {
			return { status: false, error };
		}
	};

	static checkAccessToken = async (params: { token: string; userId: string }) => {
		const { token, userId } = params;
		const accessToken = await DB.models.AccessTokens.findOne({ where: { accessToken: token, userId } });
		return !!accessToken;
	};
}
