import React from 'react';
import { Button } from 'pragmate-ui/components';
import { useFrecuencyManagmentContext } from './context';
import { useNotificationsManagmentContext } from '../../context';
import { Frequency, RRule } from 'rrule';

export const Actions = () => {
	const { store } = useNotificationsManagmentContext();
	const { isEndDateValid, endDate } = useFrecuencyManagmentContext();

	const onReset = () => {
		store.frecuencyManager.reset();
	};

	const onSave = () => {
		let rrules = [];

		console.log('STORE => ', store.frecuencyManager.selectedFrecuency, Frequency.WEEKLY);
		Object.entries(selectedDays).forEach(([dateString, times]) => {
			const date = new Date(dateString);
			times.forEach(time => {
				const [hour, minute] = time.split(':');

				const freq = {
					Weekly: Frequency.WEEKLY,
					Monthly: Frequency.MONTHLY,
					Daily: Frequency.DAILY,
				};

				const rrule = new RRule({
					freq: freq[store.frecuencyManager.selectedFrecuency], // o WEEKLY, MONTHLY, etc., según necesites
					dtstart: new Date(date.setHours(parseInt(hour), parseInt(minute))),
					until: new Date(endDate + `T10:00:00Z`),
					// Aquí puedes agregar otras opciones como byweekday si es recurrente semanalmente
				});

				rrules.push(rrule.toString());
			});
		});

		console.log('RRULE => ', rrules);
		return rrules;
	};

	const selectedDays: Record<string, string[]> = store.frecuencyManager.selectedDays;
	const theresAScheduleEmpty = Object.values(selectedDays).some(times => times.some(time => !time));
	const disabled = Object.keys(selectedDays).length === 0 || theresAScheduleEmpty || !endDate || !isEndDateValid;

	return (
		<div className="flex justify-end gap-4">
			<Button variant="secondary" onClick={onReset}>
				Reset
			</Button>
			<Button variant="primary" disabled={disabled} onClick={onSave}>
				Save Frecuency
			</Button>
		</div>
	);
};
