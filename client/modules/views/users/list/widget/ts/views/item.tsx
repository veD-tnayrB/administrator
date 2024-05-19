import React from 'react';
import { IRow, useListViewContext } from '@essential-js/admin/components/list-view';
import { v4 as uuid } from 'uuid';
import { Button } from 'pragmate-ui/components';
import { routing } from '@beyond-js/kernel/routing';
import { DeleteModal } from './delete-modal';
import { useUsersListContext } from '../context';
import { Checkbox } from 'pragmate-ui/form';

export const Row = ({ propertiesToDisplay, item, selectedItems }: IRow) => {
	const { list, store } = useListViewContext();
	const { permissions } = useUsersListContext();
	const [displayDeleteModal, setDisplayModal] = React.useState(false);

	const output = propertiesToDisplay.map((property: string) => {
		let value = item[property];

		if (property === 'timeCreated' || property === 'timeUpdated') {
			value = new Date(value).toLocaleString().split(',')[0];
		}
		return (
			<span className="field" key={uuid()}>
				{value}
			</span>
		);
	});

	const onCloseDelete = (event: React.MouseEvent) => {
		event.stopPropagation();
		setDisplayModal(false);
	};

	const onSelect = () => {
		if (list.isSelecteable) store.selectItem({ id: item.id });
	};

	const onEdit = () => routing.pushState(`/users/managment/${item.id}`);

	const displayEdit = permissions.has('users.update');
	const isItemSelected = selectedItems?.has(item.id);

	return (
		<li className="row">
			<span className="check-item field">
				<Checkbox checked={isItemSelected} onChange={onSelect} id={item.id} />
			</span>

			{output}
			<span className="actions actions-container field">
				<div className="row-actions">
					{displayEdit && (
						<Button onClick={onEdit} title="Edit">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="lucide lucide-pencil-line"
							>
								<path d="M12 20h9" />
								<path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
								<path d="m15 5 3 3" />
							</svg>
						</Button>
					)}
				</div>
			</span>
			{displayDeleteModal && <DeleteModal onClose={onCloseDelete} id={item.id} />}
		</li>
	);
};
