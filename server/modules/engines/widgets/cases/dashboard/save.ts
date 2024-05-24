import { DB } from '@essential-js/admin-server/db';
import { IWidget } from '@essential-js/admin-server/types';
import { v4 as uuid } from 'uuid';

interface IParams {
	data: IWidget[];
	userId: string;
}

export class SaveDashboard {
	static execute = async ({ data, userId }: IParams) => {
		try {
			const records = data.map((widget) => ({
				id: uuid(),
				columnPosition: widget.columnPosition,
				rowPosition: widget.rowPosition,
				widgetId: widget.id,
				userId,
			}));
			await DB.models.UsersWidgets.destroy({ where: { userId } });
			await DB.models.UsersWidgets.bulkCreate(records);
			return { status: true };
		} catch (error) {
			return { status: false, error };
		}
	};
}
