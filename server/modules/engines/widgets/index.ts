import { DB } from '@essential-js/admin-server/db';
import { Manager } from '@essential-js/admin-server/helpers';

export class WidgetsManager extends Manager {
	constructor() {
		super({ model: DB.models.Widgets });
	}

	getDashboard = async (params: { userId: string }) => {
		try {
			console.log('PARAMS.getdashboard', params);
			// Obtener los widgets directamente asociados al usuario
			const directWidgets = await DB.models.UsersWidgets.findAll({
				include: [
					{
						model: DB.models.Widgets,
						as: 'widget',
					},
				],
				where: { userId: params.userId },
			});

			// Obtener los IDs de los perfiles del usuario
			const userProfiles = await DB.models.UsersProfiles.findAll({
				attributes: ['profileId'],
				where: { userId: params.userId },
			});
			const profileIds = userProfiles.map((up) => up.profileId);

			// Obtener los widgets asociados a través de los perfiles del usuario
			const profileWidgets = await DB.models.WidgetsProfiles.findAll({
				include: [
					{
						model: DB.models.Widgets,
						as: 'widget',
					},
				],
				where: {
					profileId: profileIds,
				},
			});

			// Obtener la lista general de widgets para todos los perfiles
			const generalWidgets = await DB.models.Widgets.findAll({
				include: [
					{
						model: DB.models.WidgetsProfiles,
						as: 'widgetsProfiles',
						where: {
							profileId: profileIds,
						},
						required: false,
					},
				],
			});

			const allWidgetInstances = [...directWidgets, ...profileWidgets];
			const widgetMap = new Map();
			console.log('ALLWIDGETS', allWidgetInstances);
			allWidgetInstances.forEach((wi) => {
				const widgetRecord = wi.get({ plain: true });
				const widgetData = widgetRecord.widget;
				widgetMap.set(widgetData.id, {
					...widgetData,
					columnPosition: widgetRecord.columnPosition,
					rowPosition: widgetRecord.rowPosition,
				});
			});

			const userSpecificWidgets = Array.from(widgetMap.values());

			const generalWidgetData = generalWidgets.map((widget) => widget.get({ plain: true }));

			return { status: true, data: { entries: userSpecificWidgets, allWidgets: generalWidgetData } };
		} catch (error) {
			console.error('Error getting dashboard widgets:', error);
			return { status: false, error: error.toString() };
		}
	};

	getTotals = async () => {
		try {
			const users = await DB.models.Users.findAll({});
			const notifications = await DB.models.Notifications.findAll({});
			const profiles = await DB.models.Profiles.findAll({});

			return {
				status: true,
				data: { users: users.length, notifications: notifications.length, profiles: profiles.length },
			};
		} catch (error) {
			return { status: false, error };
		}
	};
}

export /*bundle*/ const Widgets = new WidgetsManager();
