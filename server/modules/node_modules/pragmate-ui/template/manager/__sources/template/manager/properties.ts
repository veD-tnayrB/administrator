/*
 Check if the stylesheet is internal or hosted on the current domain.
 If it isn't, attempting to access sheet.cssRules will throw a cross origin error.
 See https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet#Notes
 
 NOTE: One problem this could raise is hosting stylesheets on a CDN with a
 different domain. Those would be cross origin, so you can't access them.
*/
const isSameDomain = (styleSheet: CSSStyleSheet): boolean => {
	// Internal style blocks won't have an href value
	if (!styleSheet.href) {
		return true;
	}

	return styleSheet.href.indexOf(window.location.origin) === 0;
};

/*
   Determine if the given rule is a CSSStyleRule
   See: https://developer.mozilla.org/en-US/docs/Web/API/CSSRule#Type_constants
  */
const isStyleRule = (rule: CSSRule): boolean => rule.type === 1;

/**
 * Get all custom properties on a page
 * @return array<array[string, string]>
 * ex; [["--color-accent", "#b9f500"], ["--color-text", "#252525"], ...]
 */
export /*bundle*/ const getCSSCustomPropIndex = (): Array<[string, string]> => {
	// styleSheets is array-like, so we convert it to an array.
	// Filter out any stylesheets not on this domain
	return Array.from(document.styleSheets)
		.filter(isSameDomain)
		.reduce((finalArr: Array<[string, string]>, sheet: CSSStyleSheet) => {
			// cssRules is array-like, so we convert it to an array
			const ruleProps: Array<[string, string]> = Array.from(sheet.cssRules)
				.filter(isStyleRule)
				.reduce((propValArr: Array<[string, string]>, rule: CSSRule) => {
					const styleRule = rule as CSSStyleRule; // Assert rule as CSSStyleRule
					//@ts-ignore
					const props: Array<[string, string]> = Array.from(styleRule.style)
						.map((propName: string) => [propName.trim(), styleRule.style.getPropertyValue(propName).trim()])
						// Discard any props that don't start with "--". Custom props are required to.
						.filter(([propName]) => propName.startsWith('--'));

					return propValArr.concat(props);
				}, []);

			return finalArr.concat(ruleProps);
		}, []);
};

export const toCamelCase = (str: string): string => {
	return str.replace(/-([a-z0-9])/g, function (_, g1) {
		return /\d/.test(g1) ? g1 : g1.toUpperCase();
	});
};

export const getCSSCustomPropsObject = (): { [key: string]: string } => {
	const index = getCSSCustomPropIndex();
	const obj: { [key: string]: string } = {};

	index.forEach(([propName, value]) => {
		// Remove the leading "--" and convert to camel case
		const camelCasedPropName = toCamelCase(propName.slice(2));
		obj[camelCasedPropName] = value;
	});

	return obj;
};

export const getCSSCustomPropIndexFromStylesheet = (stylesheetHref: string, theme: string): Array<[string, string]> => {
	// Find the specified stylesheet in the document's stylesheets collection
	const stylesheet = Array.from(document.styleSheets).find(sheet => sheet.href.split('?')[0] === stylesheetHref);

	if (!stylesheet) {
		return [];
	}

	const getCustomPropForTheme = (propName: string, theme: string, styleSheet: CSSStyleSheet): string | null => {
		const targetSelector = `:root[data-beyond-mode="${theme}"]`;

		for (const rule of Array.from(styleSheet.cssRules)) {
			if (rule instanceof CSSStyleRule && rule.selectorText === targetSelector) {
				// console.log(121, rule);
				const styleRule = rule as CSSStyleRule;
				const propValue = styleRule.style.getPropertyValue(propName).trim();
				return propValue;
			}
		}

		return null;
	};

	// cssRules is array-like, so we convert it to an array
	const ruleProps: Array<[string, string]> = Array.from(stylesheet.cssRules)
		.filter(isStyleRule)
		.reduce((propValArr: Array<[string, string]>, rule: CSSRule) => {
			const styleRule = rule as CSSStyleRule; // Assert rule as CSSStyleRule
			//@ts-ignore
			const props: Array<[string, string]> = Array.from(styleRule.style)
				.map((propName: string) => {
					// getComputedStyle
					propName = propName.trim();
					// const value = getCustomPropForTheme(propName, theme, stylesheet);
					const value = styleRule.style.getPropertyValue(propName).trim();
					return [propName, value.trim()];
				})
				// Discard any props that don't start with "--". Custom props are required to.
				.filter(([propName]) => propName.startsWith('--'));
			// console.log(100, props);
			return propValArr.concat(props);
		}, []);

	return ruleProps;
};

export const getCSSCustomPropsObjectFromStylesheet = (
	stylesheetHref: string,
	theme: string
): { [key: string]: string; theme: string } => {
	const index = getCSSCustomPropIndexFromStylesheet(stylesheetHref, theme);
	const obj: { [key: string]: string } = {};

	index.forEach(([propName, value]) => {
		// Remove the leading "--" and convert to camel case
		const camelCasedPropName = toCamelCase(propName.slice(2));
		obj[camelCasedPropName] = value;
	});
	//@ts-ignore
	return obj;
};

// const cssCustomPropIndex: Array<[string, string]> = getCSSCustomPropIndex();

// Add the swatches to the DOM
