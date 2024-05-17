import React from 'react';
import { session } from '@essential-js/admin/auth';
import { routing } from '@beyond-js/kernel/routing';
import { IPermission } from '@essential-js/admin/models';


export /*bundle */ const useCheckPermissions = () => {
	const [hasPermission, setHasPermission] = React.useState(true);
	const [currentRoute, setCurrentRoute] = React.useState(routing.uri.pathname);
	routing.on('change', () => {
		setCurrentRoute(routing.uri.pathname);
	});

	React.useEffect(() => {
		if (!session.isLogged || !session.user.permissions) return;
		const userModules = session.user.permissions.map((permission: IPermission) => permission.moduleTo);
		const isAllowed = userModules.some((item: string) => currentRoute.includes(item));

		if (!isAllowed) return routing.pushState('/error/403');
		setHasPermission(isAllowed);
	}, [currentRoute, session, session.user.permissions]);

	return hasPermission;
};
