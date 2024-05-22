import { MD5 } from '@bgroup/helpers/md5';
import * as jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import { DB } from '@essential-js/admin-server/db';

export interface ILoginParams {
	email: string;
	password?: string;
	notificationsToken?: string;
	timezone?: string;
}
export class Login {
	static #model: typeof DB.models.Users = DB.models.Users;
	static #accessTokensModel: typeof DB.models.AccessTokens = DB.models.AccessTokens;
	static #usersProfilesModel: typeof DB.models.UsersProfiles = DB.models.UsersProfiles;
	static #profileModulePermissionsModel: typeof DB.models.ProfileModulePermissions =
		DB.models.ProfileModulePermissions;

	static async execute(params: ILoginParams) {
		try {
			let where: ILoginParams = { email: params.email };
			where = params.password ? { ...where, password: MD5(params.password) } : where;
			const userInstance = await this.#model.findOne({
				where,
				plain: true,
			});

			if (!userInstance) throw 'USER_DOESNT_EXISTS';

			const user = userInstance.get({ plain: true });
			const token = await Login.#generateAccessToken({
				userEmail: user.email,
				userId: user.id,
				timezone: params.timezone,
				notificationsToken: params.notificationsToken,
			});

			const { profiles, permissions } = await Login.#getPermissions({ userId: user.id });

			const { password, ...userProperties } = user;
			const userToSend = { ...userProperties, profiles, permissions };

			return { status: true, data: { user: userToSend, token } };
		} catch (error) {
			return { status: false, error };
		}
	}

	static #generateAccessToken = async (params: {
		userEmail: string;
		notificationsToken: string;
		timezone: string;
		userId: string;
	}) => {
		const payload = { email: params.userEmail, id: params.userId, generatedAt: Date.now() };
		const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE_TIME });

		await this.#accessTokensModel.create({
			id: uuid(),
			userId: params.userId,
			accessToken: token,
			notificationsToken: params.notificationsToken,
			timezone: params.timezone,
		});

		return token;
	};

	static #getPermissions = async (params: { userId: string }) => {
		let profiles = await this.#usersProfilesModel.findAll({
			where: { userId: params.userId },
			include: [{ model: DB.models.Profiles, as: 'profile' }],
		});
		profiles = profiles.map((profile) => profile.get({ plain: true }).profile);
		let permissions = [];
		for (const profile of profiles) {
			const profilePermissions = await this.#profileModulePermissionsModel.findAll({
				where: { profileId: profile.id },
				include: [
					{
						model: DB.models.ModulesActions,
						as: 'action',
						include: [{ model: DB.models.Modules, as: 'module' }],
					},
				],
			});
			const formattedPermissions = profilePermissions.map((permission) => {
				const action = permission.get({ plain: true }).action;
				return {
					moduleId: action.module.id,
					moduleTo: action.module.to,
					actionId: action.id,
					actionName: action.name,
				};
			});
			permissions = [...permissions, ...formattedPermissions];
		}
		return { profiles, permissions };
	};
}
