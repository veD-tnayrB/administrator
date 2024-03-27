import React from 'react';
import { Input } from 'pragmate-ui/form';
import { useFrecuencyManagmentContext } from './context';
import { useNotificationsManagmentContext } from '../../context';
interface IProps {
	onChangeEndDate: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const EndDate = ({ onChangeEndDate }: IProps) => {
	const { store } = useNotificationsManagmentContext();
	const { endDate } = useFrecuencyManagmentContext();

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		store.frecuencyManager.endDate = value;
		onChangeEndDate(event);
	};

	return (
		<Input
			label="End date"
			required
			value={endDate}
			name="endDate"
			onChange={onChange}
			type="date"
			className="fixed-label"
		/>
	);
};
