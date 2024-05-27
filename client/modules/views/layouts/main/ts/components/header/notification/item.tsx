import React from 'react';
import { INotification } from '@essential-js/admin/notifications';

interface IProps extends INotification {
	index: number;
}

export const Notification = (props: INotification) => {
	return (
		<li className="item">
			<h6>{props.title}</h6>
			<p>{props.body}</p>
		</li>
	);
};
