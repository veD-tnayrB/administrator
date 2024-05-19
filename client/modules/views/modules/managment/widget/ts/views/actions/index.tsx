import React from 'react';
import type { IAction } from '@essential-js/admin/models';
import {
	CollapsibleContainer,
	CollapsibleHeader,
	CollapsibleContent,
} from '@essential-js/admin/components/collapsible';
import { Button } from 'pragmate-ui/components';
import { ActionItem } from './item';
import { ActionManagment } from './managment';
import { useModulesManagmentContext } from '../../context';
import { v4 as uuid } from 'uuid';

export const Actions = () => {
	const { store, item } = useModulesManagmentContext();
	const actions: IAction[] = item.actions


	const onAdd = () => {
		store.selectedAction = { id: uuid(), description: '', name: '', isCreating: true };
	}

	const output = actions.map((action: IAction) => (
		<ActionItem key={action.id} item={action} />
	))

	return (
		<CollapsibleContainer>
			<CollapsibleHeader>
				<h3>Actions</h3>
			</CollapsibleHeader>
			<CollapsibleContent>

				<div className="flex justify-between items-center">
					<h3>Configure the module actions</h3>
					<Button onClick={onAdd} variant="primary" className="px-2" title="Add">
						<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" stroke="var(--on-primary)" viewBox="0 0 24 24" strokeWidth="1.5">
							<path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
						</svg>
					</Button>
				</div>
				<ActionManagment />
				<ul className="flex flex-col gap-4">
					{output}
				</ul>
			</CollapsibleContent>
		</CollapsibleContainer>

	)
}
