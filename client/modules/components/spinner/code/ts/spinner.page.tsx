import React from 'react';
import { Spinner } from './spinner.index';
import { Image } from 'pragmate-ui/image';
import config from '@essential-js/admin/config';

interface IProps {
	displayBrand?: boolean;
}

export /*bundle*/ const SpinnerPage = ({ displayBrand }: IProps) => {
	const name = config.params.application.company.name;
	const subName = config.params.application.company.subName;
	const theme = localStorage.getItem('theme');
	const icon = theme === 'dark' ? '/assets/spinner/logo-dark.svg' : '/assets/spinner/logo-light.svg';
	return (
		<div className="essential-spinner-page">
			<div className="flex flex-col items-center justify-center">
				{displayBrand && (
					<div className="flex flex-col items-center justify-center">
						<Image src={icon} className="brand w-16" />
						<h1 className="brand-name">
							{name} <span className="sub-name">{subName}</span>
						</h1>
					</div>
				)}
				{!displayBrand && <Spinner />}
			</div>
		</div>
	);
};
