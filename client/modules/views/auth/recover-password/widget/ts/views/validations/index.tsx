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

	const state = store.getValidations(values.password, values.repeatedPassword);
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
