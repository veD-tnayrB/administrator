import React from 'react';
import { Select } from '@essential-js/admin/components/select';
import { RRule } from 'rrule';
import { useMonthlyOptionContext } from './context';

export const WeekDaySelector = () => {
	const { selectedWeekDays, setSelectedWeekDays } = useMonthlyOptionContext();
	const weekDayOptions = [
		{ label: 'Monday', value: 1 },
		{ label: 'Tuesday', value: 2 },
		{ label: 'Wednesday', value: 3 },
		{ label: 'Thursday', value: 4 },
		{ label: 'Friday', value: 5 },
		{ label: 'Saturday', value: 6 },
		{ label: 'Sunday', value: 0 },
	];

	const handleChange = selectedOptions => {
		const fixedSelectedOptions = selectedOptions.map(({ value }) => value);
		setSelectedWeekDays(fixedSelectedOptions || []);
	};

	return (
		<Select
			isMulti
			options={weekDayOptions}
			value={selectedWeekDays}
			onChange={handleChange}
			placeholder="Select days of the week..."
		/>
	);
};
