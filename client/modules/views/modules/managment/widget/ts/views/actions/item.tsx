import type { IAction } from '@essential-js/admin/models';
import { Button } from 'pragmate-ui/components';
import React from 'react';
import { useModulesManagmentContext } from '../../context';
import { DeleteModal } from './delete-modal';

interface IProps {
	item: IAction;
}

export const ActionItem = ({ item }: IProps) => {
	const { store } = useModulesManagmentContext();
	const [displayDeleteModal, setDisplayDeleteModal] = React.useState(false);
	const formatedName = item.name.charAt(0).toUpperCase() + item.name.slice(1);

	const onEdit = () => {
		store.selectedAction = item;
	};
	const onToggleDeleteModal = () => setDisplayDeleteModal(!displayDeleteModal);

	return (
		<li className="flex w-full items-center justify-between">
			<div>
				<p className="font-semibold">{formatedName}</p>
				<p>{item.description}</p>
			</div>
			<div className="flex items-center">
				<Button title="Edit" onClick={onEdit} className="px-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="18px"
						height="18px"
						viewBox="0 0 24 24"
						fill="none"
						stroke="var(--on-surface)"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="lucide lucide-pencil-line">
						<path d="M12 20h9" />
						<path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
						<path d="m15 5 3 3" />
					</svg>
				</Button>
			</div>

			{displayDeleteModal && (
				<DeleteModal onToggleDeleteModal={onToggleDeleteModal} id={item.id} name={item.name} />
			)}
		</li>
	);
};
