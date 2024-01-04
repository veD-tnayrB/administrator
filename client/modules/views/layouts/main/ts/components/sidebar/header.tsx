import React from 'react';
import { Image } from 'pragmate-ui/image';
import config from '@essential-js/admin/config';

interface IProps {
	theme: string;
}

export const SidebarHeader = ({ theme }: IProps) => {
	const name = config.params.application.company.name;
	const iconUrl = theme === 'dark' ? '/assets/sidebar/logo-dark.svg' : '/assets/sidebar/logo-light.svg';

	return (
		<header>
			<div className="identifier">
				<div className="logo-container">
					<Image src={iconUrl} className="logo" />
				</div>
				<h1>{name}</h1>
			</div>
		</header>
	);
};
