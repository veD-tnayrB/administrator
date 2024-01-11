import React from 'react';
import { useSelectContext } from '../context';

interface ITarget extends HTMLInputElement {
	[key: string]: any;
	name: string;
	value: string;
}

export interface IOnSelect extends React.ChangeEvent<HTMLInputElement> {
	target: ITarget;
}

export /*bundle*/ interface IOption {
	label: string;
	value: string;
}

export const Option = (props: IOption) => {
	const { onSelect, setIsOpen, name } = useSelectContext();

	const onClick = event => {
		setIsOpen(false);
		onSelect && onSelect({ ...event, target: { name, value: props.value } });
	};

	return (
		<li className="option">
			<button type="button" onClick={onClick} data-value={props.value}>
				{props.label}
			</button>
		</li>
	);
};
