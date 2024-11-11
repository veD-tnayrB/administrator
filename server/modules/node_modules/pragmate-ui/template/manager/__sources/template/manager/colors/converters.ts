export function hexToRgb(hex: string): { r: number; g: number; b: number } {
	// Remove the '#' symbol if present
	hex = hex.replace(/^#/, '');

	// Convert the hexadecimal values to decimal
	const bigint = parseInt(hex, 16);

	// Extract the RGB components
	const r = (bigint >> 16) & 255;
	const g = (bigint >> 8) & 255;
	const b = bigint & 255;

	return { r, g, b };
}

export function rgbToHex(r: number, g: number, b: number): string {
	return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

export /*bundle */ function hslToHex(h, s, l) {
	l /= 100;
	const a = (s * Math.min(l, 1 - l)) / 100;
	const f = n => {
		const k = (n + h / 30) % 12;
		const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
		return Math.round(255 * color)
			.toString(16)
			.padStart(2, '0'); // convert to Hex and prefix "0" if needed
	};
	return `#${f(0)}${f(8)}${f(4)}`;
}
