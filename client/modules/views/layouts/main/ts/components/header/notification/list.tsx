import React from 'react';
import { NotificationHistory } from '@essential-js/admin/models';
import { v4 as uuid } from 'uuid';
import { Notification } from './item';
import { NotificationEmpty } from './empty';

interface IProps {
	items: NotificationHistory[];
}

export const NotificationList = ({ items }: IProps) => {
	const output = items.map((item) => <Notification key={uuid()} item={item} />);

	const content = output.length ? output : <NotificationEmpty />;
	return (
		<div className="list-container">
			<header>
				<h4>Notifications</h4>
			</header>
			<ul className="notification-list">{content}</ul>
		</div>
	);
};
