import { v4 as uuid } from 'uuid';
import { DB } from '@essential-js/admin-server/db';
import { Excel } from '@bggroup/excel/excel';
import { Model } from 'sequelize';

export interface IBulkImport {
	filepath: string;
}
type TDataType = 'string' | 'number' | 'boolean' | 'date';

export interface IColumnValidation {
	key: string;
	type?: TDataType;
	regex?: string;
}

export interface ICellRangeValidation {
	startRow: number;
	endRow: number;
	startCol: number;
	endCol: number;
	type?: TDataType;
	regex?: string;
}

type TCellsValidations = {
	columns: Array<{
		sheet: string;
		items: IColumnValidation[];
	}>;
	cells: Array<{
		sheet: string;
		items: ICellRangeValidation[];
	}>;
};

interface IParamsRead {
	filePath: string;
	validations?: TCellsValidations;
	type: 'csv' | 'xlsx';
	sheet: string;
}
interface IParams extends IBulkImport {
	model: Model;
}
export const bulkImport = async ({ filepath, model }: IParams) => {
	const transaction = await DB.sequelize.transaction();

	try {
		// Example code to read an Excel file in XLSX format
		const excel = new Excel();
		const readParams = {
			filePath: filepath,
			type: 'xlsx',
		};

		const response = await excel.read(readParams as IParamsRead);
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

		const mappings: { [key: string]: string }[] = firstPage.map(row => {
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

		const results = [];

		for (const record of mappings) {
			try {
				let operationResult;

				if (record.id) {
					// Actualiza si existe, de lo contrario, inserta
					const [instance, created] = await model.upsert(record, {
						transaction,
						returning: true, // Asegúrate de que tu DB soporta 'returning'
					});

					// Revisa si la instancia es devuelta y si 'created' es un booleano
					if (typeof created === 'boolean') {
						operationResult = created
							? { status: 'inserted', id: instance?.id || record.id }
							: { status: 'updated', id: record.id };
					} else {
						// Asume que se ha insertado si no se puede determinar el estado
						operationResult = { status: 'inserted', id: record.id };
					}
				} else {
					// Asigna un nuevo UUID y crea un nuevo registro
					const newRecord = await model.create({ ...record, id: uuid() }, { transaction });
					operationResult = { status: 'created', id: newRecord.id };
				}

				results.push(operationResult);
			} catch (error) {
				results.push({ status: 'error', error: error.message, data: record });
			}
		}

		console.log('RESULTS => ', results);
		await transaction.commit();
		return results;
	} catch (error) {
		await transaction.rollback();
		return { status: false, error };
	}
};
