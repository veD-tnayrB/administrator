import {
	CollapsibleContainer,
	CollapsibleContent,
	CollapsibleHeader,
} from '@essential-js/admin/components/collapsible';
import type { IAction } from '@essential-js/admin/models';
import { Button } from 'pragmate-ui/components';
import React from 'react';
import { v4 as uuid } from 'uuid';
import { useModulesManagmentContext } from '../../context';
import { EmptyActions } from './empty';
import { ActionItem } from './item';
import { ActionManagment } from './managment';

export const Actions = () => {
	const { store, item } = useModulesManagmentContext();
	const actions: IAction[] = item.actions;

	const onAdd = () => {
		store.selectedAction = { id: uuid(), description: '', name: '', isCreating: true };
	};

	const output = actions.map((action: IAction) => <ActionItem key={action.id} item={action} />);

	const content = actions.length ? <ul className="flex flex-col gap-4">{output}</ul> : <EmptyActions />;
	return (
		<CollapsibleContainer>
			<CollapsibleHeader>
				<h2>Actions</h2>
			</CollapsibleHeader>
			<CollapsibleContent>
				<div className="flex justify-between items-center">
					<h3>Configure the module actions</h3>
					<Button onClick={onAdd} variant="primary" className="px-2" title="Add">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20px"
							height="20px"
							stroke="var(--on-primary)"
							viewBox="0 0 24 24"
							strokeWidth="1.5">
							<path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
						</svg>
					</Button>
				</div>
				<ActionManagment />
				{content}
			</CollapsibleContent>
		</CollapsibleContainer>
	);
};
