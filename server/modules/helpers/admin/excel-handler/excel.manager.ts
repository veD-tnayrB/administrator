import { Model } from 'sequelize';
import { IGenerateReport, generateReport } from './cases/generate-report';
import { IBulkImport, bulkImport } from './cases/bulk-import';
import { getTemplate } from './cases/get-template';

interface IParams {
	model: Model;
	managerName: string;
	templateConfig: Record<string, string>;
}

export /*bundle*/ class ExcelHandler {
	#model: Model;
	#managerName: string = '';
	#templateConfig: Record<string, string> = {};

	constructor({ model, managerName, templateConfig }: IParams) {
		this.#model = model;
		this.#managerName = managerName;
		this.#templateConfig = templateConfig;
	}

	generateReport = ({ header, params, type }: IGenerateReport) => {
		return generateReport({ header, params, type, model: this.#model, managerName: this.#managerName });
	};

	bulkImport = ({ filepath, fileType }: IBulkImport) => {
		return bulkImport({ fileType, filepath, model: this.#model, templateConfig: this.#templateConfig });
	};

	getTemplate = ({ type }: { type: 'csv' | 'xlsx' }) => {
		return getTemplate({ type, templateConfig: this.#templateConfig, managerName: this.#managerName });
	};
}
