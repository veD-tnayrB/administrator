import React, { useState } from 'react';
import { Checkbox } from 'pragmate-ui/form';
import { Button } from 'pragmate-ui/components';
import { Input } from 'pragmate-ui/form';
import { RRule } from 'rrule';
import { DaySelector } from './day-selector';
import { TimeSelector } from './time-selector';

export const Weekly = ({ onRRulesGenerated }) => {
	const [repeatWeekly, setRepeatWeekly] = useState(true);
	const [selectedDays, setSelectedDays] = useState([]);
	const [notificationTimes, setNotificationTimes] = useState({});
	const [startDate, setStartDate] = useState(new Date());

	const handleDayChange = day => {
		const updatedSelectedDays = selectedDays.includes(day)
			? selectedDays.filter(d => d !== day)
			: [...selectedDays, day];
		setSelectedDays(updatedSelectedDays);

		if (!updatedSelectedDays.includes(day)) {
			const updatedTimes = { ...notificationTimes };
			delete updatedTimes[day];
			setNotificationTimes(updatedTimes);
		} else {
			setNotificationTimes({ ...notificationTimes, [day]: ['09:00'] }); // Default time when a new day is selected
		}
	};

	const addTimeForDay = day => {
		const updatedTimes = { ...notificationTimes, [day]: [...(notificationTimes[day] || []), ''] };
		setNotificationTimes(updatedTimes);
	};

	const updateTimeForDay = (day, index, time) => {
		const updatedDayTimes = [...notificationTimes[day]];
		updatedDayTimes[index] = time;
		setNotificationTimes({ ...notificationTimes, [day]: updatedDayTimes });
	};

	const removeTimeForDay = (day, index) => {
		const updatedDayTimes = notificationTimes[day].filter((_, i) => i !== index);
		if (updatedDayTimes.length === 0) {
			handleDayChange(day); // Remove the day if no times left
		} else {
			setNotificationTimes({ ...notificationTimes, [day]: updatedDayTimes });
		}
	};

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

	return (
		<div>
			<Checkbox label="Repeat weekly" checked={repeatWeekly} onChange={e => setRepeatWeekly(e.target.checked)} />

			{!repeatWeekly && (
				<>
					<Input
						label="Start from"
						type="date"
						id="start-date"
						value={startDate}
						onChange={e => setStartDate(e.target.value)}
					/>
				</>
			)}

			<DaySelector selectedDays={selectedDays} onDayChange={handleDayChange} />
			{selectedDays.map(day => (
				<TimeSelector
					key={day}
					times={notificationTimes[day] || []}
					onAddTime={() => addTimeForDay(day)}
					onUpdateTime={(index, time) => updateTimeForDay(day, index, time)}
					onRemoveTime={index => removeTimeForDay(day, index)}
				/>
			))}
			<Button onClick={generateRRule} variant="primary">
				Set
			</Button>
		</div>
	);
};
