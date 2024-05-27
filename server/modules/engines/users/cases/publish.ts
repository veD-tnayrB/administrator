import { DB } from '@essential-js/admin-server/db';
import { MD5 } from '@bgroup/helpers/md5';

export class Publish {
	static model: typeof DB.models.Users = DB.models.Users;
	static usersProfilesModel: typeof DB.models.UsersProfiles = DB.models.UsersProfiles;

	static handleProfiles = async (userId: string, profiles: string[], transaction) => {
		await Publish.usersProfilesModel.destroy({ where: { userId } }, { transaction });

		if (profiles.length) {
			const profilesToCreate = profiles.map((profileId) => ({ userId, profileId }));
			await Publish.usersProfilesModel.bulkCreate(profilesToCreate, { transaction });
		}
	};

	static create = async (params, target: string) => {
		const transaction = await DB.sequelize.transaction();
		try {
			const { profiles, ...userParams } = params;
			userParams.password = MD5(process.env.USER_DEFAULT_PASSWORD);
			console.log('USER CREATING: ', userParams, process.env.USER_DEFAULT_PASSWORD);
			const user = await Publish.model.create(userParams, { transaction });
			await this.handleProfiles(userParams.id, profiles || [], transaction);

			await transaction.commit();
			return { status: true, data: { id: user.id } };
		} catch (error) {
			await transaction.rollback();
			return { status: false, error: { error, target } };
		}
	};

	static update = async (params, target: string) => {
		const transaction = await DB.sequelize.transaction();
		try {
			const { id, profiles, ...userParams } = params;
			await Publish.model.update(userParams, { where: { id }, transaction });
			await this.handleProfiles(id, profiles, transaction);

			await transaction.commit();
			return { status: true, data: { id } };
		} catch (error) {
			await transaction.rollback();
			return { status: false, error: { error, target } };
		}
	};
}
