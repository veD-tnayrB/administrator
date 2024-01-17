import React from 'react';
import { WelcomeIllustration } from './welcome-illustration';
import { motion } from 'framer-motion';
import { session } from '@essential-js/admin/auth';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';

function getGreetings(): string {
	const date = new Date();
	const hour = date.getHours();

	if (hour >= 0 && hour < 12) {
		return 'Buenos días';
	} else if (hour >= 12 && hour < 18) {
		return 'Buenas tardes';
	} else {
		return 'Buenas noches';
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

export const WelcomeWidget = () => {
	const [names, setNames] = React.useState(session.user.names);
	useBinder([session], () => setNames(session.user.names));

	const animation = {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
	};

	return (
		<motion.header {...animation} className="welcome-widget">
			<WelcomeIllustration />
			<h2>
				{getGreetings()}, <span>{names}!</span>
			</h2>
			<p>Have a great {getMoment()}!</p>
		</motion.header>
	);
};
