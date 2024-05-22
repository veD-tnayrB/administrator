import { Excel } from '@bggroup/excel/excel';
import { Model } from 'sequelize';
import { actions } from '@bgroup/data-model/db';

export type TSheetData = {
	sheetName: string;
	data: object[];
	columnsHeader: object[];
};

export interface IParamsExcel {
	pathname: string;
	options: object;
	filename: string;
	sheetData: Array<TSheetData>;
	type: 'csv' | 'xlsx';
}

export /*bundle*/ interface IGenerateReport {
	header: { label: string; name: string }[];
	params: { [key: string]: any };
	type: 'xlsx' | 'csv';
}

interface IParams extends IGenerateReport {
	model: Model;
	managerName: string;
}

export const generateReport = async <T>({ header, params, type, model, managerName }: IParams) => {
	try {
		if (!params) return { status: true };
		const response = await actions.list(model, { ...params }, `/list/${managerName}`);
		if (!response) throw new Error("FILTER_COULDN'T_BE_APPLIED");

		let formatedItems: Array<T> = [];

		if ('data' in response) {
			formatedItems = response.data.entries.map((item: T) => {
				let newItem = {};
				header.forEach((h) => {
					newItem[h.name] = item[h.name];
				});
				return newItem;
			});
		}
		const formatedHeader = header.map((item) => ({ header: item.label, key: item.name }));

		const excel = new Excel();

		const date = new Date();
		const formattedDate = date.toLocaleDateString('en-GB').replace(/\//g, '-');
		const alternativeName = `Report-${formattedDate}`;

		const specs: IParamsExcel = {
			pathname: `excel/temp`,
			filename: `${managerName || alternativeName}.${type}`,
			type,
			sheetData: [
				{
					sheetName: 'Sheet1',
					data: formatedItems as Object[],
					columnsHeader: formatedHeader,
				},
			],
			options: {},
		};

		const excelResponse = await excel.create(specs);
		if (!excelResponse.status) throw response;

		return { status: true, data: excelResponse.data };
	} catch (error) {
		console.error(error);
		return { status: false, error };
	}
};
