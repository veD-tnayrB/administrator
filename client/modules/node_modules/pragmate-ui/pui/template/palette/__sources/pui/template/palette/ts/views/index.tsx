import React from 'react';
import { Palettes } from './palettes';
import { SurfacesPanel } from './SurfacesPanel';
import { Button, ButtonGroup } from 'pragmate-ui/components';
import { ThemeSwitcher } from 'pragmate-ui/theme-switcher';

export /*bundle*/
function View({ store }) {
	const [view, setView] = React.useState('palettes');

	const Views = {
		palettes: Palettes,
		surfaces: SurfacesPanel,
	};

	const onClick = event => {
		event.preventDefault();
		setView(event.currentTarget.dataset.view);
	};
	const Control = Views[view];

	return (
		<main className='component__container'>
			<h2>Template tones</h2>

			<div className='contents'>
				<ButtonGroup selected={0}>
					<Button onClick={onClick} variant='primary' data-view='palettes'>
						Palettes
					</Button>
					<Button onClick={onClick} variant='primary' data-view='surfaces'>
						Surfaces
					</Button>
				</ButtonGroup>

				<ThemeSwitcher />
			</div>

			<Control store={store} />
		</main>
	);
}
