import React from 'react';
import { Form as FormUI, Input, Switch } from 'pragmate-ui/form';
import { IUser } from '@essential-js/admin/models';
import { useUsersManagmentContext } from '../context';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { Button } from 'pragmate-ui/components';
import { routing } from '@beyond-js/kernel/routing';
import { toast } from 'react-toastify';
export const Form = () => {
	const { store, texts } = useUsersManagmentContext();
	const [values, setValues] = React.useState<Partial<IUser>>({
		names: store.item.names || '',
		email: store.item.email || '',
		lastNames: store.item.lastNames || '',
		active: store.item.active || false,
	});
	const [isLoading, setIsLoading] = React.useState(store.fetching);

	useBinder([store], () => setIsLoading(store.fetching));

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value: rawValue, type } = event.target;
		const value = type === 'checkbox' ? event.target.checked : rawValue;

		setValues({ ...values, [name]: value });
	};

	const onSubmit = () => {
		store.save(values);
		toast.success(store.item.id ? 'User updated' : 'User created');
		routing.pushState('/users');
		store.reset();
	};

	const onCancel = () => {
		setValues({});
		store.reset();
		routing.pushState('/users');
	};

	return (
		<FormUI onSubmit={onSubmit} className="managment-form">
			<Input label={texts.labels.names} value={values.names} name="names" onChange={onChange} />
			<Input label={texts.labels.lastNames} value={values.lastNames} name="lastNames" onChange={onChange} />
			<Input label={texts.labels.email} value={values.email} name="email" onChange={onChange} />
			<Switch label={texts.labels.active} checked={values.active} name="active" onChange={onChange} />

			<div className="actions">
				<Button type="reset" variant="secondary" onClick={onCancel} disabled={isLoading}>
					{texts.actions.reset}
				</Button>
				<Button type="submit" fetching={isLoading}>
					{texts.actions.save}
				</Button>
			</div>
		</FormUI>
	);
};
