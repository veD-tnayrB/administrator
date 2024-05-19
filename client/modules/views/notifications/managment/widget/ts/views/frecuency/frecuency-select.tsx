import React from 'react';
import { ReactSelect as Select } from 'pragmate-ui/form/react-select';
import { useFrecuencyManagmentContext } from './context';
import { useNotificationsManagmentContext } from '../../context';

export enum Frecuencies {
	DAILY = 'Daily',
	WEEKLY = 'Weekly',
	MONTHLY = 'Monthly',
}
export const FrencuencySelect = () => {
	const { store } = useNotificationsManagmentContext();
	const { endDate } = useFrecuencyManagmentContext();

	const onChangeFrecuency = (selected: { target: { value: Frecuencies } }) => {
		store.frecuencyManager.selectedFrecuency = selected.target.value;
	};

	const frencuenciesOpts = Object.values(Frecuencies).map(frencuency => ({ value: frencuency, label: frencuency }));
	const selectedDays = store.frecuencyManager.selectedDays;
	const disabled = !Object.entries(selectedDays).length || !endDate;
	return (
		<Select
			label="Frequency"
			value={store.frecuencyManager.selectedFrecuency}
			onChange={onChangeFrecuency}
			options={frencuenciesOpts}
			disabled={disabled}
		/>
	);
};
