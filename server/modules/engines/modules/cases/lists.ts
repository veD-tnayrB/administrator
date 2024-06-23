import { DB } from '@essential-js/admin-server/db';
import { IAction } from '@essential-js/admin-server/types';
import { List as ListManager } from '@essential-js/admin-server/helpers';

export interface IListParams {
	where: { ids?: string[]; [key: string]: unknown };
	[key: string]: any;
}

export class List {
	static model: typeof DB.models.Modules = DB.models.Modules;

	static execute = async (params: IListParams) => {
		try {
			const include = [
				{
					model: DB.models.ModulesActions,
					as: 'modulesActions',
				},
			];
			params.include = include;
			const response = await ListManager.execute(this.model, params, 'modules/list');
			if (!response.status) throw response.error;

			const modules = response.data.entries.map((module) => {
				module.actions = module.modulesActions.map((action: IAction) => ({
					id: action.id,
					name: action.name,
					description: action.description,
				}));
				return module;
			});

			return { status: true, data: { entries: modules } };
		} catch (error) {
			console.error('ERROR GETTING MODULE LIST: ', error);
			return { status: false, error };
		}
	};
}
