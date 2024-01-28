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
	const [error, setError] = React.useState('');
	const isButtonDisabled = values.email === '' || values.password === '';
	const { store, texts } = useLoginContext();

	useBinder([store], () => setError(store.error));

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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

	const ERRORS = {
		'Item not found': texts.errors.notFound,
	};
	const message = error && (ERRORS[error] || texts.errors.somethingWentWrong);

	return (
		<article>
			<div>
				<span>{texts.preTitle}</span>
				<h1>{texts.title}</h1>
			</div>
			<Form onSubmit={onSubmit}>
				<Input
					error={message}
					name="email"
					type="email"
					value={values.email}
					label={texts.fields.email}
					onChange={onChange}
				/>
				<Input
					error={message}
					name="password"
					type="password"
					value={values.password}
					label={texts.fields.password}
					onChange={onChange}
				/>

				<Button variant="primary" type="submit">{texts.submit}</Button>
			</Form>

			<div className="or-container">
				<div />
				<span>{texts.or}</span>
				<div />
			</div>
			<Button variant="outline" onClick={loginWithGoogle}>
				{texts.loginWithGoogle}
			</Button>
		</article>
	);
};
