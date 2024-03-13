import { Model } from 'sequelize';
import { actions } from '@bgroup/data-model/db';
import { generateReport } from '../excel-handler/cases/generate-report';
import Sequelize from 'sequelize';
import { List } from './list';

export /*bundle*/ abstract class Manager {
	#model: Model;
	get model() {
		return this.#model;
	}

	#managerName: string;
	get managerName() {
		return this.#managerName;
	}

	constructor({ model, managerName }: { model: Model; managerName: string }) {
		if (!model) throw new Error('DB_MODEL_IS_REQUIRED');
		this.#model = model;
		this.#managerName = managerName;
	}

	list = (params: { where: { ids?: string; [key: string]: unknown }; [key: string]: unknown }) => {
		const ids = params?.where?.ids ? params?.where?.ids.split(',') : [];

		return List.execute(this.#model, { ...params, ids }, `/list/${this.#managerName}`);
	};

	create = (params: Partial<{ [key: string]: any }>) => {
		return actions.publish(this.#model, { ...params }, `/create/${this.#managerName}`);
	};

	update = (params: Partial<{ [key: string]: any }>) => {
		return actions.publish(this.#model, { ...params }, `/update/${this.#managerName}`);
	};

	get = (params: { id: string }) => {
		return actions.data(this.#model, params, `/get/${this.#managerName}`);
	};

	delete = ({ id }: { id: string }) => {
		return actions.remove(this.#model, { id }, `/delete/${this.#managerName}`);
	};

	generateReport = async ({ header, params, type }: IGenerateReport) => {
		return generateReport({ header, params, type, model: this.#model, managerName: this.#managerName });
	};
}
