import { Application, Request, Response } from 'express';
import { users } from './business/users';
import { modules } from './business/modules';
import { auth } from './business/auth';
import { profiles } from './business/profiles';
import { widgets } from './business/widgets';
import { notifications } from './business/notifications';
// import { permissions } from './business/permissions';

export /*bundle*/ function routes(app: Application) {
	app.get('/', (req: Request, res: Response) => {
		res.send('Express page with BeyondJS');
	});

	users.setup(app);
	modules.setup(app);
	auth.setup(app);
	profiles.setup(app);
	widgets.setup(app);
	notifications.setup(app);
	// permissions.setup(app);
}
