import React from 'react';
import { Dialog } from '@essential-js/admin/components/dialog';
import { NotificationToggler } from './notification-toggler';
import { notificationsHandler } from '@essential-js/admin/notifications';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { NotificationList } from './list';

export const Notification = () => {
	const [items, setItems] = React.useState(notificationsHandler.items || []);
	const [hasBeenRead, setHasBeenRead] = React.useState(true);

	useBinder([notificationsHandler], () => {
		setItems(notificationsHandler.items);
		setHasBeenRead(false);
	});

	const options = {
		toggler: {
			children: <NotificationToggler hasBeenRead={hasBeenRead} setHasBeenRead={setHasBeenRead} />,
			className: 'dialog-toggler',
			name: 'notifications',
			'aria-label': 'Notifications',
		},
	};
	return (
		<div className="notification">
			<Dialog {...options}>
				<NotificationList items={items} />
			</Dialog>
		</div>
	);
};
