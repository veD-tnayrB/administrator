import React from 'react';
import { ReportsContainer } from './reports-container';
import { TemplatesContainer } from './templates-container';
import type { IActions } from '../../../../components/utility-bar/actions/actions';

export const ReportsComponents = (props: IActions) => {
	if (!props.generateReport && !props.downloadTemplate) return null;
	return (
		<div className="reports-container">
			<ReportsContainer {...props} />
			<TemplatesContainer {...props} />
		</div>
	);
};
