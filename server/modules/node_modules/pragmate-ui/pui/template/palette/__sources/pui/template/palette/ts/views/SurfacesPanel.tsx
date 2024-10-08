import React from 'react';

import { TplManager } from 'pragmate-ui/template/manager';
console.log(0.1, TplManager);
export function SurfacesPanel() {
	// const surfaces = Object.keys(TplManager.root).filter(name => name.includes('surface'));
	const lightSurfaces: string[] = Array.from(TplManager.light.style).filter((ele: string): boolean =>
		ele.startsWith('--surface')
	) as string[];

	const darkSurfaces: string[] = Array.from(TplManager.dark.style).filter((ele: string): boolean =>
		ele.startsWith('--surface')
	) as string[];
	return (
		<div>
			<h3>Light Surfaces</h3>
			<section className='surface__container surface__container--light'>
				{lightSurfaces.map((surface, i) => {
					return (
						<div
							key={`surface.${surface}.${i}`}
							className='surface__item'
							style={{
								backgroundColor: TplManager.light.style.getPropertyValue(surface),
							}}
						>
							{surface}
						</div>
					);
				})}
			</section>
			<h3>Dark Surfaces</h3>
			<section className='surface__container surface__container--dark'>
				{darkSurfaces.map((surface, i) => {
					return (
						<div
							key={`surface.${surface}.${i}`}
							className='surface__item'
							style={{
								backgroundColor: TplManager.dark.style.getPropertyValue(surface),
							}}
						>
							{surface}
						</div>
					);
				})}
			</section>

			<hr />
		</div>
	);
}
