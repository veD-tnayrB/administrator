import React from 'react';
import { TimeSelector } from './time-selector';
import { useWeeklyOptionContext } from '../../context';
import { v4 as uuid } from 'uuid';

export const DayTimes = () => {
	const { selectedDays, notificationTimes, orderedDayOfWeek } = useWeeklyOptionContext();

	const output = selectedDays.map((day, index) => {
		const times = notificationTimes[day] || [];
		const dayOfWeekObj = orderedDayOfWeek.find(d => d.value === day);
		const dayOfTheWeek = dayOfWeekObj ? dayOfWeekObj.label : 'Unknown day';

		return <TimeSelector key={uuid()} times={times} day={day} dayOfTheWeek={dayOfTheWeek} />;
	});
	return <div className="flex-col gap-4">{output}</div>;
};
