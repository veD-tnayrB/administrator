import React from 'react';
import { IRow } from '@essential-js/admin/components/list-view';
import { v4 as uuid } from 'uuid';
import { Button } from 'pragmate-ui/components';
import { useNotificationsListContext } from '../context';

export const Row = ({ propertiesToDisplay, item }: IRow) => {
	const { texts, store } = useNotificationsListContext();
	const output = propertiesToDisplay.map((property: string) => {
		const value = item[property];
		return <span key={uuid()}>{value}</span>;
	});

	const onLaunch = () => {
		store.launchNotification(item.id);
	};

	return (
		<li className="row">
			{output}
			<div className="actions">
				<span className="actions-container">
					<div className="row-actions">
						<Button title={texts.list.actions.item.edit}>
							<svg width="15" height="15" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z"
									fillRule="evenodd"
									clipRule="evenodd"></path>
							</svg>
						</Button>
						<Button onClick={onLaunch} title={texts.list.actions.item.launch}>
							<svg width="15" height="15" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M12 13C12.5523 13 13 12.5523 13 12V3C13 2.44771 12.5523 2 12 2H3C2.44771 2 2 2.44771 2 3V6.5C2 6.77614 2.22386 7 2.5 7C2.77614 7 3 6.77614 3 6.5V3H12V12H8.5C8.22386 12 8 12.2239 8 12.5C8 12.7761 8.22386 13 8.5 13H12ZM9 6.5C9 6.5001 9 6.50021 9 6.50031V6.50035V9.5C9 9.77614 8.77614 10 8.5 10C8.22386 10 8 9.77614 8 9.5V7.70711L2.85355 12.8536C2.65829 13.0488 2.34171 13.0488 2.14645 12.8536C1.95118 12.6583 1.95118 12.3417 2.14645 12.1464L7.29289 7H5.5C5.22386 7 5 6.77614 5 6.5C5 6.22386 5.22386 6 5.5 6H8.5C8.56779 6 8.63244 6.01349 8.69139 6.03794C8.74949 6.06198 8.80398 6.09744 8.85143 6.14433C8.94251 6.23434 8.9992 6.35909 8.99999 6.49708L8.99999 6.49738"></path>
							</svg>
						</Button>
					</div>
				</span>
			</div>
		</li>
	);
};
