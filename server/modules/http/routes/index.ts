import { Application, Request, Response } from 'express';
import { users } from './business/users';
import { modules } from './business/modules';

export /*bundle*/ function routes(app: Application) {
	app.get('/', (req: Request, res: Response) => {
		res.send('Express page with BeyondJS');
	});

	users.setup(app);
	modules.setup(app);
}
