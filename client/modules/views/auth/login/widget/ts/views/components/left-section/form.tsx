import React from 'react';
import { Form, Input } from 'pragmate-ui/form';
import { Button } from 'pragmate-ui/components';
import { useLoginContext } from '../../context';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { Providers } from '@essential-js/admin/auth';

const DEFAULT_VALUE = {
	email: 'brayanmc.contacto@gmail.com',
	password: 'Admin02*',
};

export const LeftSectionForm = () => {
	const [values, setValues] = React.useState(DEFAULT_VALUE);
	const [error, setError] = React.useState<string | null>(null);
	const isButtonDisabled = values.email === '' || values.password === '';
	const { store } = useLoginContext();

	useBinder([store], () => setError(store.error));

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


	return (
		<article>
			<div>
				<span>Welcome back!!</span>
				<h1>Login</h1>
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

				<Button variant="primary" type="submit">Go</Button>
			</Form>

			<div className="or-container">
				<div />
				<span>or</span>
				<div />
			</div>
			<Button variant="outline" onClick={loginWithGoogle}>
				Login with Google
			</Button>
		</article>
	);
};
