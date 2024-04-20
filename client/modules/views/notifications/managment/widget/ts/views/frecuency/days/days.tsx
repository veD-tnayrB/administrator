import React from 'react';
import { Day } from './day';
import { Month } from './month';
import { v4 as uuid } from 'uuid';

interface IProps {
	selectedDays: Record<string, string[]>;
}

export const Days = ({ selectedDays }: IProps) => {
	// Agrupar por mes
	const groupByMonth = (dates: Record<string, string[]>) => {
		const months: Record<string, Record<string, string[]>> = {};
		Object.entries(dates).forEach(([day, times]) => {
			const month = day.slice(3, 5);
			const year = day.slice(6, 10);
			const key = `${month}-${year}`;
			if (!months[key]) {
				months[key] = {};
			}

			months[key][day] = times;
		});
		return months;
	};

	const groupedDays = groupByMonth(selectedDays);

	const output = Object.entries(groupedDays).map(([generalAgrouper, days]) => (
		<Month key={generalAgrouper} generalAgrouper={generalAgrouper} days={days} />
	));

	const empty = <div className="flex items-center justify-center h-full max-h-80">Theres no days selected</div>;

	const entries = Object.entries(selectedDays).length ? output : empty;

	return <div className="w-full px-4 flex-col gap-4 h-full max-h-80 overflow-auto">{entries}</div>;
};
