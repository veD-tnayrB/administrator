import React from 'react';
import { Form as FormPUI, Input } from 'pragmate-ui/form';
import { Button } from 'pragmate-ui/components';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { Alert } from 'pragmate-ui/alert';
import { routing } from '@beyond-js/kernel/routing';
import { useForgetPasswordContext } from './context';

export const Form = () => {
	const { store } = useForgetPasswordContext();
	const [values, setValues] = React.useState(store.values);
	const [error, setError] = React.useState<string | null>(null);
	const [loading, setLoading] = React.useState(false);
	const isButtonDisabled = values.email === '';

	useBinder([store], () => {
		setError(store.error);
		setLoading(store.fetching);
	});
	useBinder([store], () => setValues(store.values), 'reset');

	const onSubmit = () => {
		if (isButtonDisabled) return;
		store.sendForgetPasswordEmail(values);
	};

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setValues({
			...values,
			[name]: value,
		});
	};

	const goBack = () => routing.pushState('/auth/login');

	const errors: Record<string, string> = {
		INVALID_EMAIL: 'Please enter a valid email address',
		DEFAULT: 'Something went wrong when trying to send the email, try again later or ',
	};

	const errorMessage = error ? errors[error as string] || errors.DEFAULT : undefined;
	const sucessMessage = store.success && !error ? 'Email sent, check your inbox' : undefined;
	const sendButtonMessage = store.isFirstTime ? 'Send email' : 'Resend email';

	return (
		<article>
			<div>
				<span>Don't worry, we have everything under control</span>
				<h1 className="mb-2">Forget Password</h1>
			</div>

			<Alert className="mb-6" type="error" message={errorMessage} />
			<Alert className="mb-6" type="success" message={sucessMessage} />

			<FormPUI onSubmit={onSubmit}>
				<Input name="email" type="email" value={values.email} label="Email" onChange={onChange} />

				<div className="actions w-full flex items-center justify-between gap-4">
					<Button className="w-full" onClick={goBack} loading={loading} variant="secondary" type="button">
						Cancel
					</Button>
					<Button className="w-full" loading={loading} variant="primary" type="submit">
						{sendButtonMessage}
					</Button>
				</div>
			</FormPUI>
		</article>
	);
};
