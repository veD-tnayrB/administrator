import React from 'react';
import { RegisteredUsersWidgetManager } from './registered-users.dashboard.manager';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { Bar } from 'react-chartjs-2';
import { Chart, LinearScale, BarElement, CategoryScale, Title, Tooltip, Legend } from 'chart.js';
import { motion } from 'framer-motion';
import { YearHandler } from './year-handler';
import { RegisteredUsersEmpty } from './registered-users-empty.dashboard';

Chart.register(LinearScale, BarElement, CategoryScale, Title, Tooltip, Legend);

const manager = new RegisteredUsersWidgetManager();

export /*bundle*/ const RegisteredUsersWidget = () => {
	const [data, setData] = React.useState(manager.data);
	useBinder([manager], () => setData(manager.data));

	React.useEffect(() => {
		manager.load();
	}, []);

	const primary = getComputedStyle(document.documentElement).getPropertyValue('--primary');
	const secondary = getComputedStyle(document.documentElement).getPropertyValue('--primary-10');
	const tertiary = getComputedStyle(document.documentElement).getPropertyValue('--primary-70');
	const quaternary = getComputedStyle(document.documentElement).getPropertyValue('--secondary');
	const quinary = getComputedStyle(document.documentElement).getPropertyValue('--secondary-10');

	const values = data.map((item) => item.value);
	const labels = data.map((item) => item.label);

	const chart = {
		labels,
		datasets: [
			{
				label: 'Registered Users',
				data: values,
				backgroundColor: [primary, secondary, tertiary, quaternary, quinary],
			},
		],
	};

	const options = {
		scales: {
			y: {
				beginAtZero: true,
			},
		},
	};

	const animation = {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
	};

	const content = values.every((val) => val === 0) ? (
		<RegisteredUsersEmpty />
	) : (
		<Bar data={chart} options={options} />
	);

	return (
		<div className="registered-users-widget">
			<motion.section {...animation} className="container">
				<h3 className="text-center">Registered Users</h3>
				<YearHandler manager={manager} />
				{content}
			</motion.section>
		</div>
	);
};
