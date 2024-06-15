import React from 'react';
import { Form, Input } from 'pragmate-ui/form';
import { Button } from 'pragmate-ui/components';
import { useLoginContext } from '../../context';
import { Link } from 'pragmate-ui/link';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { Providers } from '@essential-js/admin/auth';
import { Alert } from 'pragmate-ui/alert';

export const LeftSectionForm = () => {
	const { store } = useLoginContext();
	const [values, setValues] = React.useState(store.values);
	const [error, setError] = React.useState<string | null>(null);
	const [loading, setLoading] = React.useState(false);
	const isButtonDisabled = values.email === '' || values.password === '';

	useBinder([store], () => {
		setError(store.error);
		setLoading(store.fetching);
	});
	useBinder([store], () => setValues(store.values), 'reset');

	const onSubmit = () => {
		if (isButtonDisabled) return;
		store.login(values);
	};

	const loginWithGoogle = () => {
		store.login(values, Providers.Google);
	};

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setValues({
			...values,
			[name]: value,
		});
	};
	const errors: Record<string, string> = {
		USER_DOESNT_EXISTS: 'Invalid credentials, please check if you have entered the data correctly and try again.',
	};

	return (
		<article>
			<div>
				<span>Welcome back!!</span>
				<h1>Login</h1>

				<Alert type="error" message={errors[error as string] as string} />
			</div>
			<Form onSubmit={onSubmit}>
				<Input name="email" type="email" value={values.email} label="Email" onChange={onChange} />
				<Input name="password" type="password" value={values.password} label="Password" onChange={onChange} />

				<Button loading={loading} variant="primary" type="submit">
					Go
				</Button>
			</Form>

			<div className="or-container">
				<div />
				<span>or</span>
				<div />
			</div>
			<Button loading={loading} className="login-external-provider" variant="outline" onClick={loginWithGoogle}>
				Login with Google
			</Button>

			<footer className="flex justify-center items-center">
				<Link className="text-xs" href="/auth/forget-password">
					Forgot Password?
				</Link>
			</footer>
		</article>
	);
};
