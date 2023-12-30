import React from 'react';
import { Button } from 'pragmate-ui/components';

export interface IToggler extends HTMLButtonElement {
	label?: string;
}

interface IProps extends IToggler {
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Toggler = ({ setIsModalOpen, label, ...validProps }: IProps) => {
	const onToggle = () => {
		setIsModalOpen(currentValue => !currentValue);
	};

	return <Button onClick={onToggle} {...validProps} />;
};
