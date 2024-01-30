import React from 'react';
import { useListViewContext } from '../../context';

export interface ILengthHandler {
	options?: number[];
}

export const LengthHandler = (props: ILengthHandler) => {
	const { store } = useListViewContext();

	const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const value = Number(event.target.value);
		store.onLengthChange(value);
	};

	const options = props?.options || [5, 10, 25, 50, 100, 150, 250];
	const output = options.map(option => (
		<option key={option} value={option}>
			{option}
		</option>
	));
	return (
		<select className="length-handler" onChange={onChange} title="Length handler">
			{output}
		</select>
	);
};
