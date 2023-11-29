export class PipeLine {
	#pathname;
	get pathname() {
		return this.#parent?.pathname;
	}

	#data;
	get data() {
		return this.#parent?.data;
	}

	#parent;

	#handlers: Function[] = [];
	constructor(handlers: Function[]) {
		this.#parent = parent;
		this.#handlers = handlers;
	}

	validate = async (path): Promise<{ pathname: string }> => {
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
