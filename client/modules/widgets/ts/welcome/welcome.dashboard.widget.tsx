import React from 'react';
import { WelcomeIllustration } from './welcome-illustration';
import { session } from '@essential-js/admin/auth';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';

function getGreetings(): string {
	const date = new Date();
	const hour = date.getHours();

	if (hour >= 0 && hour < 12) {
		return 'Good morning';
	} else if (hour >= 12 && hour < 18) {
		return 'Good afternoon';
	} else {
		return 'Good night';
	}
}

function getMoment(): string {
	const date = new Date();
	const hour = date.getHours();

	if (hour >= 0 && hour < 12) {
		return 'day';
	} else if (hour >= 12 && hour < 18) {
		return 'afternoon';
	} else {
		return 'night';
	}
}

export /*bundle*/ const WelcomeWidget = () => {
	const [names, setNames] = React.useState(session.user.names);
	useBinder([session], () => setNames(session.user.names));

	return (
		<header className="welcome-widget">
			<WelcomeIllustration />
			<h2>
				{getGreetings()}, <span>{names}!</span>
			</h2>
			<p>Have a great {getMoment()}!</p>
		</header>
	);
};
