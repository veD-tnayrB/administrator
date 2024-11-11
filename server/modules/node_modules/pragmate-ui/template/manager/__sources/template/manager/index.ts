import { ReactiveModel } from '@beyond-js/reactive/model';
import { getCSSCustomPropIndex, getCSSCustomPropsObject, getCSSCustomPropsObjectFromStylesheet } from './properties';
export class TemplateManager extends ReactiveModel<TemplateManager> {
	#root;
	get root() {
		return this.#root;
	}
	#rootSelector;
	#theme;
	#stylesheet: CSSStyleSheet;
	#dark: CSSStyleRule;
	get dark() {
		return this.#dark;
	}
	#light: CSSStyleRule;
	get light() {
		return this.#light;
	}

	constructor() {
		super();

		this.#rootSelector = document.querySelector('html');
		this.#theme = this.#rootSelector.dataset.beyondMode ?? 'light';
		const properties = this.getCustomProperties(this.#theme);
		this.#root = properties;
		this.initialise();
	}

	getCustomProperties(theme) {
		const stylesheetHref = new URL('./styles.css', window.location.origin).href;

		const cssPropsObject = getCSSCustomPropsObjectFromStylesheet(stylesheetHref, theme);

		return cssPropsObject;
	}

	#getProperties() {
		const stylesheetHref = new URL('./styles.css', window.location.origin).href;
		const stylesheet: CSSStyleSheet = Array.from(document.styleSheets).find(
			sheet => sheet.href.split('?')[0] === stylesheetHref
		);
		const rules = Array.from(stylesheet.cssRules);
		const filter = (rule, property): boolean => rule instanceof CSSStyleRule && rule.selectorText === property;

		this.#dark = rules.find(rule => filter(rule, ':root[data-beyond-mode="dark"]')) as CSSStyleRule;
		this.#light = rules.find(rule => filter(rule, ':root[data-beyond-mode="light"]')) as CSSStyleRule;

		this.#stylesheet = stylesheet;
	}
	initialise() {
		this.#getProperties();
		const observe = new MutationObserver(mutations => {
			mutations.forEach(mutation => {
				if (mutation.type === 'attributes' && mutation.attributeName === 'data-beyond-mode') {
					this.#theme = this.#rootSelector.dataset.beyondMode ?? 'light';
					this.#getProperties();
					this.#root = this.getCustomProperties(this.#theme);
					this.trigger('change');
				}
			});
		});
		observe.observe(this.#rootSelector, { attributes: true });
	}
}

export /*bundle */ const TplManager = new TemplateManager();
