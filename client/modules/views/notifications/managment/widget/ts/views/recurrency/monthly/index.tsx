import React from 'react';
import { Button } from 'pragmate-ui/components';
import { RRule } from 'rrule';
import { MonthDaySelector } from './monthday-selector';
import { WeekDaySelector } from './weekday-selector';
import { MonthlyOptionContext } from './context';
import { TimeSelector } from './time-selector/time-selector';

export const Monthly = ({ onRRulesGenerated }) => {
	const [selectedMonthDays, setSelectedMonthDays] = React.useState([]);
	const [selectedWeekDays, setSelectedWeekDays] = React.useState([]);
	const [selectedTimes, setSelectedTimes] = React.useState(['09:00']); // Default notification time
	const [interval, setInterval] = React.useState(1); // Every 1 month by default
	const [untilDate, setUntilDate] = React.useState('');

	const handleSubmit = () => {
		const rruleOptions = {
			freq: RRule.MONTHLY,
			interval: interval,
			bymonthday: selectedMonthDays.map(option => option.value),
			byweekday: selectedWeekDays.map(option => option.value),
			byhour: selectedTimes.map(time => parseInt(time.split(':')[0])),
			byminute: selectedTimes.map(time => parseInt(time.split(':')[1])),
			dtstart: new Date(),
			until: untilDate ? new Date(untilDate) : undefined,
		};

		const rrule = new RRule(rruleOptions);
		onRRulesGenerated(rrule.toString());
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
				<MonthDaySelector />
				<WeekDaySelector />

				<hr className="my-4" />

				<TimeSelector />
				<Button onClick={handleSubmit} variant="primary">
					Set Recurrence
				</Button>
			</div>
		</MonthlyOptionContext.Provider>
	);
};
