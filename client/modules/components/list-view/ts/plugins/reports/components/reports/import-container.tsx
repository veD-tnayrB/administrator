import React from 'react';
import { v4 as uuid } from 'uuid';
import { IActions } from '../../../../components/utility-bar/actions/actions';
import { Import } from './import/import';

export const ImportContainer = (props: IActions) => {
	if (!props.reports.import) return null;
	const action = props.reports;
	const actions = [];
	if (action.import) actions.push(<Import {...action.import} />);

	const output = actions?.map((action) => <div key={uuid()}>{action}</div>);

	return <div className="reports-file-container">{output}</div>;
};
