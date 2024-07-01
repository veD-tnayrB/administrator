import { DB } from '@essential-js/admin-server/db';

export /*bundle*/ interface IGet {
	token: string;
}

export class Get {
	static #accessTokensModel: typeof DB.models.AccessTokens = DB.models.AccessTokens;
	static #usersProfilesModel: typeof DB.models.UsersProfiles = DB.models.UsersProfiles;
	static #profileModulePermissionsModel: typeof DB.models.ProfileModulePermissions =
		DB.models.ProfileModulePermissions;

	static execute = async (params: { token: string }) => {
		try {
			const accessTokenInstance = await this.#accessTokensModel.findOne({
				where: { accessToken: params.token },
				include: [{ model: DB.models.Users, as: 'user' }],
			});

			if (!accessTokenInstance) throw 'ACCESS_TOKEN_NOT_FOUND';
			const userInstance = accessTokenInstance.get({ plain: true }).user;
			const { profiles, permissions } = await Get.#getPermissions({
				userId: userInstance.id,
			});
			const { password, ...userProperties } = userInstance;
			const userToSend = { ...userProperties, profiles, permissions };

			return { status: true, data: { user: userToSend, token: params.token } };
		} catch (error) {
			return { status: false, error };
		}
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
					{ model: DB.models.ModulesActions, as: 'action' },
					{ model: DB.models.Modules, as: 'module', where: { active: 1 } },
				],
			});
			const formattedPermissions = profilePermissions.map((permission) => {
				const permissionData = permission.get({ plain: true });
				return {
					moduleId: permissionData.module.id,
					moduleTo: permissionData.module.to,
					moduleState: permissionData.module.active,
					actionId: permissionData.action.id,
					actionName: permissionData.action.name,
				};
			});

			permissions = [...permissions, ...formattedPermissions];
		}

		return { permissions, profiles };
	};
}
