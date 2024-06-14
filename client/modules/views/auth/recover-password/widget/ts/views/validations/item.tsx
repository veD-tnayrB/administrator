import React from 'react';
import { ValidationIcon } from './validation-icon';

interface IProps {
	condition: boolean;
	message: string;
}

export const ValidationItem = ({ condition, message }: IProps) => {
	return (
		<li className="flex items-center gap-4">
			<ValidationIcon isValid={condition} />

			<span>{message}</span>
		</li>
	);
};
