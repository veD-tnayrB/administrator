import React from 'react';
import { Day } from './day';

interface IProps {
	generalAgrouper: string;
	days: Record<string, string[]>;
}

export const Month = ({ generalAgrouper, days }: IProps) => {
	const [month, year] = generalAgrouper.split('-').map(Number);

	const monthLabel = new Date(year, month - 1).toLocaleString('en-EN', { month: 'long' });
	const upperMonth = monthLabel.charAt(0).toUpperCase() + monthLabel.slice(1);

	const output = Object.entries(days).map(([day, times]) => <Day key={day} day={day} times={times} />);

	return (
		<div key={month}>
			<h4 className="text-2xl">
				{upperMonth} {year}
			</h4>
			<div className="py-2 flex flex-col gap-4">{output}</div>
		</div>
	);
};
