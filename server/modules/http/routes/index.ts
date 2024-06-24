import { Application, Request, Response } from 'express';
import { adminRoutes } from './admin';
import { appRoutes } from './app';

export /*bundle*/ function routes(app: Application) {
	app.get('/', (req: Request, res: Response) => {
		res.send('Skidibi toilet hello world type');
	});

	adminRoutes(app);
	appRoutes(app);
}
