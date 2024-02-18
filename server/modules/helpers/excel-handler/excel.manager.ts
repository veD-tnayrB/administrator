import { Model } from 'sequelize';
import { IGenerateReport, generateReport } from './cases/generate-report';
import { IBulkImport, bulkImport } from './cases/bulk-import';

export /*bundle*/ class ExcelHandler {
	#model: Model;
	#managerName: string = '';

	constructor({ model, managerName }: { model: Model; managerName: string }) {
		this.#model = model;
		this.#managerName = managerName;
	}

	generateReport = ({ header, params, type }: IGenerateReport) => {
		return generateReport({ header, params, type, model: this.#model, managerName: this.#managerName });
	};

	bulkImport = ({ filepath }: IBulkImport) => {
		return bulkImport({ filepath, model: this.#model });
	};
}
