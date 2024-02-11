import React from 'react';
import { IRow } from '@essential-js/admin/components/list-view';
import { v4 as uuid } from 'uuid';
import { Button } from 'pragmate-ui/components';
import { useNotificationsListContext } from '../context';
import { routing } from '@beyond-js/kernel/routing';

export const Row = ({ propertiesToDisplay, item, ...props }: IRow) => {
	const { texts, store } = useNotificationsListContext();
	const output = propertiesToDisplay.map((property: string) => {
		const value = item[property];
		return (
			<span className="field" key={uuid()}>
				{value}
			</span>
		);
	});

	const onLaunch = () => store.launchNotification(item.id);
	const onEdit = () => routing.pushState(`/notifications/managment/${item.id}`);
	const onStartJob = () => store.startJob(item.id);

	return (
		<li className="row">
			{output}
			<div className="actions">
				<span className="actions-container field">
					<div className="row-actions">
						<Button onClick={onEdit} title={texts.list.actions.item.edit}>
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
						<Button onClick={onLaunch} title={texts.list.actions.item.launch}>
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
						{/* <Button onClick={onLaunch} title={texts.list.actions.item.startJob}>
							<svg width="15" height="15" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M3.24182 2.32181C3.3919 2.23132 3.5784 2.22601 3.73338 2.30781L12.7334 7.05781C12.8974 7.14436 13 7.31457 13 7.5C13 7.68543 12.8974 7.85564 12.7334 7.94219L3.73338 12.6922C3.5784 12.774 3.3919 12.7687 3.24182 12.6782C3.09175 12.5877 3 12.4252 3 12.25V2.75C3 2.57476 3.09175 2.4123 3.24182 2.32181ZM4 3.57925V11.4207L11.4288 7.5L4 3.57925Z"
									fillRule="evenodd"
									clipRule="evenodd"></path>
							</svg>
						</Button> */}
					</div>
				</span>
			</div>
		</li>
	);
};
