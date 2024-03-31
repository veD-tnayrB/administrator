import React from 'react';
import { Button } from 'pragmate-ui/components';
import { useFrecuencyManagmentContext } from './context';
import { useNotificationsManagmentContext } from '../../context';

export const Actions = () => {
	const { store } = useNotificationsManagmentContext();
	const { isEndDateValid, endDate, setFrecuency } = useFrecuencyManagmentContext();

	const onReset = () => {
		store.frecuencyManager.reset();
	};

	const onSave = () => {
		const frecuency = store.frecuencyManager.generateRRuleFrecuency();
		setFrecuency(frecuency);
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
