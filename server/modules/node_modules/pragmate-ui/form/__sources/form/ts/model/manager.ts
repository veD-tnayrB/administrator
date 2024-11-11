export class SelectorManager {
	static #instance;

	#selector;
	get selector() {
		return this.#selector;
	}
	constructor(selector) {}

	validate() {}
	static get(selector) {
		if (!this.#instance) {
			this.#instance = new SelectorManager(selector);
		}
		return this.#instance;
	}
}
