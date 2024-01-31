import React from 'react';
import { v4 as uuid } from 'uuid';
import { CreateAction, ICreateAction } from './pre-done/create';
import { ColumnsSelector, IColumnSelector } from './pre-done/column-selector/column-selector';
import { GenerateReport, IGenerateReport } from './pre-done/generate-report';

export type IActionsItems = React.ReactNode[];

export interface IActions {
	customs?: IActionsItems;
	create?: ICreateAction;
	columnsSelector: IColumnSelector;
	generateReport: IGenerateReport;
}

export const ActionsContainer = (props: IActions) => {
	const actions = props.customs || [];
	if (props.create) actions.unshift(<CreateAction {...props.create} />);
	if (props.columnsSelector) actions.push(<ColumnsSelector {...props.columnsSelector} />);
	if (props.generateReport) actions.push(<GenerateReport {...props.generateReport} />);

	const output = actions?.map(action => <div key={uuid()}>{action}</div>);
	return <div className="actions-container">{output}</div>;
};
