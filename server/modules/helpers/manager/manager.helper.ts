import { Model } from 'sequelize';
import { actions } from '@bgroup/data-model/db';
import { Excel } from '@bggroup/excel/excel';
import * as path from 'path';

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

export /*bundle*/ abstract class Manager {
	#model: Model;
	get model() {
		return this.#model;
	}

	#managerName: string;

	constructor({ model, managerName }: { model: Model; managerName: string }) {
		if (!model) throw new Error('DB_MODEL_IS_REQUIRED');
		this.#model = model;
		this.#managerName = managerName;
	}

	list = (params: Partial<{ [key: string]: unknown }>) => {
		const or = [];
		if (params?.where) {
			Object.entries(params.where).forEach(([key, value]) => {
				or.push({ [key]: value });
			});

			params.where = !!Object.keys(params.where).length ? { or } : {};
		}
		return actions.list(this.#model, { ...params }, `/list/${this.#managerName}`);
	};

	create = (params: Partial<{ [key: string]: any }>) => {
		return actions.publish(this.#model, { ...params }, `/create/${this.#managerName}`);
	};

	update = (params: Partial<{ [key: string]: any }>) => {
		console.log('UPDATE => ', params);
		return actions.publish(this.#model, { ...params }, `/update/${this.#managerName}`);
	};

	get = (params: { id: string }) => {
		return actions.data(this.#model, params, `/get/${this.#managerName}`);
	};

	delete = ({ id }: { id: string }) => {
		return actions.remove(this.#model, { id }, `/delete/${this.#managerName}`);
	};

	generateReport = async ({
		header,
		params,
		type,
	}: {
		header: { label: string; name: string }[];
		params: { [key: string]: any };
		type: 'xlsx' | 'csv';
	}) => {
		try {
			console.log('PARAMS => ', params, header, type);
			if (!params) return { status: true };
			const response = await this.list(params);
			const formatedItems = response.data.entries.map(item => {
				let newItem = {};
				header.forEach(h => {
					newItem[h.name] = item[h.name];
				});
				return newItem;
			});

			const formatedHeader = header.map(item => ({ header: item.label, key: item.name }));

			const excel = new Excel();

			const date = new Date();
			const formattedDate = date.toLocaleDateString('en-GB').replace(/\//g, '-');
			const alternativeName = `Report-${formattedDate}`;

			const specs: IParamsExcel = {
				pathname: `output`,
				filename: `${this.#managerName || alternativeName}.${type}`,
				type,
				sheetData: [
					{
						sheetName: 'Sheet1',
						data: formatedItems,
						columnsHeader: formatedHeader,
					},
				],
				options: [],
			};

			const excelResponse = await excel.create(specs);
			console.log('EXCEL RESPONSE => ', excelResponse);
			if (!excelResponse.status) throw response.error;

			return { status: true, data: excelResponse.data };
		} catch (error) {
			console.error(error);
			return { status: false, error };
		}
	};
}
