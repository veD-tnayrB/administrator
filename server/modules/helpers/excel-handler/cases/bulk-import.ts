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
	model: Model;
	templateConfig: Record<string, string>;
}

export const bulkImport = async ({ filepath, model, templateConfig, fileType }: IParams) => {
	const transaction = await DB.sequelize.transaction();
	let formatedFileType: 'csv' | 'xlsx' = fileType.split('.')[1] as 'csv' | 'xlsx';
	formatedFileType = formatedFileType.toLowerCase() as 'csv' | 'xlsx';
	console.log('FORMATED FILE TYPE => ', formatedFileType);

	try {
		// Example code to read an Excel file in XLSX format
		const excel = new Excel();
		const readParams = {
			filePath: filepath,
			type: formatedFileType,
		};

		console.log('BULK IMPORT MANAGER => ', readParams);

		const response = await excel.read(readParams as IParamsRead);
		if (!response.status) throw 'EXCEL_READ_ERROR';

		console.log('RESPONSE => ', response);

		const firstPage = formatedFileType === 'csv' ? (response.data as []) : (Object.values(response.data)[0] as []);

		const mappings: Record<string, any>[] = firstPage.map(row => {
			const mappedRow = {};
			Object.entries(row).forEach(([key, value]) => {
				const propertyName = templateConfig[key];
				if (propertyName) {
					mappedRow[propertyName] = value;
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
					const [instance, created] = await model.upsert(record, {
						transaction,
						returning: true,
					});

					if (typeof created === 'boolean') {
						operationResult = created
							? { status: 'inserted', id: instance?.id || record.id }
							: { status: 'updated', id: record.id };
					} else {
						operationResult = { status: 'inserted', id: record.id };
					}
				} else {
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
		return { status: true, data: results };
	} catch (error) {
		await transaction.rollback();
		return { status: false, error };
	}
};
