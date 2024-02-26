import React from 'react';
import { useListViewContext } from '../../context';

export interface ILengthHandler {
	options?: number[];
}

export const LengthHandler = (props: ILengthHandler) => {
	const { store } = useListViewContext();
	const [value, setValue] = React.useState(store.limit);

	const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const value = Number(event.target.value);
		setValue(value);
		store.onLengthChange(value);
	};

	const options = props?.options || [5, 10, 25, 50, 100, 150, 250];
	const output = options.map(option => (
		<option key={option} value={option}>
			{option}
		</option>
	));
	return (
		<select value={value} className="length-handler" onChange={onChange} title="Length handler">
			{output}
		</select>
	);
};
