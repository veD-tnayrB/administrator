import React from 'react';
import { RRule } from 'rrule';
import { Button } from 'pragmate-ui/components';
import { DailyTimes } from './times';
import { toast } from 'react-toastify';

export const Daily = ({ onRRulesGenerated }) => {
	const [notificationTimes, setNotificationTimes] = React.useState(['09:00']);

	const generateRRule = () => {
		const cantSave = !notificationTimes.length || notificationTimes.some(time => !time);

		if (cantSave) {
			return toast.error(
				'Please verify that you have set all the schedules correctly, remember that there cannot be an empty schedule.'
			);
		}

		const dtstart = new Date();

		const rrules = notificationTimes.map(time => {
			dtstart.setHours(parseInt(time.split(':')[0]), parseInt(time.split(':')[1]));
			let rruleOptions = {
				dtstart: new Date(dtstart),
				freq: RRule.DAILY,
			};

			return new RRule(rruleOptions).toString();
		});

		onRRulesGenerated(rrules);
	};

	return (
		<>
			<h5 className="text-xl">Daily</h5>
			<div>
				<p>
					Allows you to choose at what time/time of the day you want your notification to be executed.{' '}
					<strong>Notifications will start running tomorrow at the configured time.</strong>
				</p>
			</div>
			<DailyTimes notificationTimes={notificationTimes} setNotificationTimes={setNotificationTimes} />
			<div className="flex justify-end">
				<Button onClick={generateRRule} variant="primary">
					Save frequency
				</Button>
			</div>
		</>
	);
};
