import React from 'react';
import { OnlineUsersWidgetManager } from './online-users.dashboard.manager';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { Doughnut } from 'react-chartjs-2';
import { Chart, LinearScale, BarElement, CategoryScale, Title, Tooltip, Legend, ArcElement } from 'chart.js';

Chart.register(LinearScale, BarElement, CategoryScale, Title, Tooltip, Legend, ArcElement);

const manager = new OnlineUsersWidgetManager();

export /*bundle*/ const OnlineUsersWidget = () => {
	const [data, setData] = React.useState(manager.data);
	useBinder([manager], () => setData(manager.data));

	React.useEffect(() => {
		manager.load();
	}, []);

	const primary = getComputedStyle(document.documentElement).getPropertyValue('--primary');
	const secondary = getComputedStyle(document.documentElement).getPropertyValue('--secondary');

	const values = data.map((item) => item.value);
	const labels = data.map((item) => item.label);

	const chart = {
		labels,
		datasets: [
			{
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

	return (
		<div className="online-users-widget">
			<section>
				<h3>Online users</h3>
				<div className="graph">
					<Doughnut data={chart} options={options} />
				</div>
			</section>
		</div>
	);
};
