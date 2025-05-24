import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { Providers } from '@essential-js/admin/auth';
import { AppIcon } from '@essential-js/admin/components/ui';
import { Alert } from 'pragmate-ui/alert';
import { Button } from 'pragmate-ui/components';
import { Form, Input } from 'pragmate-ui/form';
import { Link } from 'pragmate-ui/link';
import React from 'react';
import { useLoginContext } from '../../context';

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
		USER_DOESNT_EXISTS: store.texts.errors.notFound,
		SOMETHING_WENT_WRONG: store.texts.errors.somethingWentWrong,
	};

	return (
		<article>
			<div className="header-container">
				<h1>{store.texts.title}</h1>
				<span className="pretitle">{store.texts.preTitle}</span>

				<Alert
					type="error"
					message={errors[error as string] as string}
				/>
			</div>
			<Form onSubmit={onSubmit}>
				<Input
					name="email"
					type="email"
					value={values.email}
					label="Email"
					onChange={onChange}
				/>
				<Input
					name="password"
					type="password"
					value={values.password}
					label="Password"
					onChange={onChange}
				/>

				<Button loading={loading} variant="primary" type="submit">
					{store.texts.submit}
				</Button>
			</Form>

			<div className="or-container">
				<div />
				<span>{store.texts.or}</span>
				<div />
			</div>
			<Button
				loading={loading}
				className="login-external-provider"
				variant="outline"
				onClick={loginWithGoogle}>
				<AppIcon icon="google" />
				{store.texts.loginWithGoogle}
			</Button>

			<footer className="flex justify-center items-center">
				<Link className="text-xs" href="/auth/forget-password">
					{store.texts.forgotPassword}
				</Link>
			</footer>
		</article>
	);
};
