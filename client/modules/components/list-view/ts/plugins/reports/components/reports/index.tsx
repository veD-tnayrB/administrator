import React from 'react';
import { ReportsContainer } from './reports-container';
import { TemplatesContainer } from './templates-container';
import type { IActions } from '../../../../components/utility-bar/actions/actions';
import { useListViewContext } from '../../../../context';
import { IGenerateReport } from './generate/generate-csv';
import { IImport } from './import/import';
import { ITemplate } from './download-template/template-csv';
import { ImportContainer } from './import-container';

export interface IReports {
	generateReport: {
		excel: IGenerateReport;
		csv: IGenerateReport;
	};
	import: IImport;
	downloadTemplate: {
		excel: ITemplate;
		csv: ITemplate;
	};
}

export const ReportsComponents = (props: IActions) => {
	const { store } = useListViewContext();
	const show = store.initalizedPlugins.get('reports');
	if (!show) return null;
	return (
		<div className="reports-container">
			<ImportContainer {...props} />
			<ReportsContainer {...props} />
			<TemplatesContainer {...props} />
		</div>
	);
};
