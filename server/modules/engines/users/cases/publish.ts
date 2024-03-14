import { DB } from '@essential-js/admin-server/db';

export class Publish {
	static model: DB.models.Users = DB.models.Users;
	static usersProfilesModel: DB.models.UsersProfiles = DB.models.UsersProfiles;

	static handleProfiles = async (userId: string, profiles: string[], transaction) => {
		await Publish.usersProfilesModel.destroy({ where: { userId } }, { transaction });

		if (profiles.length) {
			const profilesToCreate = profiles.map(profileId => ({ userId, profileId }));
			await Publish.usersProfilesModel.bulkCreate(profilesToCreate, { transaction });
		}
	};

	static create = async (params, target: string) => {
		const transaction = await DB.sequelize.transaction();
		try {
			const { profiles, ...userParams } = params;
			const user = await Publish.model.create(userParams, { transaction });
			await this.handleProfiles(user.id, profiles || [], transaction);

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
