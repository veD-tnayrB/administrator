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
	// const [repeatWeekly, setRepeatWeekly] = useState(true);
	const [selectedDays, setSelectedDays] = useState([]);
	const [notificationTimes, setNotificationTimes] = useState({});
	const [orderedDayOfWeek, setOrderedDayOfWeek] = useState(daysOfWeek);

	const generateRRule = () => {
		let rruleOptions = {
			freq: RRule.WEEKLY,
			byweekday: selectedDays,
			interval: 1,
			byhour: [],
		};

		Object.values(notificationTimes).forEach((times: string[]) => {
			times.forEach(time => {
				const [hour, minute] = time.split(':');
				rruleOptions.byhour.push(parseInt(hour));
				rruleOptions.byminute = parseInt(minute);
			});
		});

		console.log('RRULE OPTIONS: ', rruleOptions);
		const rrule = new RRule(rruleOptions);
		console.log('RRule:', rrule.toString());
		onRRulesGenerated(rrule.toString());
	};

	const contextValue = {
		selectedDays,
		setSelectedDays,
		notificationTimes,
		orderedDayOfWeek,
		setNotificationTimes,
	};

	const theresNoDaySelected = selectedDays.length === 0;
	const someTimeItsEmpty = Object.values(notificationTimes).some(
		(times: string[]) => !times.length || times.some(time => !time)
	);
	const disableSet = theresNoDaySelected || someTimeItsEmpty;
	return (
		<WeeklyOptionContext.Provider value={contextValue}>
			<div className="flex-col gap-4">
				<Days />
				<Button disabled={disableSet} onClick={generateRRule} variant="primary">
					Set
				</Button>
			</div>
		</WeeklyOptionContext.Provider>
	);
};
