type ColorInput = string | [number, number, number];
type RGB = [number, number, number];
type HSL = [number, number, number];

const hexToRgb = (hex: string): RGB => {
	const bigint = parseInt(hex.replace('#', ''), 16);
	const r = (bigint >> 16) & 255;
	const g = (bigint >> 8) & 255;
	const b = bigint & 255;
	return [r, g, b];
};

const calcPercentageToBlack = (rgb: RGB): number => {
	return Math.round((Math.min(...rgb) / 255) * 100);
};

const getPalettePosition = (percentageToBlack: number): number => {
	const step = Math.ceil(100 / 14);

	return Math.ceil((100 - percentageToBlack) / step);
};

const rgbToHex = (rgb: [number, number, number]): string => {
	const [r, g, b] = rgb;
	return (
		'#' +
		[r, g, b]
			.map(x => {
				const hex = x.toString(16);
				return hex.length === 1 ? '0' + hex : hex;
			})
			.join('')
	);
};

export const generatePalette = (color: ColorInput): any[] => {
	let rgb: RGB = typeof color === 'string' ? hexToRgb(color) : color;
	const percentageToBlack = calcPercentageToBlack(rgb);
	const position = getPalettePosition(percentageToBlack);
	const palette: any[] = Array.from({ length: 13 }, (_, i) => {
		if (i === 0) return rgbToHex([0, 0, 0]);
		if (i === 12) return rgbToHex([255, 255, 255]);

		const factor = i / 12;

		const calc = (x: number, pos) => {
			let rounded = Math.round(x * factor);
			return rounded > 255 ? 255 : rounded;
		};
		const r = calc(rgb[0], 0);
		const g = calc(rgb[1], 1);
		const b = calc(rgb[2], 2);
		const newTone = [r, g, b];
		const MaxTone = Math.max(...newTone);

		if (i > 3) {
			const multiplier = i < 7 ? (i < 5 ? 1.5 : 2) : 2.4;
			newTone[0] = Math.round(newTone[0] * multiplier) > 255 ? 255 : Math.round(newTone[0] * multiplier);
			newTone[1] = Math.round(newTone[1] * multiplier) > 255 ? 255 : Math.round(newTone[1] * multiplier);
			newTone[2] = Math.round(newTone[2] * multiplier) > 255 ? 255 : Math.round(newTone[2] * multiplier);
		}

		return rgbToHex(newTone as RGB);
	});

	if (position < 12) {
		//palette[position] = rgbToHex(rgb);
	}

	return palette;
};

const rgbToHsl = ([r, g, b]: RGB): HSL => {
	r /= 255;
	g /= 255;
	b /= 255;
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	let h,
		s,
		l = (max + min) / 2;

	if (max === min) {
		h = s = 0;
	} else {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}
		h /= 6;
	}

	return [h * 360, s * 100, l * 100];
};

const hslToHex = (h: number, s: number, l: number): string => {
	l /= 100;
	const a = (s * Math.min(l, 1 - l)) / 100;
	const f = (n: number) => {
		const k = (n + h / 30) % 12;
		const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
		return Math.round(255 * color)
			.toString(16)
			.padStart(2, '0');
	};

	return `#${f(0)}${f(8)}${f(4)}`;
};

const generateHSLPalette = (hsl: HSL): string[] => {
	const [h, s, l] = hsl;
	const step = 100 / 12;
	const palette = [];

	for (let i = 0; i <= 12; i++) {
		let newL = l + (step * i - l);
		newL = Math.min(100, Math.max(0, newL));
		palette.push(hslToHex(h, s, newL));
	}

	return palette;
};

const initialColor: RGB = [255, 165, 0];
const initialHSL = rgbToHsl(initialColor);
const palette = generateHSLPalette(initialHSL);
