import React from 'react';
import { Dialog } from '@essential-js/admin/components/dialog';
import { ColumnSelectorToggler } from './column-selector-toggler';

export interface IColumnSelector {}

export const ColumnsSelector = () => {
	const options = {
		toggler: {
			children: <ColumnSelectorToggler />,
		},
	};

	return (
		<div className="column-selector">
			<Dialog {...options}>
				<ul>
					<li>a</li>
					<li>b</li>
					<li>C</li>
					<li>C</li>
					<li>C</li>
					<li>f</li>
					<li>g</li>
					<li>h</li>
					<li>i</li>
					<li>j</li>
					<li>k</li>
				</ul>
			</Dialog>
		</div>
	);
};
