import React from 'react';
import { Button } from 'pragmate-ui/components';
import Tippy from '@tippyjs/react';

export interface IToggler {
	label?: string;
	title?: string;
}


interface IProps extends IToggler {
	setIsOpen: React.Dispatch<React.SetStateAction<boolean | null>>
}

export const Toggler = ({ setIsOpen, label, title, ...validProps }: IProps) => {
	const onToggle = () => {
		setIsOpen((currentValue: boolean | null) => !currentValue);
	};
	return (

		<Tippy content={title}>
			<Button onClick={onToggle} {...validProps} />
		</Tippy>
	);
};
