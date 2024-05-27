import React from 'react';
import { Profile } from './profile/index.profile';
import { Notification } from './notification/index.notification.header';

export const Header = () => {
	return (
		<header className="main-layout-header">
			<Notification />
			<Profile />
		</header>
	);
};
