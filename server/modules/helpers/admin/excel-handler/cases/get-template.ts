import { Excel } from '@bggroup/excel/excel';

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

export /*bundle*/ interface IGetTemplate {
	type: 'csv' | 'xlsx';
}

interface IParams {
	templateConfig: Record<string, string>;
	managerName: string;
	type: 'csv' | 'xlsx';
}

export const getTemplate = async ({ type, templateConfig, managerName }: IParams) => {
	try {
		const header = Object.entries(templateConfig).map(([key, value]) => ({ header: key, key: value }));

		const excel = new Excel();
		const params: IParamsExcel = {
			pathname: 'excel/templates',
			filename: `${managerName}-template.${type}`,
			type,
			sheetData: [
				{
					sheetName: 'Sheet1',
					data: [],
					columnsHeader: header,
				},
			],
			options: {},
		};

		const excelResponse = await excel.create(params);
		if (!excelResponse.status) throw 'EXCEL_TEMPLATE_GENERATION_ERROR';

		return { status: true, data: excelResponse.data };
	} catch (error) {
		return { status: false, error };
	}
};
