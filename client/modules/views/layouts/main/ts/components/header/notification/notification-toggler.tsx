import React from 'react';

interface IProps {
	hasBeenRead: boolean;
	setHasBeenRead: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NotificationToggler = ({ hasBeenRead, setHasBeenRead }: IProps) => {
	const cls = hasBeenRead ? '' : 'unread';

	const onOpen = () => {
		setHasBeenRead(true);
	};
	return (
		<div onClick={onOpen} className={`notification-toggler ${cls}`}>
			<div className="read-indicator"></div>
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
