import React from 'react';
import { Button } from 'pragmate-ui/components';
import { v4 as uuid } from 'uuid';
import { useWeeklyOptionContext } from '../../context';
import { Time } from './time';

interface IProps {
	times: string[];
	dayOfTheWeek: string;
	day: number;
}

export const TimeSelector = ({ times, dayOfTheWeek, day }: IProps) => {
	const { notificationTimes, setNotificationTimes, setSelectedDays, selectedDays } = useWeeklyOptionContext();

	const onAddTime = () => {
		const updatedTimes = { ...notificationTimes, [day]: [...(notificationTimes[day] || []), ''] };
		setNotificationTimes(updatedTimes);
	};

	const output = times.map((time, index) => <Time key={uuid()} index={index} time={time} day={day} />);

	return (
		<div className="flex-col gap-4">
			<div className="flex-row justify-between">
				<h3 className="flex-row items-center">{dayOfTheWeek}</h3>
				<Button className="w-1 px-3 py-1" onClick={onAddTime} variant="primary">
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
