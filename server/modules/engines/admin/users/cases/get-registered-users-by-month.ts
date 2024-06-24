import Sequelize, { Op, Model } from 'sequelize';

export interface IGetRegisteredUsersByMonth {
	year: number;
}

interface IParams extends IGetRegisteredUsersByMonth {
	model: Model['_attributes'];
}

export const getRegisteredUsersByMonth = async ({ year, model }: IParams) => {
	try {
		const startOfYear = new Date(year, 0, 1);
		const endOfYear = new Date(year + 1, 0, 1);

		const users = await model.findAll({
			attributes: [
				[Sequelize.fn('MONTH', Sequelize.col('time_created')), 'month'],
				[Sequelize.fn('COUNT', Sequelize.col('id')), 'count'],
			],
			where: {
				timeCreated: {
					[Op.between]: [startOfYear, endOfYear],
				},
			},
			group: [Sequelize.fn('MONTH', Sequelize.col('time_created'))],
			order: [[Sequelize.fn('MONTH', Sequelize.col('time_created')), 'ASC']],
		});

		const getMonthName = (monthNumber: number) => {
			const monthNames = [
				'January',
				'February',
				'March',
				'April',
				'May',
				'June',
				'July',
				'Agust',
				'September',
				'October',
				'November',
				'December',
			];
			return monthNames[monthNumber - 1];
		};

		// Inicializar los datos para cada mes
		const monthlyData = Array.from({ length: 12 }, (_, i) => ({
			label: getMonthName(i + 1),
			improved: 'N/A',
			value: 0,
		}));

		// Llenar los datos obtenidos de la base de datos
		users.forEach((user) => {
			const monthIndex = user.getDataValue('month') - 1;
			monthlyData[monthIndex].value = user.getDataValue('count');
		});

		// Calcular el porcentaje de mejora
		let lastMonthCount = 0;
		monthlyData.forEach((data, index) => {
			if (index !== 0 && lastMonthCount !== 0) {
				const improvement = ((data.value - lastMonthCount) / lastMonthCount) * 100;
				monthlyData[index].improved = `${improvement.toFixed(2)}%`;
			}
			lastMonthCount = data.value;
		});

		return { status: true, data: monthlyData };
	} catch (error) {
		return { status: false, error };
	}
};
