import React from 'react';
import { v4 as uuid } from 'uuid';
import { GenerateCSV } from './generate/generate-csv';
import { Import } from './import/import';
import { GenerateReports } from './generate/generate-reports';
import { GenerateExcel } from './generate/generate-excel';
import { IActions } from '../../../../components/utility-bar/actions/actions';

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

	const output = actions?.map((action) => <div key={uuid()}>{action}</div>);

	return <div className="reports-file-container">{output}</div>;
};
