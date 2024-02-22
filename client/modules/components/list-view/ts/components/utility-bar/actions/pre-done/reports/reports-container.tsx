import React from 'react';
import { IActions } from '../../actions';
import { v4 as uuid } from 'uuid';
import { GenerateCSV } from './generate-csv';
import { Import } from './import';
import { GenerateReports } from './generate-reports';
import { GenerateExcel } from './generate-excel';

export const ReportsContainer = (props: IActions) => {
	if (!props.generateReport) return;
	const actions = [];

	const generateAllReports = props.generateReport?.excel && props.generateReport?.csv;
	if (props.generateReport?.excel && !props.generateReport?.csv)
		actions.push(<GenerateExcel {...props.generateReport.excel} />);
	if (generateAllReports) actions.push(<GenerateReports />);
	if (props.generateReport?.csv && !props.generateReport?.excel)
		actions.push(<GenerateCSV {...props.generateReport.excel} />);
	if (props.import) actions.push(<Import {...props.import} />);

	const output = actions?.map(action => <div key={uuid()}>{action}</div>);

	return <div className="reports-container">{output}</div>;
};
