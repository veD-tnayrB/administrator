import { session } from '@essential-js/admin/auth';

const noSession: Array<string> = ['/auth/login', '/auth/forgot-password'];

export async function SessionHandler(route: string) {
	return validate(route);
}

function validate(route: string) {
	const isANoSessionRoute: boolean = noSession.some(path => route.startsWith(path));
	const isSessionActive: boolean = session.isLogged;

	if (!isSessionActive && !isANoSessionRoute) return { pathname: '/auth/login' };
	if (isSessionActive && isANoSessionRoute) return { pathname: '/' };

	return { pathname: route };
}
