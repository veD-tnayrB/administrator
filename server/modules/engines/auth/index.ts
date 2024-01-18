import { DB } from '@essential-js/admin-server/db';
import { MD5 } from '@bgroup/helpers/md5';
import { jwt } from '@essential-js/admin-server/helpers';
import { v4 as uuid } from 'uuid';

export interface ILoginParams {
	email: string;
	password?: string;
	notificationsToken?: string;
}

class AuthManager {
	#model: DB.models.Users = DB.models.Users;
	#accessTokensModel: DB.models.AccessTokens = DB.models.AccessTokens;
	#usersProfilesModel: DB.models.UsersProfiles = DB.models.UsersProfiles;
	#profileModulePermissionsModel: DB.models.ProfileModulePermissions = DB.models.ProfileModulePermissions;

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
			const token = jwt.generate(payload, process.env.JWT_EXPIRE_TIME);

			console.log('NOTIFICATIONS TOKEN S=> ', params.notificationsToken);
			await this.#accessTokensModel.create({
				id: uuid(),
				userId: user.id,
				accessToken: token,
				notificationsToken: params.notificationsToken,
			});

			let profiles = await this.#usersProfilesModel.findAll({
				where: { userId: user.id },
				include: [{ model: DB.models.Profiles, as: 'profile' }],
			});
			profiles = profiles.map(profile => {
				const { profileId, ...toSend } = profile.get({ plain: true });
				return { ...toSend.profile };
			});

			let permissions = [];
			for (const profile of profiles) {
				const profilePermissions = await this.#profileModulePermissionsModel.findAll({
					where: { profileId: profile.id },
					include: [
						{ model: DB.models.Permissions, as: 'permission' },
						{ model: DB.models.Modules, as: 'module' },
					],
				});
				const otherPermision = profilePermissions.map(permission => permission.get({ plain: true }));
				permissions = [...permissions, ...otherPermision];
			}

			const { password, ...userProperties } = user;
			const userToSend = { ...userProperties, profiles, permissions };

			return { status: true, data: { user: userToSend, token } };
		} catch (error) {
			return { status: false, error };
		}
	};

	getUser = async (params: { token: string }) => {
		try {
			// Buscar el token de acceso para obtener el usuario
			const accessTokenInstance = await this.#accessTokensModel.findOne({
				where: { accessToken: params.token },
				include: [{ model: DB.models.Users, as: 'user' }],
			});

			if (!accessTokenInstance) throw 'ACCESS_TOKEN_NOT_FOUND';

			const userInstance = accessTokenInstance.get({ plain: true }).user;

			// Cargar perfiles del usuario
			let profiles = await this.#usersProfilesModel.findAll({
				where: { userId: userInstance.id },
				include: [{ model: DB.models.Profiles, as: 'profile' }],
			});
			profiles = profiles.map(profile => {
				const { profileId, ...toSend } = profile.get({ plain: true });
				return { ...toSend.profile };
			});

			let permissions = [];
			for (const profile of profiles) {
				const profilePermissions = await this.#profileModulePermissionsModel.findAll({
					where: { profileId: profile.id },
					include: [
						{ model: DB.models.Permissions, as: 'permission' },
						{ model: DB.models.Modules, as: 'module' },
					],
				});
				const otherPermision = profilePermissions.map(permission => permission.get({ plain: true }));
				permissions = [...permissions, ...otherPermision];
			}

			const { password, ...userProperties } = userInstance;
			const userToSend = { ...userProperties, profiles, permissions };

			return { status: true, data: { user: userToSend, token: params.token } };
		} catch (error) {
			return { status: false, error };
		}
	};
}

export /*bundle*/ const Auth = new AuthManager();
