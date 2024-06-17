import React from 'react';
import { INotificationHistory, NotificationHistoryStatus } from '@essential-js/admin/models';

interface IProps extends INotificationHistory {
	index: number;
}

export const Notification = (props: IProps) => {
	const isNew = props.status === NotificationHistoryStatus.Sent;

	return (
		<li className="item">
			<div className="readable">
				<h6>{props.notification.title}</h6>
				<p>{props.notification.description}</p>
			</div>
			{isNew && <span className="new"></span>}
		</li>
	);
};
