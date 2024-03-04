import type { IWidgetStore } from '@beyond-js/widgets/controller';
import { TplManager } from 'pragmate-ui/template/manager';
import { generatePalette } from './calculator';
globalThis.TplManager = TplManager;
type TColorInput = string | [number, number, number]; // Puede ser un string hexadecimal o un array RGB
type TRGB = [number, number, number];

export class StoreManager {
	#values: TColorInput | TRGB[];
	get values() {
		return this.#values;
	}
	#properties = ['primary', 'secondary', 'tertiary', 'error', 'success', 'warning', 'error'];

	get properties() {
		return this.#properties;
	}
	#tones = ['neutral'];
	get tones() {
		return this.#tones;
	}
	#colors = new Map();
	get colors() {
		return this.#colors;
	}
	get items() {
		return [...this.colors.entries()];
	}
	constructor() {
		this.properties.forEach((property, index) => {
			this.#colors.set(property, generatePalette(TplManager.root[property]));
		});
	}
}
