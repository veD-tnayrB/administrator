import React from 'react';
import { useRecoverPasswordContext } from '../context';
import { ValidationItem } from './item';

interface IProps {
	values: {
		password: string;
		repeatedPassword: string;
	};
}

export const Validations = ({ values }: IProps) => {
	const { store } = useRecoverPasswordContext();
	console.log(values.password);
	const state = {
		isMoreOrEqualToEightCharacters: {
			condition: values.password.length >= 8,
			message: 'Password must be at least 8 characters long',
		},
		hasOneUppercaseLetter: {
			condition: /[A-Z]/.test(values.password),
			message: 'Password must contain at least one uppercase letter',
		},
		hasOneLowercaseLetter: {
			condition: /[a-z]/.test(values.password),
			message: 'Password must contain at least one lowercase letter',
		},
	};

	const output = Object.keys(state).map((key) => {
		const validation = state[key as keyof typeof state];
		return <ValidationItem key={key} condition={validation.condition} message={validation.message} />;
	});

	return (
		<section>
			<ul className="flex flex-col gap-4">{output}</ul>
		</section>
	);
};
