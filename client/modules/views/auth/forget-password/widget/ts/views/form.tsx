import { routing } from '@beyond-js/kernel/routing';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import config from '@essential-js/admin/config';
import { Alert } from 'pragmate-ui/alert';
import { Button } from 'pragmate-ui/components';
import { Form as FormPUI, Input } from 'pragmate-ui/form';
import { Image } from 'pragmate-ui/image';
import React from 'react';
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
		INVALID_EMAIL: store.texts.notFound,
		DEFAULT: store.texts.errors.somethingWentWrong,
	};

	const errorMessage = error
		? errors[error as string] || errors.DEFAULT
		: undefined;
	const sucessMessage =
		store.success && !error ? store.texts.success : undefined;
	const sendButtonMessage = store.isFirstTime
		? store.texts.accept
		: store.texts.resend;

	const iconUrl = '/assets/sidebar/logo-dark.svg';
	const name = config.params.application.company.name;

	return (
		<div className="left-section">
			<div className="logo">
				<Image alt={name} src={iconUrl} />
				<span>{name}</span>
			</div>

			<article>
				<div>
					<span>{store.texts.preTitle}</span>
					<h1>{store.texts.title}</h1>
				</div>

				<Alert type="error" message={errorMessage} />
				<Alert type="success" message={sucessMessage} />

				<FormPUI onSubmit={onSubmit}>
					<Input
						name="email"
						type="email"
						value={values.email}
						label="Email"
						onChange={onChange}
					/>

					<div className="actions w-full flex flex-col gap-4">
						<Button
							className="w-full"
							loading={loading}
							variant="primary"
							type="submit">
							{sendButtonMessage}
						</Button>

						<Button
							onClick={goBack}
							loading={loading}
							type="button">
							{store.texts.cancel}
						</Button>
					</div>
				</FormPUI>
			</article>
		</div>
	);
};
