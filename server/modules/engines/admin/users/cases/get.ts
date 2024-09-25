import { DB } from '@essential-js/admin-server/db';

export interface IGetParams {
	id: string;
}

export class Get {
	static model: typeof DB.models.Users = DB.models.Users;
	static execute = async (params: IGetParams) => {
		try {
			const specs: any = { where: { id: params.id } };
			const dataModel = await this.model.findOne(specs);
			if (!dataModel) return { status: true, data: null };
			const data = dataModel.get({ plain: true });

			const profiles = await DB.models.UsersProfiles.findAll({
				where: { userId: params.id },
			});
			data.profiles = profiles.map((profile) => profile.dataValues.profileId);
			delete data.password;
			return { status: true, data };
		} catch (exc) {
			return {
				status: false,
				error: { message: exc, target: `/get/users` },
			};
		}
	};
}
