import React from 'react';
import { WelcomeIllustration } from './welcome-illustration';
// import PeopleIllustration from './person-ilustration.svg';
import { motion } from 'framer-motion';

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
	const animation = {
		initial: { y: -5, opacity: 0 },
		animate: { y: 0, opacity: 1 },
		transition: {
			delay: 1 * 0.1,
			type: 'spring',
			stiffness: 260,
			damping: 20,
		},
	};

	return (
		<motion.header {...animation}>
			<div>
				<WelcomeIllustration />

				<h2>
					{getGreetings()}, <span>Bryant!</span>
				</h2>
				<p>Have a great {getMoment()}!</p>
			</div>
			{/* <img src={PeopleIllustration} alt="People" className="w-60 absolute end-0 bottom-[-3rem]" /> */}
		</motion.header>
	);
};
