import { Application } from 'express';
import { auth } from './auth';

export const appRoutes = (app: Application) => {
	auth.setup(app);
};
