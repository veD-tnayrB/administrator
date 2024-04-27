import React from 'react';
import { IRow } from '@essential-js/admin/components/list-view';
import { v4 as uuid } from 'uuid';
import { Button } from 'pragmate-ui/components';
import { useNotificationsListContext } from '../context';
import { routing } from '@beyond-js/kernel/routing';

export const Row = ({ propertiesToDisplay, item }: IRow) => {
	const { store } = useNotificationsListContext();
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

	const onLaunch = () => store.launchNotification(item.id);
	const onEdit = () => routing.pushState(`/notifications/managment/${item.id}`);

	return (
		<li className="row">
			{output}
			<span className="actions actions-container field">
				<div className="row-actions">
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
							className="lucide lucide-pencil-line">
							<path d="M12 20h9" />
							<path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
							<path d="m15 5 3 3" />
						</svg>
					</Button>
					<Button onClick={onLaunch} title="Launch">
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
							className="lucide lucide-arrow-up-right-from-square">
							<path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
							<path d="m21 3-9 9" />
							<path d="M15 3h6v6" />
						</svg>
					</Button>
				</div>
			</span>
		</li>
	);
};
