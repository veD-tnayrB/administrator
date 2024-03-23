import React from 'react';
import { Input } from 'pragmate-ui/form';
import { Button } from 'pragmate-ui/components';
import { TimeItem } from './time-item';

interface IProps {
	notificationTimes: string[];
	setNotificationTimes: React.Dispatch<React.SetStateAction<string[]>>;
}

export const DailyTimes = ({ notificationTimes, setNotificationTimes }: IProps) => {
	const addNotificationTime = () => {
		setNotificationTimes([...notificationTimes, '']);
	};

	const removeNotificationTime = index => {
		setNotificationTimes(notificationTimes.filter((_, i) => i !== index));
	};

	const updateNotificationTime = (index, time) => {
		const updatedTimes = [...notificationTimes];
		updatedTimes[index] = time;
		setNotificationTimes(updatedTimes);
	};

	const output = notificationTimes.map((time, index) => (
		<TimeItem
			key={index}
			index={index}
			time={time}
			removeNotificationTime={removeNotificationTime}
			updateNotificationTime={updateNotificationTime}
		/>
	));

	return (
		<div className="flex-col gap-4">
			<div className="flex-row ">
				<Button className="w-1 px-3 py-1 bordered" onClick={addNotificationTime} variant="primary">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="lucide lucide-plus">
						<path d="M5 12h14" />
						<path d="M12 5v14" />
					</svg>
					Add time
				</Button>
			</div>
			{output}
		</div>
	);
};
