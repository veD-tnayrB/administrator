import React from 'react';
import { DayPicker } from 'react-day-picker';
import { Days } from './days/days';
import { useNotificationsManagmentContext } from '../../context';
import * as moment from 'moment-timezone';

export const CalendarDays = () => {
	const { store } = useNotificationsManagmentContext();

	const onSelect = (selectedDates: Date[]) => {
		const newSelectedDays = {};

		selectedDates.forEach(day => {
			const date = moment.default(day);
			const key = date.format('DD-MM-YYYY');
			const currentValue = store.frecuencyManager.selectedDays[key] || ['09:00'];
			newSelectedDays[key] = currentValue;
		});
		store.frecuencyManager.selectedDays = newSelectedDays;
	};
	const formatedSelectedDays = Object.keys(store.frecuencyManager.selectedDays).map(day => {
		let [date, month, year] = day.split('-');
		let formattedDate = `${month}-${date}-${year}`;
		return new Date(formattedDate);
	});

	const disabledDays = { after: store.frecuencyManager.endDate };
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
