import { v4 as uuid } from 'uuid';
import { DB } from '@essential-js/admin-server/db';
import { Excel } from '@bggroup/excel/excel';
import { Model } from 'sequelize';

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

export /*bundle*/ interface IBulkImport {
	filepath: string;
	fileType: string;
}

interface IParams extends IBulkImport {
	model: Model['_attributes'];
	templateConfig: Record<string, string>;
}

export const bulkImport = async ({ filepath, model, templateConfig, fileType }: IParams) => {
	const transaction = await DB.sequelize.transaction();
	let formattedFileType: 'csv' | 'xlsx' = fileType.split('.')[1] as 'csv' | 'xlsx';
	formattedFileType = formattedFileType.toLowerCase() as 'csv' | 'xlsx';

	try {
		const excel = new Excel();
		const readParams = {
			filePath: filepath,
			type: formattedFileType,
		};

		const response = await excel.read(readParams as IParamsRead);
		if (!response.status) throw 'EXCEL_READ_ERROR';

		const firstPage = formattedFileType === 'csv' ? (response.data as []) : (Object.values(response.data)[0] as []);
		const mappings: Record<string, any>[] = firstPage.map((row) => {
			return Object.keys(row).reduce((acc, current) => {
				const propertyName = templateConfig[current];
				if (propertyName) {
					acc[propertyName] = row[current];
				}
				return acc;
			}, {});
		});

		const results = [];

		for (const record of mappings) {
			try {
				let operationResult: { status: string; id: string };

				if (record.id) {
					// Verifica si el registro ya existe
					const existingRecord = await model.findByPk(record.id, { transaction });
					if (existingRecord) {
						// Actualiza el registro existente
						await model.update(record, { where: { id: record.id }, transaction });
						operationResult = { status: 'updated', id: record.id };
					} else {
						// Crea un nuevo registro si el ID proporcionado no existe
						const newRecord = await model.create({ ...record }, { transaction });
						operationResult = { status: 'created', id: newRecord.id };
					}
				} else {
					// Asigna un nuevo ID y crea un registro nuevo
					const newRecord = await model.create({ ...record, id: uuid() }, { transaction });
					operationResult = { status: 'created', id: newRecord.id };
				}

				results.push(operationResult);
			} catch (error) {
				results.push({ status: 'error', error: error.message, data: record });
			}
		}

		await transaction.commit();
		return { status: true, data: results };
	} catch (error) {
		await transaction.rollback();
		return { status: false, error: error.message || 'Error during bulk import' };
	}
};
