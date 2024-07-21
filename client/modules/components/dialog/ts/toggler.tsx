import React, { HTMLProps } from 'react';
import { Button } from 'pragmate-ui/components';
import Tippy from '@tippyjs/react';

export interface IToggler extends React.RefAttributes<HTMLButtonElement> {
	label?: string;
	title?: string;
}

interface IProps extends IToggler {
	setIsOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

export const Toggler = ({ setIsOpen, label, title, ...validProps }: IProps) => {
	const onToggle = () => {
		setIsOpen((currentValue: boolean | null) => !currentValue);
	};
	const Container = title ? Tippy : 'div';
	const props = title ? { content: title } : {};
	return (
		<Container {...props}>
			<Button onClick={onToggle} {...validProps} />
		</Container>
	);
};
