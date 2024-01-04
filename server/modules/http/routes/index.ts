import { Application, Request, Response } from 'express';
import { users } from './business/users';
import { modules } from './business/modules';
import { auth } from './business/auth';
import { profiles } from './business/profiles';
import { widgets } from './business/widgets';

export /*bundle*/ function routes(app: Application) {
	app.get('/', (req: Request, res: Response) => {
		res.send('Express page with BeyondJS');
	});

	users.setup(app);
	modules.setup(app);
	auth.setup(app);
	profiles.setup(app);
	widgets.setup(app);
}
