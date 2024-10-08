import { hexToRgb, rgbToHex } from './converters';

export function darkenHexColor(hex: string, percentage: number): string {
	const { r, g, b } = hexToRgb(hex);

	const darkenAmount = Math.floor(255 * (percentage / 100));

	const newR = Math.max(0, r - darkenAmount);
	const newG = Math.max(0, g - darkenAmount);
	const newB = Math.max(0, b - darkenAmount);

	return rgbToHex(newR, newG, newB);
}
