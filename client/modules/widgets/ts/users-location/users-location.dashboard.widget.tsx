import React from 'react';
import { UsersLocationWidgetManager } from './users-location.dashboard.manager';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { PolarArea } from 'react-chartjs-2';
import {
	Chart,
	LinearScale,
	BarElement,
	CategoryScale,
	Title,
	Tooltip,
	Legend,
	ArcElement,
	RadialLinearScale,
} from 'chart.js';
import { motion } from 'framer-motion';

Chart.register(RadialLinearScale, LinearScale, BarElement, CategoryScale, Title, Tooltip, Legend, ArcElement);

const manager = new UsersLocationWidgetManager();

export /*bundle*/ const UsersLocationWidget = () => {
	const [data, setData] = React.useState(manager.data);
	useBinder([manager], () => setData(manager.data));

	React.useEffect(() => {
		manager.load();
	}, []);

	const primary = getComputedStyle(document.documentElement).getPropertyValue('--primary');
	const secondary = getComputedStyle(document.documentElement).getPropertyValue('--primary-10');
	const quaternary = getComputedStyle(document.documentElement).getPropertyValue('--secondary');
	const quinary = getComputedStyle(document.documentElement).getPropertyValue('--secondary-10');

	const values = data.map((item) => item.value);
	const labels = data.map((item) => item.label);

	const chart = {
		labels,
		datasets: [
			{
				data: values,
				backgroundColor: [primary, secondary, quaternary, quinary],
				border: false,
			},
		],
	};

	const options = {
		scales: {
			y: {
				beginAtZero: true,
			},
		},
		borderWidth: 0,
	};

	const animation = {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
	};

	return (
		<div className="online-users-widget">
			<motion.section {...animation}>
				<h3>Users Location</h3>
				<div className="graph">
					<PolarArea data={chart} options={options} />
				</div>
			</motion.section>
		</div>
	);
};
