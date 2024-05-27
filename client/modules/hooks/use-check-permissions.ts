import React from 'react';
import { session } from '@essential-js/admin/auth';
import { routing } from '@beyond-js/kernel/routing';
import { IPermission } from '@essential-js/admin/models';
import config from '@essential-js/admin/config';

const permissionLessRoutes: Array<string> = config.params.application.permissionLessRoutes;

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

		const isPermissionLessRoute = permissionLessRoutes.includes(currentRoute);

		if (!isAllowed && !isPermissionLessRoute) return routing.pushState('/error/403');
		if (isPermissionLessRoute) return setHasPermission(true);
		setHasPermission(isAllowed);
	}, [currentRoute, session, session.user.permissions]);

	return hasPermission;
};
