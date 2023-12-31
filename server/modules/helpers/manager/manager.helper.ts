import { Model } from 'sequelize';
import { actions } from '@bgroup/data-model/db';

export /*bundle*/ abstract class Manager {
	#model: Model;
	#managerName: string;

	constructor({ model, managerName }: { model: Model; managerName: string }) {
		if (!model) throw new Error('DB_MODEL_IS_REQUIRED');
		this.#model = model;
		this.#managerName = managerName;
	}

	list = (params: Partial<{ [key: string]: unknown }>) => {
		return actions.list(this.#model, params, `/list/${this.#managerName}`);
	};

	create = (params: Partial<{ [key: string]: unknown }>) => {
		return actions.publish(this.#model, params, `/create/${this.#managerName}`);
	};

	update = (params: Partial<{ [key: string]: unknown }>) => {
		return actions.publish(this.#model, params, `/update/${this.#managerName}`);
	};

	get = (params: { id: string }) => {
		return actions.data(this.#model, params, `/get/${this.#managerName}`);
	};
}
