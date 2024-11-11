import React from 'react';
import { TplManager } from 'pragmate-ui/template/manager';
import { Tooltip } from 'pragmate-ui/tooltip';
import type { StoreManager } from '../store';
interface PaletteComponentProps {
	property: string;
	store: StoreManager;
}
globalThis.tplManager = TplManager;

export const Palette: React.FC<PaletteComponentProps> = ({ property, store }) => {
	const values = ['', '0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '95', '98', '100'];

	return (
		<>
			<h4>{property}</h4>
			<div className={`palette-container palette-${property}`}>
				{values.map((value, index) => {
					const color = TplManager.root[`${property}${value}`];
					if (value === '') return null;
					return (
						<Tooltip key={`${property}.${value}.${index}`} content={color}>
							<div
								className={`palette__color-container color-${value}`}
								data-color={color}
								data-name={`${property}${value}`}
								style={{ backgroundColor: color }}
							>
								{value}
							</div>
						</Tooltip>
					);
				})}
			</div>
		</>
	);
};
