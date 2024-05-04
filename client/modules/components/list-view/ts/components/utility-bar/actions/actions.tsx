import React from 'react';
import { v4 as uuid } from 'uuid';
import { CreateAction, ICreateAction } from './pre-done/create';
import { ColumnsSelector, IColumnSelector } from './pre-done/column-selector/column-selector';
import { ReportsComponents } from '../../../plugins/reports/components/reports';
import type { IGenerateReport } from '../../../plugins/reports/components/reports/generate/generate-csv';
import type { IImport } from '../../../plugins/reports/components/reports/import/import';
import type { ITemplate } from '../../../plugins/reports/components/reports/download-template/template-csv';

export type IActionsItems = React.ReactNode[];

export interface IActions {
	customs?: IActionsItems;
	create?: ICreateAction;
	columnsSelector: IColumnSelector;
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

export const ActionsContainer = (props: IActions) => {
	const actions = props.customs || [];
	if (props.columnsSelector) actions.push(<ColumnsSelector {...props.columnsSelector} />);
	if (props.create) actions.unshift(<CreateAction {...props.create} />);

	const output = actions?.map((action) => <div key={uuid()}>{action}</div>);
	return (
		<div className="actions-container">
			{output}

			<ReportsComponents {...props} />
		</div>
	);
};
