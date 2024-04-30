import React from 'react';
import { Button } from 'pragmate-ui/components';
import tippy from 'tippy.js';

export interface IToggler extends React.ForwardRefExoticComponent<React.RefAttributes<HTMLButtonElement>> {
	label?: string;
	title: string;
}

interface IProps extends IToggler {
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Toggler = ({ setIsOpen, label, title, ...validProps }: IProps) => {
	const ref = React.useRef(null);
	React.useEffect(() => {
		if (title) tippy(ref.current, { content: title });
	}, [title]);

	const onToggle = () => {
		setIsOpen(currentValue => !currentValue);
	};

	return <Button ref={ref} onClick={onToggle} {...validProps} />;
};
