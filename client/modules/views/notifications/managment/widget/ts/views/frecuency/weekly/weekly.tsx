import React, { useState } from 'react';
import { Button } from 'pragmate-ui/components';
import { RRule } from 'rrule';
import { Days } from './days';
import { WeeklyOptionContext } from './context';
import { toast } from 'react-toastify';

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
		const theresNoDaySelected = selectedDays.length === 0;
		const someTimeItsEmpty = Object.values(notificationTimes).some(
			(times: string[]) => !times.length || times.some(time => !time)
		);
		const cantSave = theresNoDaySelected || someTimeItsEmpty;

		if (cantSave) {
			return toast.error(
				'Please verify that you have set all the schedules correctly, remember that there cannot be an empty schedule.'
			);
		}

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

	return (
		<WeeklyOptionContext.Provider value={contextValue}>
			<div className="flex-col gap-4">
				<h5 className="text-xl">Weekly</h5>
				<p>
					Allows you to configure based on the days of the week which days you want the notification to be
					sent, you could configure in its totality the schedules in which these are sent.
				</p>
				<Days />
				<div className="flex justify-end">
					<Button onClick={generateRRule} variant="primary">
						Set frequency
					</Button>
				</div>
			</div>
		</WeeklyOptionContext.Provider>
	);
};
