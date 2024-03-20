import React from 'react';
import { RRule } from 'rrule';
import { Button } from 'pragmate-ui/components';
import { DailyTimes } from './times';
import { EndDateDaily } from './end-date';
export const Daily = ({ onRRulesGenerated }) => {
	const [notificationTimes, setNotificationTimes] = React.useState(['09:00']);
	const [endDate, setEndDate] = React.useState('');
	const [isEndEnabled, setIsEndEnabled] = React.useState(false);

	const generateRRule = () => {
		const dtstart = new Date();
		const untilDate = isEndEnabled && endDate ? new Date(endDate) : null;

		const rrules = notificationTimes.map(time => {
			dtstart.setHours(parseInt(time.split(':')[0]), parseInt(time.split(':')[1]));
			let rruleOptions = {
				dtstart: new Date(dtstart),
				freq: RRule.DAILY,
			};

			if (untilDate) {
				rruleOptions.until = untilDate;
			}

			return new RRule(rruleOptions).toString();
		});

		onRRulesGenerated(rrules);
	};

	const disabled = !notificationTimes.length || notificationTimes.some(time => !time);

	return (
		<>
			<DailyTimes notificationTimes={notificationTimes} setNotificationTimes={setNotificationTimes} />

			<EndDateDaily
				endDate={endDate}
				isEndEnabled={isEndEnabled}
				setEndDate={setEndDate}
				setIsEndEnabled={setIsEndEnabled}
			/>
			<Button onClick={generateRRule} variant="primary" disabled={disabled}>
				Set
			</Button>
		</>
	);
};
