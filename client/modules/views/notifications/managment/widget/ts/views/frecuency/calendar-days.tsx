import React from 'react';
import { DayPicker, SelectMultipleEventHandler } from 'react-day-picker';
import { Days } from './days/days';
import { useNotificationsManagmentContext } from '../../context';
import moment from 'moment-timezone';

export const CalendarDays = () => {
	const { store } = useNotificationsManagmentContext();

	const onSelect: SelectMultipleEventHandler = (days) => {
		const newSelectedDays: Record<string, string[]> = {};
		if (!days) return days;

		days.forEach((day) => {
			const date = moment(day);
			const key = date.format('DD-MM-YYYY');
			const currentValue = store.frecuencyManager.selectedDays[key] || ['09:00'];
			newSelectedDays[key] = currentValue;
		});
		store.frecuencyManager.selectedDays = newSelectedDays;
		return days;
	};

	const formatedSelectedDays = Object.keys(store.frecuencyManager.selectedDays).map(day => {
		let [date, month, year] = day.split('-');
		let formattedDate = `${month}-${date}-${year}`;
		return new Date(formattedDate);
	});


	const currentYear = new Date().getFullYear();
	const firstDayOfYear = new Date(currentYear, 0, 1);
	const disabledDays = { after: store.frecuencyManager.endDate, before: firstDayOfYear };
	return (
		<div className="flex gap-4">
			<DayPicker
				disabled={disabledDays}
				selected={formatedSelectedDays}
				fixedWeeks
				onSelect={onSelect}
				mode="multiple"
			/>
			<Days selectedDays={store.frecuencyManager.selectedDays} />
		</div>
	);
};
