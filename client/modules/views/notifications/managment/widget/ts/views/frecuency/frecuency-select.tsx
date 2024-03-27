import React from 'react';
import { Select } from '@essential-js/admin/components/select';
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

	const onChangeFrecuency = (selected: { value: Frecuencies; label: Frecuencies }) => {
		store.frecuencyManager.selectedFrecuency = selected.value;
	};

	const frencuenciesOpts = Object.values(Frecuencies).map(frencuency => ({ value: frencuency, label: frencuency }));

	return (
		<Select
			label="Frequency"
			value={store.frecuencyManager.frecuency}
			onChange={onChangeFrecuency}
			options={frencuenciesOpts}
			disabled={!endDate}
		/>
	);
};
