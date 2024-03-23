import React from 'react';
import { Button } from 'pragmate-ui/components';
import { Checkbox } from 'pragmate-ui/form';
import { RRule } from 'rrule';
import { MonthDaySelector } from './monthday-selector';
import { WeekDaySelector } from './weekday-selector';
import { MonthlyOptionContext } from './context';
import { TimeSelector } from './time-selector/time-selector';
import { DayPicker } from 'react-day-picker';

export const Monthly = ({ onRRulesGenerated }) => {
	const [selectedMonthDays, setSelectedMonthDays] = React.useState([]);
	const [selectedWeekDays, setSelectedWeekDays] = React.useState([]);
	const [selectedTimes, setSelectedTimes] = React.useState(['09:00']); // Default notification time
	const [interval, setInterval] = React.useState(1); // Every 1 month by default
	const [selectByDays, setSelectByDays] = React.useState(false);

	const handleSubmit = () => {
		const rruleOptions = {
			freq: RRule.MONTHLY,
			interval: interval,
			bymonthday: selectedMonthDays.map(option => option.value),
			byweekday: selectedWeekDays.map(option => option.value),
			byhour: selectedTimes.map(time => parseInt(time.split(':')[0])),
			byminute: selectedTimes.map(time => parseInt(time.split(':')[1])),
			dtstart: new Date(),
		};

		const rrule = new RRule(rruleOptions);
		onRRulesGenerated(rrule.toString());
	};

	const onChangeSelectByDays = (event: React.ChangeEvent<HTMLInputElement>) => {
		const checked = event.target.checked;
		setSelectByDays(checked);
		setSelectedMonthDays([]);
		if (!checked) {
			setSelectedWeekDays([]);
		}
	};

	const contextValue = {
		selectedMonthDays,
		setSelectedMonthDays,
		selectedWeekDays,
		setSelectedWeekDays,
		selectedTimes,
		setSelectedTimes,
	};

	return (
		<MonthlyOptionContext.Provider value={contextValue}>
			<div className="flex-col gap-4">
				<h3>Monthly</h3>

				<DayPicker />

				<Checkbox label="Select configuration by days" checked={selectByDays} onChange={onChangeSelectByDays} />
				{selectByDays && <MonthDaySelector />}
				<WeekDaySelector />

				<hr className="my-4" />

				<TimeSelector />
				<Button onClick={handleSubmit} variant="primary" className="bordered">
					Set Recurrence
				</Button>
			</div>
		</MonthlyOptionContext.Provider>
	);
};
