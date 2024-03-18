import React from 'react';
import { Input } from 'pragmate-ui/form';
import { Button } from 'pragmate-ui/components';
import { useWeeklyOptionContext } from '../../context';

interface IProps {
	time: string;
	day: number;
	index: number;
}

export const Time = ({ time, day, index }: IProps) => {
	const { notificationTimes, setNotificationTimes, selectedDays, setSelectedDays } = useWeeklyOptionContext();
	const onUpdateTime = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;

		const updatedDayTimes = [...notificationTimes[day]];
		updatedDayTimes[day] = value;
		setNotificationTimes({ ...notificationTimes, [day]: updatedDayTimes });
	};

	const onRemoveTime = () => {
		const updatedDayTimes = notificationTimes[day].filter((_, i) => i !== day - 1);
		if (updatedDayTimes.length === 0) {
			const updatedSelectedDays = selectedDays.includes(day)
				? selectedDays.filter(d => d !== day)
				: [...selectedDays, day];
			setSelectedDays(updatedSelectedDays);

			if (!updatedSelectedDays.includes(day)) {
				const updatedTimes = { ...notificationTimes };
				delete updatedTimes[day];
				setNotificationTimes(updatedTimes);
			} else {
				setNotificationTimes({ ...notificationTimes, [day]: ['09:00'] });
			}
		} else {
			setNotificationTimes({ ...notificationTimes, [day]: updatedDayTimes });
		}
	};

	const disabledRemove = index === 0;

	return (
		<div className="flex-row w-full">
			<Input className="w-full" type="time" value={time} onChange={onUpdateTime} />
			<Button className="px-3 py-1" onClick={onRemoveTime} disabled={disabledRemove}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					stroke="currentColor"
					className="lucide lucide-trash-2 icon">
					<path d="M3 6h18" />
					<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
					<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
					<line x1="10" x2="10" y1="11" y2="17" />
					<line x1="14" x2="14" y1="11" y2="17" />
				</svg>
			</Button>
		</div>
	);
};
