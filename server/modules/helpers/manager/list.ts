import { actions } from '@bgroup/data-model/db';
import { Sequelize } from 'sequelize';

export class List {
	static #default = { order: 'timeUpdated', limit: 30, start: 0 };

	static execute = async (model, params, target: string) => {
		const limit = params?.limit ? parseInt(params.limit, 10) : List.#default.limit;
		const offset = params?.start ? parseInt(params.start, 10) : List.#default.start;

		// Default order
		let order = [[params?.order ?? List.#default.order, params?.asc ?? 'DESC']];

		// If specific ordering by ids is requested
		const orderById = params.order === 'id' && params.where.ids && params.where.ids.length;
		if (orderById) {
			const idsOrder = Sequelize.literal(`FIELD(id, ${params.where.ids.map(id => `'${id}'`).join(',')})`);
			order = [[idsOrder, 'DESC']];
			delete params.where.ids;
		}

		// Clean up params before passing to the query
		delete params?.index;
		delete params?.accessToken;
		delete params?.asc;

		try {
			const where = Object.entries(params?.where ?? {}).map(([key, value]) => ({ [key]: value }));
			const query = Object.entries(params?.where || {}).length > 1 ? { or: where } : params.where || {};
			const filters = params?.filter ?? actions.processFilters(model, query);
			const attributes = params?.attributes ?? Object.keys(model.rawAttributes);
			const specs: any = {
				attributes,
				order,
				offset,
				limit: limit + 1,
				where: filters,
			};
			if (params.include) specs.include = params.include;

			const dataModel = await model.findAll(specs);
			const data = dataModel.map(item => item.get({ plain: true }));

			const total = await model.count({ where: filters });

			let next: number = 0;
			if (data.length > limit) {
				next = offset + limit;
				data.pop();
			}

			return {
				status: true,
				data: {
					entries: data,
					next,
					total,
				},
			};
		} catch (exc) {
			console.error('Error in list method', exc);
			return { status: false, error: exc, target };
		}
	};
}
