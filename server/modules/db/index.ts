import * as dotenv from 'dotenv';
import { DataModel as DM } from '@bgroup/data-model/db';
import { initModels } from './tables/init-models';
dotenv.config();

const { DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_TIMEZONE, DB_DIALECT, DB_PORT } = process.env;

const config = {
	name: DB_NAME,
	user: DB_USER,
	password: DB_PASS,
	host: DB_HOST,
	dialect: DB_DIALECT,
	port: Number(DB_PORT),
	timeZone: DB_TIMEZONE,
	dialectOptions: {
		options: {
			encrypt: false,
			trustServerCertificate: true,
		},
	},
	initModels: initModels,
};

export /*bundle*/ const DB = DM.get(config);
