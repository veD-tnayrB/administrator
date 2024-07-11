import React from 'react';
import { Spinner } from './spinner.index';
import { Image } from 'pragmate-ui/image';
import config from '@essential-js/admin/config';
import { RoundedSpinner } from './spinner.rounded';

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
						<Image alt={name} src={icon} className="brand" />
						<h1 className="brand-name">
							{name} <span className="sub-name">{subName}</span>
						</h1>

						<RoundedSpinner />
					</div>
				)}
				{!displayBrand && <Spinner />}
			</div>
		</div>
	);
};
