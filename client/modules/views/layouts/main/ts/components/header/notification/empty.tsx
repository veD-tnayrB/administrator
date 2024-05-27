import React from 'react';

export const NotificationEmpty = () => {
	return (
		<div className="empty">
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
				className="lucide lucide-message-circle-warning"
			>
				<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
				<path d="M12 8v4" />
				<path d="M12 16h.01" />
			</svg>

			<h5>You have not received any notification so far</h5>
		</div>
	);
};
