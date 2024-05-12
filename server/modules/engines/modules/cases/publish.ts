import { DB } from '@essential-js/admin-server/db';

export interface IPublish {
	id: string;
	label: string;
	description: string;
	icon: string;
	to: string;
	actions: Record<string, string>[];
}

export class Publish {
	static model: DB.models.Modules = DB.models.Modules;
	static modulesActions: DB.models.ModulesActions = DB.models.ModulesActions;

	static handleRelations = async (moduleId: string, actions: Record<string, string>[], transaction) => {
		try {
			console.log("actions: ", actions)
			const include = [
				{
					model: DB.models.ModulesActions,
					as: 'actions',
				},
			]
			const moduleInstance = await Publish.model.findOne({ where: { id: moduleId }, include, transaction });
			if (!moduleInstance) throw 'MODULE_WASNT_CREATED_CORRECTLY';
			const module = moduleInstance.get({ plain: true });

			const savedActionsMap = new Map();

			module.actions.forEach(action => {
				const toSave = {
					id: action.id,
					name: action.name,
					description: action.description,
				}

				savedActionsMap.set(action.id, toSave)
			});


			const toCreateActions = [];
			const toEditActions = [];

			for (let action of actions) {

				if (savedActionsMap.has(action.id)) {
					toEditActions.push(action)
					continue
				}

				toCreateActions.push(action);
			}


			if (toCreateActions.length) await Publish.modulesActions.bulkCreate(toCreateActions, { transaction });
			if (toEditActions.length) await Publish.modulesActions.update(toEditActions, { where: { moduleId } });
		} catch (error) {
			throw error;
		}
	}

	static create = async (params: IPublish, target: string) => {
		const transaction = await DB.sequelize.transaction();
		try {
			const { actions, ...module } = params;
			await Publish.model.create(module, { transaction });
			await this.handleRelations(params.id, actions, transaction);

			await transaction.commit();
			return { status: true, data: { id: module.id } };
		} catch (error) {
			await transaction.rollback();
			return { status: false, error: { error, target } };
		}
	};

	static update = async (params: IPublish, target: string) => {
		const transaction = await DB.sequelize.transaction();
		try {
			const { actions, ...module } = params;
			await Publish.model.update(module, { where: { id: module.id }, transaction });
			await this.handleRelations(params.id, actions, transaction);

			await transaction.commit();
			return { status: true, data: { id: module.id } };
		} catch (error) {
			await transaction.rollback();
			return { status: false, error: { error, target } };
		}
	};

}
