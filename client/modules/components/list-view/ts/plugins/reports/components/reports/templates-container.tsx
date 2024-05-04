import React from 'react';
import { v4 as uuid } from 'uuid';
import { TemplateCSV } from './download-template/template-csv';
import { TemplateExcel } from './download-template/template-excel';
import { DownloadTemplate } from './download-template/download-templates';
import { IActions } from '../../../../components/utility-bar/actions/actions';

export const TemplatesContainer = (props: IActions) => {
	if (!props.downloadTemplate) return;
	const actions = [];

	const generateAllTemplates = props.downloadTemplate?.excel && props.downloadTemplate?.csv;
	if (props.downloadTemplate?.excel && !props.downloadTemplate?.csv)
		actions.push(<TemplateExcel {...props.downloadTemplate.excel} />);

	if (generateAllTemplates) actions.push(<DownloadTemplate />);
	if (props.downloadTemplate?.csv && !props.downloadTemplate?.excel) actions.push(<TemplateCSV />);

	const output = actions?.map((action) => <div key={uuid()}>{action}</div>);

	return <div className="reports-file-container">{output}</div>;
};
