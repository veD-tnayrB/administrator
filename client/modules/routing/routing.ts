import { routing } from '@beyond-js/kernel/routing';
import { Router } from './controller/controller.index';

const router = new Router();
routing.redirect = async function redirect(uri): Promise<string> {
	const response: { pathname: string } = await router.load(uri.pathname);

	return response.pathname;
};

// routing.missing = async (pathname: String) => {
// 	let error404: boolean = false;
// 	if (error404) return;
// 	error404 = true;
// 	return "surveys-page";
// };
