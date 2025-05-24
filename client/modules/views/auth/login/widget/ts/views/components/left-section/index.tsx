import config from '@essential-js/admin/config';
import { Image } from 'pragmate-ui/image';
import React from 'react';
import { LeftSectionForm } from './form';

export const LeftSection = () => {
	const iconUrl = '/assets/sidebar/logo-dark.svg';
	const name = config.params.application.company.name;

	return (
		<div className="left-section background-section">
			<div className="logo">
				<Image alt={name} src={iconUrl} />
				<span>{name}</span>
			</div>
			<LeftSectionForm />
		</div>
	);
};
