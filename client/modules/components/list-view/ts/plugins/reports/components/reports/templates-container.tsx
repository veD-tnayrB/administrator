import React from 'react';
import { v4 as uuid } from 'uuid';
import { TemplateCSV } from './download-template/template-csv';
import { TemplateExcel } from './download-template/template-excel';
import { DownloadTemplate } from './download-template/download-templates';
import { IActions } from '../../../../components/utility-bar/actions/actions';

export const TemplatesContainer = (props: IActions) => {
	if (!props.reports.downloadTemplate) return;
	const action = props.reports;
	const actions = [];

	const generateAllTemplates = action.downloadTemplate?.excel && action.downloadTemplate?.csv;
	if (action.downloadTemplate?.excel && !action.downloadTemplate?.csv)
		actions.push(<TemplateExcel {...action.downloadTemplate.excel} />);

	if (generateAllTemplates) actions.push(<DownloadTemplate />);
	if (action.downloadTemplate?.csv && !action.downloadTemplate?.excel) actions.push(<TemplateCSV />);

	const output = actions?.map((action) => <div key={uuid()}>{action}</div>);

	return <div className="reports-file-container">{output}</div>;
};
