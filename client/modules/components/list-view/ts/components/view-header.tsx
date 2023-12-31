import React from 'react';

export interface IViewHeader {
	title: string;
}

export const ViewHeader = ({ title }: IViewHeader) => {
	return (
		<header>
			<h1>{title}</h1>
		</header>
	);
};
