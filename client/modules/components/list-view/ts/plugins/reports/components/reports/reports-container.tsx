import React from 'react';
import { v4 as uuid } from 'uuid';
import { GenerateCSV } from './generate/generate-csv';
import { GenerateReports } from './generate/generate-reports';
import { GenerateExcel } from './generate/generate-excel';
import { IActions } from '../../../../components/utility-bar/actions/actions';

export const ReportsContainer = (props: IActions) => {
	const action = props.reports;
	if (!props.reports.generateReport) return null;
	const actions = [];

	const generateAllReports = action.generateReport?.excel && action.generateReport?.csv;
	if (action.generateReport?.excel && !action.generateReport?.csv)
		actions.push(<GenerateExcel {...action.generateReport.excel} />);
	if (generateAllReports) actions.push(<GenerateReports />);
	if (action.generateReport?.csv && !action.generateReport?.excel)
		actions.push(<GenerateCSV {...action.generateReport.excel} />);

	const output = actions?.map((action) => <div key={uuid()}>{action}</div>);

	return <div className="reports-file-container">{output}</div>;
};
