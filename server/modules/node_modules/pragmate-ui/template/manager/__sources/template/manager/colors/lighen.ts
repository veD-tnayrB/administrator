import { hexToRgb, rgbToHex } from './converters';

export function lightenHexColor(hex: string, percentage: number): string {
	const { r, g, b } = hexToRgb(hex);

	const lightenAmount = Math.floor(255 * (percentage / 100));

	const newR = Math.min(255, r + lightenAmount);
	const newG = Math.min(255, g + lightenAmount);
	const newB = Math.min(255, b + lightenAmount);

	return rgbToHex(newR, newG, newB);
}
