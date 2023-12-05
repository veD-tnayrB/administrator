import React from 'react';
import { RegisteredUsersWidgetManager } from './registered-users.dashboard.manager';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { Bar } from 'react-chartjs-2';
import { Chart, LinearScale, BarElement, CategoryScale, Title, Tooltip, Legend } from 'chart.js';
import { motion } from 'framer-motion';

Chart.register(LinearScale, BarElement, CategoryScale, Title, Tooltip, Legend);

const manager = new RegisteredUsersWidgetManager();

export const RegisteredUsersWidget = () => {
	const [data, setData] = React.useState(manager.data);
	useBinder([manager], () => setData(manager.data));

	React.useEffect(() => {
		manager.load();
	}, []);

	const primary = getComputedStyle(document.documentElement).getPropertyValue('--chart-1');
	const secondary = getComputedStyle(document.documentElement).getPropertyValue('--chart-2');
	const tertiary = getComputedStyle(document.documentElement).getPropertyValue('--chart-3');
	const quaternary = getComputedStyle(document.documentElement).getPropertyValue('--chart-4');
	const quinary = getComputedStyle(document.documentElement).getPropertyValue('--chart-5');

	const values = data.map(item => item.value);
	const labels = data.map(item => item.label);

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
		initial: { y: -5, opacity: 0 },
		animate: { y: 0, opacity: 1 },
		transition: {
			delay: 2 * 0.5,
			type: 'spring',
			stiffness: 260,
			damping: 20,
		},
	};

	return (
		<motion.section {...animation}>
			<h3 className="text-center">Registered Users</h3>
			<Bar data={chart} options={options} />
		</motion.section>
	);
};
