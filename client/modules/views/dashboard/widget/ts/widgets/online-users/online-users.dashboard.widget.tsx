import React from 'react';
import { OnlineUsersWidgetManager } from './online-users.dashboard.manager';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { Doughnut } from 'react-chartjs-2';
import { Chart, LinearScale, BarElement, CategoryScale, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { motion } from 'framer-motion';

Chart.register(LinearScale, BarElement, CategoryScale, Title, Tooltip, Legend, ArcElement);

const manager = new OnlineUsersWidgetManager();

export const OnlineUsersWidget = () => {
	const [data, setData] = React.useState(manager.data);
	useBinder([manager], () => setData(manager.data));

	React.useEffect(() => {
		manager.load();
	}, []);

	const primary = getComputedStyle(document.documentElement).getPropertyValue('--chart-1');
	const secondary = getComputedStyle(document.documentElement).getPropertyValue('--chart-2');

	const values = data.map(item => item.value);
	const labels = data.map(item => item.label);

	const chart = {
		labels,
		datasets: [
			{
				label: 'Online users',
				data: values,
				backgroundColor: [primary, secondary],
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
			delay: 2 * 0.7,
			type: 'spring',
			stiffness: 260,
			damping: 20,
		},
	};

	return (
		<div className="online-users-widget">
			<motion.section {...animation}>
				<h3>Online users</h3>
				<Doughnut data={chart} options={options} />
			</motion.section>
		</div>
	);
};
