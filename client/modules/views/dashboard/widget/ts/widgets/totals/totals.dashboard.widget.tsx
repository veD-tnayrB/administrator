import React from 'react';
import { TotalsWidgetManager } from './totals.widget.manager';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { TotalItem } from './components/total.item.widget';
import { AnimatePresence } from 'framer-motion';

const manager = new TotalsWidgetManager();

export const TotalsWidget = () => {
	const [data, setData] = React.useState(manager.data);
	useBinder([manager], () => setData(manager.data));

	React.useEffect(() => {
		manager.load();
	}, []);

	const output = data.map((item, index) => <TotalItem key={item.amount} index={index} {...item} />);

	return (
		<section className="totals-widget">
			<AnimatePresence>{output}</AnimatePresence>
		</section>
	);
};
