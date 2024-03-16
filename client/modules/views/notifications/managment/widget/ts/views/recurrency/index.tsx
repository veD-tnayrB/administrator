import React from 'react';
import { CollapsibleContainer, CollapsibleHeader, CollapsibleContent } from 'pragmate-ui/collapsible';
import { ButtonGroup, Button } from 'pragmate-ui/components';
import { Input, Checkbox, Select } from 'pragmate-ui/form';
import { RRule } from 'rrule';

export const Recurrency = () => {
	const [selected, setSelected] = React.useState('NONE');
	const [interval, setInterval] = React.useState(1); // General interval for recurrence
	const [weekDays, setWeekDays] = React.useState([]); // For weekly recurrence
	const [monthDay, setMonthDay] = React.useState(1); // For monthly and annually recurrence
	const [month, setMonth] = React.useState(1); // For annual recurrence

	const onWeekDayChange = day => {
		if (weekDays.includes(day)) {
			setWeekDays(weekDays.filter(d => d !== day));
		} else {
			setWeekDays([...weekDays, day]);
		}
	};

	const generateRRule = () => {
		let rruleOptions = {
			dtstart: new Date(Date.now()),
			until: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), // 1 year from now
			freq: RRule.DAILY,
		};

		switch (selected) {
			case 'DAILY':
				rruleOptions = { ...rruleOptions, freq: RRule.DAILY, interval: interval };
				break;
			case 'WEEKLY':
				rruleOptions = { ...rruleOptions, freq: RRule.WEEKLY, interval: interval, byweekday: weekDays };
				break;
			case 'MONTHLY':
				rruleOptions = { ...rruleOptions, freq: RRule.MONTHLY, interval: interval, bymonthday: monthDay };
				break;
			case 'ANNUALLY':
				rruleOptions = {
					...rruleOptions,
					freq: RRule.YEARLY,
					interval: interval,
					bymonth: month,
					bymonthday: monthDay,
				};
				break;
			default:
				break;
		}

		const rrule = new RRule(rruleOptions).toString();
		console.log('RRule:', rrule);
		// Here you would send the rrule to the backend
	};

	return (
		<CollapsibleContainer>
			<CollapsibleHeader>
				<h3>Recurrency</h3>
			</CollapsibleHeader>
			<CollapsibleContent>
				<ButtonGroup>
					<Button onClick={() => setSelected('DAILY')}>Daily</Button>
					<Button onClick={() => setSelected('WEEKLY')}>Weekly</Button>
					<Button onClick={() => setSelected('MONTHLY')}>Monthly</Button>
					<Button onClick={() => setSelected('ANNUALLY')}>Annually</Button>
				</ButtonGroup>
				{selected === 'DAILY' && (
					<>
						<label>Every</label>
						<Input
							type="number"
							min={1}
							value={interval}
							onChange={e => setInterval(Number(e.target.value))}
						/>
						<span>day(s)</span>
					</>
				)}
				{selected === 'WEEKLY' && (
					<>
						<label>Repeat on</label>
						{Array.from({ length: 7 }).map((_, i) => (
							<Checkbox
								key={i}
								label={RRule.weekday(i).toString()}
								checked={weekDays.includes(i)}
								onChange={() => onWeekDayChange(i)}
							/>
						))}
					</>
				)}
				{selected === 'MONTHLY' && (
					<>
						<label>Day of the month</label>
						<Input
							type="number"
							min={1}
							max={31}
							value={monthDay}
							onChange={e => setMonthDay(Number(e.target.value))}
						/>
					</>
				)}
				{selected === 'ANNUALLY' && (
					<>
						<label>Month</label>
						<Select
							value={month}
							onChange={e => setMonth(Number(e.target.value))}
							options={Array.from({ length: 12 }).map((_, i) => ({
								value: i + 1,
								label: RRule.monthText[i],
							}))}
						/>
						<label>Day of the month</label>
						<Input
							type="number"
							min={1}
							max={31}
							value={monthDay}
							onChange={e => setMonthDay(Number(e.target.value))}
						/>
					</>
				)}
				<Button onClick={generateRRule}>Generate RRule</Button>
			</CollapsibleContent>
		</CollapsibleContainer>
	);
};
