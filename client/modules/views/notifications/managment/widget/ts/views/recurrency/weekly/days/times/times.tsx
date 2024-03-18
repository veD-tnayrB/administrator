import React from 'react';
import { TimeSelector } from './time-selector';
import { useWeeklyOptionContext } from '../../context';

export const DayTimes = () => {
	const { selectedDays, notificationTimes, orderedDayOfWeek } = useWeeklyOptionContext();

	const output = selectedDays.map((day, index) => {
		const times = notificationTimes[day] || [];
		const dayOfTheWeek = orderedDayOfWeek.find(d => d.value === day).label;

		return <TimeSelector key={day} times={times} day={day} dayOfTheWeek={dayOfTheWeek} />;
	});
	return <div className="flex-col gap-4">{output}</div>;
};
