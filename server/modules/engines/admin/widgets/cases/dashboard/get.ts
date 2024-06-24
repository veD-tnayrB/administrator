import { DB } from '@essential-js/admin-server/db';
import { IProfile } from '@essential-js/admin-server/types';

export interface IGetDashboardParams {
	userId: string;
	profiles: IProfile[];
}

export class GetDashboard {
	static execute = async (params: IGetDashboardParams) => {
		try {
			const directWidgets = await DB.models.UsersWidgets.findAll({
				include: [
					{
						model: DB.models.Widgets,
						as: 'widget',
					},
				],
				where: { userId: params.userId },
			});

			const profilesIds = params.profiles.map((profile) => profile.id);

			// Obtener los widgets asociados a través de los perfiles del usuario
			const profileWidgets = await DB.models.Widgets.findAll({
				include: [
					{
						model: DB.models.WidgetsProfiles,
						as: 'widgetsProfiles',
						where: {
							profileId: profilesIds,
						},
						required: true,
					},
				],
			});

			// Combinar y deduplicar los widgets directos y de perfil
			const allWidgets = [...directWidgets];
			const widgetMap = new Map();
			allWidgets.forEach((wi) => {
				const widgetRecord = wi.get({ plain: true });
				const widgetData = widgetRecord.widget;
				if (!widgetMap.has(widgetData.id)) {
					widgetMap.set(widgetData.id, {
						...widgetData,
						columnPosition: widgetRecord.columnPosition,
						rowPosition: widgetRecord.rowPosition,
					});
				}
			});

			const userSpecificWidgets = Array.from(widgetMap.values());

			return { status: true, data: { entries: userSpecificWidgets, allWidgets: profileWidgets } };
		} catch (error) {
			console.error('Error getting dashboard widgets:', error);
			return { status: false, error: error.toString() };
		}
	};
}
