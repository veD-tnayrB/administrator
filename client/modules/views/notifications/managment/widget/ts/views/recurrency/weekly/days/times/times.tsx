import React from 'react';
import { TimeSelector } from './time-selector';
import { useWeeklyOptionContext } from '../../context';
import { v4 as uuid } from 'uuid';

export const DayTimes = () => {
	const { selectedDays, notificationTimes } = useWeeklyOptionContext();
	const output = selectedDays.map(day => {
		const times = notificationTimes[day.uniqueId] || [];
		return <TimeSelector key={day.uniqueId} times={times} day={day} dayOfTheWeek={day.label} />;
	});
	return <div className="flex-col gap-4">{output}</div>;
};
