import React from 'react';
import { useFrecuencyManagmentContext } from '../../context';
import { Time } from './time';

interface IProps {
	day: string;
	items: string[];
}

export const Times = ({ items, day }: IProps) => {
	const { selectedDays, setSelectedDays } = useFrecuencyManagmentContext();
	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		const itemIndex = event.target.getAttribute('data-index');

		selectedDays[day] = selectedDays[day].map((item, index) => {
			if (index === parseInt(itemIndex)) return value;
			return item;
		});

		setSelectedDays({ ...selectedDays });
	};

	const onRemove = (event: React.MouseEvent) => {
		const itemIndex = event.currentTarget.getAttribute('data-index');
		selectedDays[day] = selectedDays[day].filter((item, index) => index !== parseInt(itemIndex));
		setSelectedDays({ ...selectedDays });
	};

	const output = items.map((item, index) => {
		return (
			<Time key={`${day}--${item}--${index}`} item={item} index={index} onChange={onChange} onRemove={onRemove} />
		);
	});
	return <div className="w-full">{output}</div>;
};
