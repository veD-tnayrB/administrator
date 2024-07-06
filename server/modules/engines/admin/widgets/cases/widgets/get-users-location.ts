import { DB } from '@essential-js/admin-server/db';

export class GetUsersLocation {
	static execute = async () => {
		try {
			const sessions = await DB.models.AccessTokens.findAll({ raw: true });
			const locations = {};

			sessions.forEach((session) => {
				if (locations[session.timezone]) {
					const newCount = locations[session.timezone] + 1;
					locations[session.timezone] = newCount;
					return;
				}

				locations[session.timezone] = 1;
			});

			return { status: true, data: locations };
		} catch (error) {
			console.error(error);
			return { status: false, error };
		}
	};
}
