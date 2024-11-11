import React from 'react';
import { TplManager } from 'pragmate-ui/template/manager';
import { Tooltip } from 'pragmate-ui/tooltip';
import type { StoreManager } from '../store';
interface PaletteComponentProps {
	property: string;
	store: StoreManager;
}
globalThis.tplManager = TplManager;

export const NeutralPalette: React.FC<PaletteComponentProps> = ({ property, store }) => {
	const elements = Object.keys(TplManager.root).filter(i => i.startsWith(property));

	return (
		<>
			<h4>{property}</h4>
			<div className={`palette-container--neutral palette-${property}`}>
				{elements.map((value, index) => {
					const color = TplManager.root[value];
					if (value === '') return null;
					return (
						<div key={`${property}.${value}.${index}`}>
							<h5>{value}</h5>
							<Tooltip key={`${property}.${value}.${index}`} content={color}>
								<div
									className={`palette__color-container color-${value}`}
									data-color={color}
									data-name={value}
									style={{ backgroundColor: color }}
								/>
							</Tooltip>
						</div>
					);
				})}
			</div>
		</>
	);
};
