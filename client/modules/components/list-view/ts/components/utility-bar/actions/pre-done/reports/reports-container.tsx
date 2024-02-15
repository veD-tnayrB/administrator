import React from 'react';
import { IActions } from '../../actions';
import { GenerateExcel } from './generate-excel';
import { v4 as uuid } from 'uuid';
import { GenerateCSV } from './generate-csv';
import { Import } from './import';

export const ReportsContainer = (props: IActions) => {
	if (!props.generateReport) return;
	const actions = [];

	if (props.generateReport?.excel) actions.push(<GenerateExcel {...props.generateReport.excel} />);
	if (props.generateReport?.csv) actions.push(<GenerateCSV {...props.generateReport.excel} />);
	if (props.import) actions.push(<Import {...props.import} />);

	const output = actions?.map(action => <div key={uuid()}>{action}</div>);

	return <div className="reports-container">{output}</div>;
};
