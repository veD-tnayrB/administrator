import { DBManager } from '@beyond-js/reactive/database';
import config from '@essential-js/admin/config';

const dbName = config.params.application.localDB;
const dbVersion = config.params.application.localDBVersion;

async function inializeApp() {
	try {
		await DBManager.config(`${dbName}@${dbVersion}`, {
			users: 'id, active, email, lastNames, names',
			widgets: 'id, active, identifier',
			profiles: 'id, name, description',
			modules: 'id, label, icon, to, timeCreated, timeUpdated, order',
			notifications: 'id, title, description,  timeInterval, status',
			'notifications-history': 'id, status, timeSent',
			permissions: 'id, name',
		});
	} catch (e) {
		console.error('error', e);
	}
}

inializeApp();
