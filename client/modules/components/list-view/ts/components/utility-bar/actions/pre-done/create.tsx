import React from 'react';
import { Button } from 'pragmate-ui/components';
import { routing } from '@beyond-js/kernel/routing';

export interface ICreateAction extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	to?: string;
	label?: string;
}

export const CreateAction = ({ to, label, ...props }: ICreateAction) => {
	const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		if (to) routing.pushState(to);
		if (props?.onClick) props.onClick(event);
	};

	return (
		<Button {...props} onClick={onClick} className={`create-action ${props.className}`}>
			{label || 'Create'}
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
				<path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
			</svg>
		</Button>
	);
};
