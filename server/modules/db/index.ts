import { DataModel as DM } from '@bgroup/data-model/db';
import * as dotenv from 'dotenv';
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
	dialectOptions: {},
	initModels: initModels,
};

// sequelize-auto -h 127.0.0.1 -d essential -u root -x 1234567890. -p 3306 --dialect mysql -o "./server/modules/db/tables" --cm p --cp c -l ts

export /*bundle*/ const DB = DM.get(config);
