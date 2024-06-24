import { Model } from 'sequelize';
import { actions } from '@bgroup/data-model/db';
import { IGenerateReport, generateReport } from '../excel-handler/cases/generate-report';
import { IListParams, List } from './list';

export /*bundle*/ abstract class Manager<IPublish = any> {
	#model: Model['_attributes'];
	get model() {
		return this.#model;
	}

	#managerName: string;
	get managerName() {
		return this.#managerName;
	}

	constructor({ model, managerName }: { model: Model['_attributes']; managerName: string }) {
		if (!model) throw new Error('DB_MODEL_IS_REQUIRED');
		this.#model = model;
		this.#managerName = managerName;
	}

	list = (params: IListParams) => {
		return List.execute(this.#model, params, `/list/${this.#managerName}`);
	};

	create = (params: Partial<IPublish>) => {
		return actions.publish(this.#model, { ...params }, `/create/${this.#managerName}`);
	};

	update = (params: IPublish) => {
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
