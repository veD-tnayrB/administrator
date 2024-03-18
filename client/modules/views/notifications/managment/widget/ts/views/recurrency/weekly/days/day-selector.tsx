import React from 'react';
import { Checkbox } from 'pragmate-ui/form';
import { useWeeklyOptionContext } from '../context';

export const DaySelector = () => {
	const { selectedDays, setSelectedDays, notificationTimes, setNotificationTimes, orderedDayOfWeek } =
		useWeeklyOptionContext();

	const onDayChange = day => {
		const updatedSelectedDays = selectedDays.includes(day)
			? selectedDays.filter(d => d !== day)
			: [...selectedDays, day];
		setSelectedDays(updatedSelectedDays);

		if (!updatedSelectedDays.includes(day)) {
			const updatedTimes = { ...notificationTimes };
			delete updatedTimes[day];
			setNotificationTimes(updatedTimes);
		} else {
			setNotificationTimes({ ...notificationTimes, [day]: ['09:00'] });
		}
	};

	const output = orderedDayOfWeek.map(day => (
		<Checkbox
			key={day.value}
			label={day.label}
			checked={selectedDays.includes(day.value)}
			onChange={() => onDayChange(day.value)}
		/>
	));
	return <div>{output}</div>;
};
