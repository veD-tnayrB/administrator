import React from 'react';
import { Dialog } from '@essential-js/admin/components/dialog';
import { Panel } from './panel/panel';
import { Toggler } from './toggler';
import { SelectContext } from './context';
import { IOnSelect, IOption } from './panel/option';

interface IProps {
	options: IOption[];
	onSelect: (event: IOnSelect) => void;
	value: string | number;
	name: string;
	label: string;
}

export /*bundle*/
const Select = (props: IProps) => {
	const [isOpen, setIsOpen] = React.useState(false);
	const value = props.value || props.options[0].value;

	const options = {
		toggler: {
			children: <Toggler />,
		},
		isOpen,
		setIsOpen,
	};

	const contextValue = {
		isOpen,
		setIsOpen,
		options: props.options,
		onSelect: props.onSelect,
		value,
		name: props.name,
	};

	const cls = isOpen ? 'open' : '';

	return (
		<SelectContext.Provider value={contextValue}>
			<div className={`select ${cls}`}>
				<span>{props?.label}</span>
				<Dialog {...options}>
					<Panel />
				</Dialog>
			</div>
		</SelectContext.Provider>
	);
};
