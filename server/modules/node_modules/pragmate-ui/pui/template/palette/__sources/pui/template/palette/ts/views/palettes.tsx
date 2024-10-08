import React from 'react';
import { TplManager } from 'pragmate-ui/template/manager';
import type { StoreManager } from '../store';
import { Palette } from './palette';
import { NeutralPalette } from './neutral-pallete';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';

interface PaletteComponentProps {
	property: string;
	store: StoreManager;
}
globalThis.tplManager = TplManager;

export const Palettes: React.FC<PaletteComponentProps> = ({ store }) => {
	useBinder([TplManager], () => {
		const surfaces = Object.keys(TplManager.root).filter(name => name.includes('surface'));
		console.log('TplManager updated', TplManager.root.surface);
	});
	const output = store.properties.map((tone, i) => {
		return <Palette key={`${tone}.${i}`} property={tone} store={store} />;
	});
	const output2 = store.tones.map((tone, i) => {
		return <NeutralPalette key={`${tone}.${i}`} property={tone} store={store} />;
	});

	return (
		<>
			{output} {output2}
		</>
	);
};
