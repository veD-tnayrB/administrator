import React from 'react';
import { Button } from 'pragmate-ui/components';
import { useListViewContext } from '../../../context';
import { BulkRemoveModal } from './bulk-remove-modal';

export interface IHeaderActionButton extends React.HTMLAttributes<HTMLButtonElement> {
	to?: string;
}

export const RemoveAction = () => {
	const { store } = useListViewContext();
	const [modals, setModals] = React.useState({ delete: false });
	const displayCls = !!store.selectedItems.size ? 'show' : '';

	const onToggleDeleteModal = () => setModals({ ...modals, delete: !modals.delete });

	return (
		<li>
			<div className={`actions header-actions ${displayCls}`}>
				<Button onClick={onToggleDeleteModal}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						stroke="currentColor"
						className="lucide lucide-trash-2 icon">
						<path d="M3 6h18" />
						<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
						<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
						<line x1="10" x2="10" y1="11" y2="17" />
						<line x1="14" x2="14" y1="11" y2="17" />
					</svg>
				</Button>
			</div>
			{modals.delete && <BulkRemoveModal onToggleDeleteModal={onToggleDeleteModal} />}
		</li>
	);
};
