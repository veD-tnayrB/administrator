import { MD5 } from '@bgroup/helpers/md5';
import { DB } from '@essential-js/admin-server/db';
import { mailer, registeredUserTemplate } from '@essential-js/admin-server/emails';

export interface IPublishParams {
	id: string;
	active: boolean;
	password: string;
	email: string;
	lastNames: string;
	names: string;
	profiles: string[];
	profileImg: string;
}

export class Publish {
	static model: typeof DB.models.Users = DB.models.Users;
	static usersProfilesModel: typeof DB.models.UsersProfiles = DB.models.UsersProfiles;

	static handleProfiles = async (userId: string, profiles: string[], transaction) => {
		await Publish.usersProfilesModel.destroy({ where: { userId } }, { transaction });

		if (profiles.length) {
			const profilesToCreate = profiles.map(profileId => ({ userId, profileId }));
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

	static create = async (params: IPublishParams, target: string) => {
		const transaction = await DB.sequelize.transaction();
		try {
			const { profiles, ...userParams } = params;

			if (!userParams.email) throw 'EMAIL_IS_REQUIRED';
			if (!userParams.names) throw 'EMAIL_IS_REQUIRED';
			if (!userParams.lastNames) throw 'EMAIL_IS_REQUIRED';

			const isDuplicated = await Publish.model.findOne({ where: { email: userParams.email } });
			if (isDuplicated) throw 'EMAIL_ALREADY_EXISTS';

			if (userParams.password) {
				userParams.password = userParams.password || process.env.USER_DEFAULT_PASSWORD;
				const response = await this.handlePassword(
					userParams.email,
					userParams.password,
					userParams.names,
					userParams.lastNames
				);

				if (!response.status) throw response.error;
				userParams.password = response.password;
			}
			const user = await Publish.model.create(userParams, { transaction });
			await this.handleProfiles(userParams.id, profiles || [], transaction);
			await transaction.commit();
			return { status: true, data: { id: user.id } };
		} catch (error) {
			await transaction.rollback();
			return { status: false, error: { error, target } };
		}
	};

	static update = async (params: IPublishParams, target: string) => {
		const transaction = await DB.sequelize.transaction();
		try {
			const { id, profiles, ...userParams } = params;
			if (!userParams.email) throw 'EMAIL_IS_REQUIRED';
			if (!userParams.names) throw 'EMAIL_IS_REQUIRED';
			if (!userParams.lastNames) throw 'EMAIL_IS_REQUIRED';

			const isDuplicated = await Publish.model.findOne({ where: { email: userParams.email } });
			if (isDuplicated && isDuplicated.dataValues.id !== id) throw 'EMAIL_ALREADY_EXISTS';

			if (userParams.password) {
				userParams.password = userParams.password || process.env.USER_DEFAULT_PASSWORD;
				const response = await this.handlePassword(
					userParams.email,
					userParams.password,
					userParams.names,
					userParams.lastNames
				);

				if (!response.status) throw response.error;
				userParams.password = response.password;
			}

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
