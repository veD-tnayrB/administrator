import React from 'react';
import { Checkbox } from 'pragmate-ui/form';

const daysOfWeek = [
	{ label: 'Monday', value: 1 },
	{ label: 'Tuesday', value: 2 },
	{ label: 'Wednesday', value: 3 },
	{ label: 'Thursday', value: 4 },
	{ label: 'Friday', value: 5 },
	{ label: 'Saturday', value: 6 },
	{ label: 'Sunday', value: 0 },
];

export const DaySelector = ({ selectedDays, onDayChange }) => {
	return (
		<>
			{daysOfWeek.map(day => (
				<Checkbox
					key={day.value}
					label={day.label}
					checked={selectedDays.includes(day.value)}
					onChange={() => onDayChange(day.value)}
				/>
			))}
		</>
	);
};
