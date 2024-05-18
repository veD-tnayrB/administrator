export class PipeLine {

	#handlers: Function[] = [];
	constructor(handlers: Function[]) {
		this.#handlers = handlers;
	}

	validate = async (path: string): Promise<{ pathname: string }> => {
		for (let handler of this.#handlers) {
			if (handler === undefined) continue;
			let response = await handler(path);
			if (response && typeof response === 'object') {
				return response;
				break;
			}
		}

		return { pathname: path };
	};
}
