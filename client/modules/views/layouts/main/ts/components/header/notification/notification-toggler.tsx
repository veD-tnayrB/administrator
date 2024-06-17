import React from 'react';
import { notificationsHandler } from '@essential-js/admin/notifications';
import { NotificationHistoryStatus, INotificationHistory } from '@essential-js/admin/models';
import { session } from '@essential-js/admin/auth';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';

interface IProps {
	hasBeenRead: boolean;
	setHasBeenRead: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NotificationToggler = ({ hasBeenRead, setHasBeenRead }: IProps) => {
	const cls = hasBeenRead ? '' : 'unread';
	const [items, setItems] = React.useState(notificationsHandler.items || []);
	useBinder([notificationsHandler], () => {
		setItems(notificationsHandler.items);
	});
	const unread = items.filter((item: INotificationHistory) => item.status === NotificationHistoryStatus.Sent);
	const onOpen = () => {
		setHasBeenRead(true);

		if (!notificationsHandler.token) notificationsHandler.init();

		const ids = unread.map((item: INotificationHistory) => item.id);
		// extra time to see the new notifications
		if (unread.length) {
			setTimeout(() => {
				notificationsHandler.markAsRead({ userId: session.user.id, ids });
			}, 5000);
		}
	};
	return (
		<div onClick={onOpen} className={`notification-toggler ${cls}`}>
			{unread.length > 0 && <div className="read-indicator"></div>}
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
				className="lucide lucide-bell"
			>
				<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
				<path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
			</svg>
		</div>
	);
};
