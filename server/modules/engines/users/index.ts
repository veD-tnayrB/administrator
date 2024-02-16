import { DB } from '@essential-js/admin-server/db';
import { Manager } from '@essential-js/admin-server/helpers';
import Sequelize, { Op } from 'sequelize';
import { Excel } from '@bggroup/excel/excel';

export class UsersManager extends Manager {
	constructor() {
		super({ model: DB.models.Users });
	}

	getRegisteredUsersByMonth = async (params: { year: number }) => {
		const startOfYear = new Date(params.year, 0, 1);
		const endOfYear = new Date(params.year + 1, 0, 1);

		const users = await this.model.findAll({
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

		// Inicializar los datos para cada mes
		const monthlyData = Array.from({ length: 12 }, (_, i) => ({
			label: getMonthName(i + 1),
			improved: 'N/A',
			value: 0,
		}));

		// Llenar los datos obtenidos de la base de datos
		users.forEach(user => {
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
	};

	bulkImport = async (filepath: string) => {
		try {
			// Example code to read an Excel file in XLSX format
			const excel = new Excel();
			const readParams = {
				filePath: filepath,
				type: 'xlsx',
			};

			const response = await excel.read(readParams);
			if (!response.status) throw 'EXCEL_READ_ERROR';
			console.log('EXCEL RESPONSE => ', response);

			const firstPage = Object.values(response.data)[0] as [];

			const columns = {
				id: ['id', 'ID', 'Id', 'iD'],
				names: ['names', 'Names', 'Nombres'],
				lastNames: ['last_names', 'Last Names', 'Apellidos', 'lastNames'],
				active: ['active', 'Active', 'Activo'],
				email: ['email', 'Email'],
				timeCreated: ['Created at', 'Creado el', 'Created At', 'timeCreated'],
				timeUpdated: ['Updated at', 'Actualizado el', 'Updated At', 'timeUpdated'],
			};
			console.log('FIRST PAGE => ', firstPage);

			const mappings = firstPage.map(row => {
				const mappedRow = {};
				Object.entries(row).forEach(([key, value]) => {
					const property = Object.keys(columns).find(property =>
						columns[property].some(columnName => columnName.toLowerCase() === key.toLowerCase())
					);
					if (property) {
						mappedRow[property] = value;
					}
				});
				return mappedRow;
			});

			console.log('MAPPINGS => ', mappings);
		} catch (error) {
			return { status: false, error };
		}
	};
}

export /*bundle*/ const Users = new UsersManager();
