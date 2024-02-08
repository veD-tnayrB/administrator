import React from 'react';
import { Form as FormUI, Input, Switch } from 'pragmate-ui/form';
import { IUser } from '@essential-js/admin/models';
import { useUsersManagmentContext } from '../context';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { Button } from 'pragmate-ui/components';
import { routing } from '@beyond-js/kernel/routing';
import { toast } from 'react-toastify';
export const Form = () => {
	const { store } = useUsersManagmentContext();
	const [values, setValues] = React.useState<Partial<IUser>>({
		names: store.item.names || '',
		email: store.item.email || '',
		lastNames: store.item.lastNames || '',
		active: store.item.active || true,
	});
	const [isLoading, setIsLoading] = React.useState(store.fetching);

	useBinder([store], () => setIsLoading(store.fetching));

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value: rawValue, type } = event.target;
		const value = type === 'checkbox' ? event.target.checked : rawValue;

		setValues({ ...values, [name]: value });
	};

	const onSubmit = async () => {
		await store.save(values);
		toast.success(store.item.id ? 'User updated successfully' : 'User created successfully');
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
			<Input label="Names" value={values.names} name="names" onChange={onChange} />
			<Input label="Last names" value={values.lastNames} name="lastNames" onChange={onChange} />
			<Input label="Email" value={values.email} name="email" onChange={onChange} />
			<div className="pui-input">
				<label className="pui-input__label">
					<Switch checked={values.active} name="active" onChange={onChange} />
					<span className="label-content"> Is active?</span>
				</label>
			</div>

			<div className="actions">
				<Button type="reset" variant="secondary" onClick={onCancel} disabled={isLoading}>
					Cancel
				</Button>
				<Button type="submit" variant="primary" fetching={isLoading}>
					Save
				</Button>
			</div>
		</FormUI>
	);
};
