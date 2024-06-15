import React from 'react';
import { Form as FormPUI, Input } from 'pragmate-ui/form';
import { Button } from 'pragmate-ui/components';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { Alert } from 'pragmate-ui/alert';
import { useRecoverPasswordContext } from './context';
import { routing } from '@beyond-js/kernel/routing';
import { Validations } from './validations/index';

export const Form = () => {
	const { store } = useRecoverPasswordContext();
	const [values, setValues] = React.useState(store.values);
	const [error, setError] = React.useState<string | null>(null);
	const [loading, setLoading] = React.useState(false);
	const isPasswordInvalid = Object.values(store.getValidations(values.password, values.repeatedPassword)).some(
		(validation) => !validation.condition,
	);
	const isButtonDisabled = isPasswordInvalid || values.password !== values.repeatedPassword;

	useBinder([store], () => {
		setError(store.error);
		setLoading(store.fetching);
	});
	useBinder([store], () => setValues(store.values), 'reset');

	const onSubmit = () => {
		if (isButtonDisabled) return;
		const token: string = routing.uri.qs.get('token') as string;
		store.recoverPassword({ token, newPassword: values.password });
	};

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setValues({
			...values,
			[name]: value,
		});
	};

	const goBack = () => routing.pushState('/auth/forget-password');

	const errors: Record<string, string> = {
		INVALID_EMAIL: 'Please enter a valid email address',
		DEFAULT: 'Something went wrong when trying to send the email, try again later or ',
	};

	const errorMessage = error ? errors[error as string] || errors.DEFAULT : undefined;
	const sucessMessage = store.success && !error ? 'Email sent, check your inbox' : undefined;

	return (
		<article>
			<div>
				<span>Almost there!!</span>
				<h1>Recover password</h1>

				<Alert type="error" message={errorMessage} />
				<Alert type="success" message={sucessMessage} />
			</div>
			<FormPUI onSubmit={onSubmit}>
				<Input name="password" type="password" value={values.password} label="Password" onChange={onChange} />

				<Input
					name="repeatedPassword"
					type="password"
					value={values.repeatedPassword}
					label="Repeat password"
					onChange={onChange}
				/>

				<Validations values={values} />

				<div className="actions w-full flex items-center justify-between gap-4">
					<Button onClick={goBack} className="w-full" loading={loading} variant="secondary" type="button">
						Cancel
					</Button>
					<Button
						disabled={isButtonDisabled}
						className="w-full"
						loading={loading}
						variant="primary"
						type="submit"
					>
						Recover
					</Button>
				</div>
			</FormPUI>
		</article>
	);
};
