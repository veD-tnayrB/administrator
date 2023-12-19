import React from 'react';
import { Form as FormUI, Input } from 'pragmate-ui/form';
import { IUser } from '@essential-js/admin/models';
import { useUsersManagmentContext } from '../context';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';

export const Form = () => {
	const { store, texts } = useUsersManagmentContext();
	const [values, setValues] = React.useState<Partial<IUser>>({ names: '', email: '', lastNames: '', active: true });
	const [isLoading, setIsLoading] = React.useState(store.fetching);

	useBinder([store], () => setIsLoading(store.fetching));

	const onChange = () => {};

	return (
		<FormUI className="managment-form">
			<Input label={texts.labels.names} value={values.names} name="names" onChange={onChange} />
			<Input label={texts.labels.lastNames} value={values.lastNames} name="lastNames" onChange={onChange} />
			<Input label={texts.labels.email} value={values.email} name="email" onChange={onChange} />
		</FormUI>
	);
};
