import React from 'react';
import { Form as FormUI, Input, Switch } from 'pragmate-ui/form';
import { IUser } from '@essential-js/admin/models';
import { useUsersManagmentContext } from '../context';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { Button } from 'pragmate-ui/components';
import { routing } from '@beyond-js/kernel/routing';
import { toast } from 'react-toastify';
import { Select } from '@essential-js/admin/components/select';

const DEFAULT_VALUES = {
	names: '',
	email: '',
	lastNames: '',
	active: true,
	profiles: [],
};

export const Form = () => {
	const { store } = useUsersManagmentContext();
	const [values, setValues] = React.useState<Partial<IUser>>({
		names: store.item.names || DEFAULT_VALUES.names,
		email: store.item.email || DEFAULT_VALUES.email,
		lastNames: store.item.lastNames || DEFAULT_VALUES.lastNames,
		active: store.item.active || DEFAULT_VALUES.active,
		profiles: store.item.profiles || DEFAULT_VALUES.profiles,
	});
	const [isLoading, setIsLoading] = React.useState(store.fetching);
	const formatedOptions = store.profiles.items.map(item => ({ label: item.name, value: item.id }));

	useBinder([store], () => setIsLoading(store.fetching));
	if (!store.ready) return null;

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value: rawValue, type } = event.target;
		const value = type === 'checkbox' ? event.target.checked : rawValue;

		setValues({ ...values, [name]: value });
	};
	const onSelectChange = params => {
		const values = params.map(item => item.value);
		setValues(currentValues => ({ ...currentValues, profiles: values }));
	};

	const onSubmit = async () => {
		await store.save(values);
		const message = store.isCreating ? 'User created successfully' : 'User updated successfully';
		toast.success(message);
		routing.pushState('/users');
		store.reset();
	};

	const onCancel = () => {
		// setValues(DEFAULT_VALUES);
		// store.reset();
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

			<Select
				onChange={onSelectChange}
				options={formatedOptions}
				isMulti
				label="Profiles"
				value={values.profiles}
			/>

			<div className="pui-input">
				<label className="pui-switch__label">
					<Switch checked={values.active} name="active" onChange={onChange} />
					<span className="label-content"> Is active?</span>
				</label>
			</div>

			<div className="actions">
				<Button type="reset" variant="secondary" onClick={onCancel} disabled={isLoading}>
					Cancel
				</Button>
				<Button type="submit" variant="primary" loading={isLoading}>
					Save
				</Button>
			</div>
		</FormUI>
	);
};
