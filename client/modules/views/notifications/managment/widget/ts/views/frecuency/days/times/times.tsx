import React from 'react';
import { Time } from './time';
import { useNotificationsManagmentContext } from '../../../../context';

interface IProps {
	day: string;
	items: string[];
}

export const Times = ({ items, day }: IProps) => {
	const { store } = useNotificationsManagmentContext();

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		const itemIndex = event.target.getAttribute('data-index');

		store.frecuencyManager.selectedDays[day] = store.frecuencyManager.selectedDays[day].map((item, index) => {
			if (index === parseInt(itemIndex)) return value;
			return item;
		});

		store.frecuencyManager.selectedDays = store.frecuencyManager.selectedDays;
	};

	const onRemove = (event: React.MouseEvent) => {
		const itemIndex = event.currentTarget.getAttribute('data-index');
		store.frecuencyManager.selectedDays[day] = store.frecuencyManager.selectedDays[day].filter(
			(item, index) => index !== parseInt(itemIndex)
		);
		store.frecuencyManager.selectedDays = store.frecuencyManager.selectedDays;
	};

	const output = items.map((item, index) => {
		return <Time key={`${day}--${index}`} item={item} index={index} onChange={onChange} onRemove={onRemove} />;
	});
	return <div className="w-full">{output}</div>;
};
