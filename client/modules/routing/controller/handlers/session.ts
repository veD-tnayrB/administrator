import { session } from '@essential-js/admin/auth';
import config from '@essential-js/admin/config';
const noSession: Array<string> = config.params.application.noSessionRoutes;
const permissionLess: Array<string> = config.params.application.permissionLessRoutes;

export async function SessionHandler(route: string) {
	return validate(route);
}

function validate(route: string) {
	const isANoSessionRoute: boolean = noSession.some((path) => route.startsWith(path));
	const isSessionActive: boolean = session.isLogged;
	if (route.includes('/error')) return { pathname: route };
	if (!isSessionActive && !isANoSessionRoute) return { pathname: '/auth/login' };

	const firstModuleAvaiable =
		(Array.isArray(session.user.permissions) && session.user.permissions[0].moduleTo) || '/dashboard';
	if (isSessionActive && isANoSessionRoute) return { pathname: firstModuleAvaiable };
	if (route === '/') return { pathname: firstModuleAvaiable };

	return { pathname: route };
}
