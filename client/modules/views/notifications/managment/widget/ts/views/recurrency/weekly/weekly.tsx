import React, { useState } from 'react';
import { Checkbox } from 'pragmate-ui/form';
import { Button } from 'pragmate-ui/components';
import { Input } from 'pragmate-ui/form';
import { RRule } from 'rrule';
import { Days } from './days';
import { WeeklyOptionContext } from './context';

const daysOfWeek = [
	{ label: 'Monday', value: 1 },
	{ label: 'Tuesday', value: 2 },
	{ label: 'Wednesday', value: 3 },
	{ label: 'Thursday', value: 4 },
	{ label: 'Friday', value: 5 },
	{ label: 'Saturday', value: 6 },
	{ label: 'Sunday', value: 0 },
];

export const Weekly = ({ onRRulesGenerated }) => {
	const [repeatWeekly, setRepeatWeekly] = useState(true);
	const [selectedDays, setSelectedDays] = useState([]);
	const [notificationTimes, setNotificationTimes] = useState({});
	const [startDate, setStartDate] = useState(new Date().toDateString());
	const [orderedDayOfWeek, setOrderedDayOfWeek] = useState(daysOfWeek);
	console.log('orderedDayOfWeek => ', orderedDayOfWeek);

	const generateRRule = () => {
		let rruleOptions = {
			freq: RRule.WEEKLY,
			byweekday: selectedDays,
			dtstart: startDate,
			interval: 1,
			byhour: [],
		};

		// Aggregate all times for each selected day
		Object.values(notificationTimes).forEach(times => {
			times.forEach(time => {
				const [hour, minute] = time.split(':');
				rruleOptions.byhour.push(parseInt(hour));
				rruleOptions.byminute = parseInt(minute); // This simplifies to only consider minutes from the first time
			});
		});

		const rrule = new RRule(rruleOptions);
		console.log('RRule:', rrule.toString());
		onRRulesGenerated(rrule.toString());
	};

	const onRepeatWeekly = (event: React.ChangeEvent<HTMLInputElement>) => {
		setOrderedDayOfWeek(daysOfWeek);
		setRepeatWeekly(event.target.checked);
	};

	const reorderDaysOfWeek = (startDate: string) => {
		const startDay = new Date(startDate).getDay();
		const orderedDays = [...daysOfWeek];
		while (orderedDays[0].value !== startDay) {
			orderedDays.push(orderedDays.shift());
		}
		return orderedDays;
	};

	const onStartDate = (event: React.ChangeEvent<HTMLInputElement>) => {
		setOrderedDayOfWeek(reorderDaysOfWeek(event.target.value));
		setStartDate(event.target.value);
	};

	const contextValue = {
		selectedDays,
		setSelectedDays,
		notificationTimes,
		orderedDayOfWeek,
		setNotificationTimes,
	};

	const disableSet = Object.values(notificationTimes).some(
		(times: string[]) => !times.length || times.some(time => !time)
	);
	return (
		<WeeklyOptionContext.Provider value={contextValue}>
			<div className="flex-col gap-4">
				<Checkbox label="Repeat weekly" checked={repeatWeekly} onChange={onRepeatWeekly} />
				{!repeatWeekly && (
					<div className="pt-4">
						<Input
							label="Start from"
							type="date"
							id="start-date"
							value={startDate}
							onChange={onStartDate}
						/>
					</div>
				)}

				<Days />
				<Button disabled={disableSet} onClick={generateRRule} variant="primary">
					Set
				</Button>
			</div>
		</WeeklyOptionContext.Provider>
	);
};
