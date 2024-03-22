import React from 'react';
import { useWeeklyOptionContext } from '../context';
import { Select } from '@essential-js/admin/components/select';

export const DaySelector = () => {
	const { selectedDays, setSelectedDays, orderedDayOfWeek, setNotificationTimes, notificationTimes } =
		useWeeklyOptionContext();

	const onChange = (selectedOptions, props) => {
		console.log('SELECTED OPTIONS => ', selectedOptions, props);
		setSelectedDays(selectedOptions);

		if (props.action === 'remove-value') {
			const removedOpt = props.removedValue;
			setNotificationTimes(currentValue => {
				delete currentValue[removedOpt.uniqueId];
				return currentValue;
			});
			return;
		}

		const option = props?.option;
		setNotificationTimes(currentValue => ({
			...currentValue,
			[option.uniqueId]: ['09:00'],
		}));
	};

	const options = orderedDayOfWeek.map((day, index) => ({
		value: day.value,
		label: day.label,
		uniqueId: `${day.label}-${index}`, // In case you need a unique identifier
	}));

	// Convert selectedDays back into the format that react-select expects
	let value: number[] = [];
	selectedDays.forEach(day => {
		value.push(day.value);
	});

	return <Select onChange={onChange} options={options} isMulti label="Days of the week" value={value} />;
};
