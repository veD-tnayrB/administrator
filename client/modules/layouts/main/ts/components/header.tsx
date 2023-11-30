import React from 'react';
import { Image } from 'pragmate-ui/image';
import config from '@essential-js/admin/config';
import { Toggle } from './toggle';

export const SidebarHeader = () => {
	const name = config.params.application.company.name;
	return (
		<header>
			<div className="identifier">
				<div className="logo-container">
					<Image src="/assets/sidebar/logo-dark.svg" className="logo" />
				</div>
				<h1>{name}</h1>
			</div>
		</header>
	);
};
