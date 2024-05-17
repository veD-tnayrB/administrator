
import { SessionHandler } from "./handlers/session";
import { PipeLine } from "./pipeline";
export class Router {
	#pathname: string = '';
	get pathname() {
		return this.#pathname;
	}
	#pipeline: PipeLine;
	constructor() {
		this.#pipeline = new PipeLine([SessionHandler]);
	}

	load = async (pathname: string): Promise<{ pathname: any }> => {
		return await this.#pipeline.validate(pathname);
	};
}
