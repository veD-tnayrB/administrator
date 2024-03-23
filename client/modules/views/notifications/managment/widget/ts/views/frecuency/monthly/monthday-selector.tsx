import React from 'react';
import { Select } from '@essential-js/admin/components/select';
import { Checkbox } from 'pragmate-ui/form';
import { useMonthlyOptionContext } from './context';

export const MonthDaySelector = () => {
	const { selectedMonthDays, setSelectedMonthDays } = useMonthlyOptionContext();
	const [everyDay, setEveryDay] = React.useState(false);
	const monthDayOptions = Array.from({ length: 31 }, (_, i) => ({
		value: i + 1,
		label: i + 1,
	}));

	const onChange = selectedOptions => {
		const fixedSelectedOptions = selectedOptions.map(({ value }) => value);
		setSelectedMonthDays(fixedSelectedOptions);
	};
	console.log('SELECTED OPTIONS => ', selectedMonthDays);

	const onCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
		const isChecked = event.target.checked;

		setEveryDay(event.target.checked);

		if (isChecked) setSelectedMonthDays(monthDayOptions.map(({ value }) => value));
	};

	return (
		<>
			<Checkbox label="Every day" onChange={onCheck} checked={everyDay} />
			<Select
				isMulti
				disabled={everyDay}
				options={monthDayOptions}
				value={selectedMonthDays}
				onChange={onChange}
				placeholder="Select days of the month..."
			/>
		</>
	);
};
