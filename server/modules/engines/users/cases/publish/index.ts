import { DB } from '@essential-js/admin-server/db';
import { MD5 } from '@bgroup/helpers/md5';
import { IUser } from '@essential-js/admin-server/types';
import { mailer, registeredUserTemplate } from '@essential-js/admin-server/emails';

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

	static handlePassword = async (email: string, newPassword: string, names: string, lastNames: string) => {
		if (!newPassword) return { status: true };

		const { subject, html } = registeredUserTemplate({ password: newPassword, names, lastNames });

		const response = await mailer.sendMail({
			from: process.env.MAILER_FROM,
			to: email,
			subject,
			html,
		});
		if (response.rejected.length) return { status: false, error: 'Error sending email' };
		return { status: true, password: MD5(newPassword) };
	};

	static create = async (params: IUser, target: string) => {
		const transaction = await DB.sequelize.transaction();
		try {
			const { profiles, ...userParams } = params;
			userParams.password = userParams.password || process.env.USER_DEFAULT_PASSWORD;
			const response = await this.handlePassword(
				userParams.email,
				userParams.password,
				userParams.names,
				userParams.lastNames,
			);
			if (!response.status) throw response.error;

			userParams.password = response.password;
			const user = await Publish.model.create(userParams, { transaction });
			await this.handleProfiles(userParams.id, profiles || [], transaction);
			await transaction.commit();
			return { status: true, data: { id: user.id } };
		} catch (error) {
			await transaction.rollback();
			return { status: false, error: { error, target } };
		}
	};

	static update = async (params: IUser, target: string) => {
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
