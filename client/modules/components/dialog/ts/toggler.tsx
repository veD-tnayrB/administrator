import React from 'react';
import { Button } from 'pragmate-ui/components';

export interface IToggler extends HTMLButtonElement {
	label?: string;
}

interface IProps extends IToggler {
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Toggler = ({ setIsOpen, label, ...validProps }: IProps) => {
	const onToggle = () => {
		setIsOpen(currentValue => !currentValue);
	};

	return <Button variant="primary" onClick={onToggle} {...validProps} />;
};
