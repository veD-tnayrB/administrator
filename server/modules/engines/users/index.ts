import { DB } from '@essential-js/admin-server/db';
import { Manager } from '@essential-js/admin-server/helpers';
import Sequelize, { Op } from 'sequelize';

export class UsersManager extends Manager {
	constructor() {
		super({ model: DB.models.Users });
	}

	getRegisteredUsersByMonth = async (params: { year: number }) => {
		const startOfYear = `${params.year}-01-01 00:00:00`;
		const endOfYear = `${params.year}-12-31 23:59:50`;

		const users = await this.model.findAll({
			where: {
				timeCreated: {
					[Op.between]: [startOfYear, endOfYear],
				},
			},
		});

		console.log('STAT YEAR AND END => ', startOfYear, endOfYear);

		const usersPerMonth = users.map(user => user.get({ plain: true }));

		const getMonthName = monthNumber => {
			const monthNames = [
				'Enero',
				'Febrero',
				'Marzo',
				'Abril',
				'Mayo',
				'Junio',
				'Julio',
				'Agosto',
				'Septiembre',
				'Octubre',
				'Noviembre',
				'Diciembre',
			];
			return monthNames[monthNumber - 1];
		};

		let lastMonthCount = 0;
		console.log('usersPerMonth= < ', usersPerMonth);
		const formattedData = usersPerMonth.map((data, index) => {
			const month = data.getDataValue('month');
			const count = data.getDataValue('count');
			const improved =
				lastMonthCount === 0 ? 'N/A' : `${(((count - lastMonthCount) / lastMonthCount) * 100).toFixed(2)}%`;
			lastMonthCount = count;

			return {
				label: getMonthName(month),
				improved: improved,
				value: count,
			};
		});

		console.log('OFMRATED DATA= > ', formattedData);
		return { status: true, data: [] };
	};
}

export /*bundle*/ const Users = new UsersManager();
