import React from 'react';
import { INotification } from '@essential-js/admin/notifications';
import { v4 as uuid } from 'uuid';
import { Notification } from './item';
import { NotificationEmpty } from './empty';

interface IProps {
	items: INotification[];
}

export const NotificationList = ({ items }: IProps) => {
	const output = items.map((item, index: number) => <Notification index={index} key={uuid()} {...item} />);

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
