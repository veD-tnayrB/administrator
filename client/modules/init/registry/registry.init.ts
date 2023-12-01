import { DBManager } from '@beyond-js/reactive/database';
import config from '@essential-js/admin/config';

const dbName = config.params.application.localDB;
const dbVersion = config.params.application.localDBVersion;

async function inializeApp() {
	try {
		await DBManager.config(`${dbName}@${dbVersion}`, {
			users: 'id, active, email, lastNames, names, timeCreated, timeUpdated',
			widgets: 'id, active, identifier, metadata, order',
			profiles: 'id, name, description, timeCreated, timeUpdated',
			modules: 'id, label, iconDarkMode, iconLightMode, to, timeCreated, timeUpdated, order',
		});
	} catch (e) {
		console.error('error', e);
	}
}

inializeApp();
