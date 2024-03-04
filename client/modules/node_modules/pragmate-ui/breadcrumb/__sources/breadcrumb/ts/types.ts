import React from 'react';

export interface IProps extends React.AllHTMLAttributes<HTMLDivElement> {
	items: [string, string];
	border?: string;
	separator: string;
}

export interface IItem {
	link: string;
	label: string | number;
	currentRouting: string;
	separator: string;
	total: number;
	index: number;
}
