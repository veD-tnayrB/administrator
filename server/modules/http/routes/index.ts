import { Application, Request, Response } from 'express';
import { users } from './business/users';
import { modules } from './business/modules';
import { AuthRoutes } from './business/auth';
import { profiles } from './business/profiles';

export /*bundle*/ function routes(app: Application) {
	app.get('/', (req: Request, res: Response) => {
		res.send('Express page with BeyondJS');
	});

	users.setup(app);
	modules.setup(app);
	AuthRoutes.setup(app);
	profiles.setup(app);
}
