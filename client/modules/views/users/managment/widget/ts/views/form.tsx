import React from 'react';
import { Form as FormUI, Input, Switch } from 'pragmate-ui/form';
import { IUser } from '@essential-js/admin/models';
import { useUsersManagmentContext } from '../context';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { Button } from 'pragmate-ui/components';
import { routing } from '@beyond-js/kernel/routing';
import { toast } from 'react-toastify';
import { Select } from '@essential-js/admin/components/select';

export const Form = () => {
	const { store } = useUsersManagmentContext();
	const [values, setValues] = React.useState<Partial<IUser>>({
		names: store.item.names || '',
		email: store.item.email || '',
		lastNames: store.item.lastNames || '',
		active: store.item.active || true,
	});
	const [isLoading, setIsLoading] = React.useState(store.fetching);
	const formatedOptions = store.profiles.items.map(item => ({ label: item.name, value: item.id }));
	console.log('STORE.ITEM => ', store.item);

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
			<div className="flex gap-4 w-full">
				<Input
					className="fixed-label w-full"
					label="Names"
					value={values.names}
					name="names"
					placeholder="John"
					onChange={onChange}
				/>
				<Input
					className="fixed-label w-full"
					label="Last names"
					placeholder="Doe"
					value={values.lastNames}
					name="lastNames"
					onChange={onChange}
				/>
			</div>
			<Input
				placeholder="johnDoe@gmail.com"
				className="fixed-label"
				label="Email"
				value={values.email}
				name="email"
				onChange={onChange}
			/>
			<div className="pui-input">
				<label className="pui-switch__label">
					<Switch checked={values.active} name="active" onChange={onChange} />
					<span className="label-content"> Is active?</span>
				</label>
			</div>

			<Select options={formatedOptions} isMulti label="Profiles" />

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
