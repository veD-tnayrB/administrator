import { DB } from '@essential-js/admin-server/db';
import { MD5 } from '@bgroup/helpers/md5';
import { jwt } from '@bgroup/helpers/jwt';
import { v4 as uuid } from 'uuid';

/**
 * Interface representing the parameters required for login.
 * @interface
 * @property {string} username - The email address of the user.
 * @property {string} password - The password of the user.
 */
export interface ILoginParams {
	email: string;
	password?: string;
}

class AuthManager {
	#model: DB.models.Users = DB.models.Users;
	#accessTokensModel: DB.models.AccessTokens = DB.models.AccessTokens;

	login = async (params: ILoginParams) => {
		try {
			let where: ILoginParams = { email: params.email };
			where = params.password ? { ...where, password: MD5(params.password) } : where;

			const userInstance = await this.#model.findOne({
				where,
				plain: true,
			});

			if (!userInstance) throw 'USER_DOESNT_EXISTS';

			const user = userInstance.get({ plain: true });
			const payload = { email: user.email, id: user.id, generatedAt: Date.now() };
			const token = jwt.generate(payload);

			await this.#accessTokensModel.create({
				id: uuid(),
				userId: user.id,
				accessToken: token,
			});

			if (!user) throw 'USER_DOESNT_EXISTS';

			return { status: true, data: { user, token } };
		} catch (error) {
			return { status: false, error };
		}
	};
}

export /*bundle*/ const auth = new AuthManager();
