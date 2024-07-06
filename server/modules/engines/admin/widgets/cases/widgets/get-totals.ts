import { DB } from '@essential-js/admin-server/db';

export class GetTotals {
	static execute = async () => {
		try {
			const users = await DB.models.Users.findAll({});
			const notifications = await DB.models.Notifications.findAll({});
			const profiles = await DB.models.Profiles.findAll({});

			return {
				status: true,
				data: { users: users.length, notifications: notifications.length, profiles: profiles.length },
			};
		} catch (error) {
			return { status: false, error };
		}
	};
}
