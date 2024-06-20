import React from 'react';
import { NotificationHistory, NotificationHistoryStatus } from '@essential-js/admin/models';

interface IProps {
	item: NotificationHistory;
}

export const Notification = ({ item }: IProps) => {
	const isNew = item.status === NotificationHistoryStatus.Sent;

	return (
		<li className="item">
			<div className="readable">
				<h6>{item.notification.title}</h6>
				<p>{item.notification.description}</p>
			</div>
			{isNew && <span className="new"></span>}
		</li>
	);
};
