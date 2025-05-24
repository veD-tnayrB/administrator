import { CurrentTexts } from '@beyond-js/kernel/texts';
import { ReactiveModel } from '@beyond-js/reactive/model';

export /*bundle*/ class MultilanguageStore<T, ITexts> extends ReactiveModel<T> {
	get isReady() {
		return this.#texts?.ready && this.ready;
	}
	#texts: CurrentTexts<ITexts>;
	get texts(): ITexts {
		return this.#texts?.value;
	}

	constructor(specifier: string) {
		super();
		if (!specifier) throw 'SPECIFIER_REQUIRED_TO_USE_MULTILANGUAGE_STORE';
		this.#texts = new CurrentTexts(specifier);
		this.#texts.fetch();
		this.#texts.on('change', this.triggerEvent);
		if (this.ready) this.triggerEvent();
	}
}
