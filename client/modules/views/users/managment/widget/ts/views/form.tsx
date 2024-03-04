import React from 'react';
import { Input, Switch } from 'pragmate-ui/form';
import { useUsersManagmentContext } from '../context';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { Button } from 'pragmate-ui/components';
import { routing } from '@beyond-js/kernel/routing';
import { Select } from '@essential-js/admin/components/select';
import { Alert, ITypes as IAlert } from 'pragmate-ui/alert';

export const Form = () => {
	const { store } = useUsersManagmentContext();
	const [isLoading, setIsLoading] = React.useState(store.fetching);
	const [error, setError] = React.useState('');
	const formatedOptions = store.profiles.items.map(item => ({ label: item.name, value: item.id }));
	const [item, setItem] = React.useState(store.item.getProperties());

	useBinder([store], () => {
		setIsLoading(store.fetching);
		setError(store.error);
		setItem(store.item.getProperties());
	});

	if (!store.ready) return null;

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value: rawValue, type } = event.target;
		const value = type === 'checkbox' ? event.target.checked : rawValue;
		setItem(currentValue => ({ ...currentValue, [name]: value }));
	};
	const onSelectChange = params => {
		const values = params.map(item => item.value);
		setItem(currentValues => ({ ...currentValues, profiles: values }));
	};

	const onSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		store.save();
	};
	const onCancel = () => {
		routing.pushState('/users');
	};

	const activeSwitchLabel = item.active ? 'Active' : 'Inactive';

	return (
		<form onSubmit={onSubmit} className="managment-form">
			<Alert type={IAlert.Error}>{error}</Alert>
			<div className="flex gap-4 w-full">
				<Input
					className="fixed-label w-full"
					label="Names"
					value={item.names}
					name="names"
					placeholder="John"
					onChange={onChange}
					required
				/>
				<Input
					className="fixed-label w-full"
					label="Last names"
					placeholder="Doe"
					value={item.lastNames}
					name="lastNames"
					onChange={onChange}
				/>
			</div>
			<Input
				placeholder="johnDoe@gmail.com"
				className="fixed-label"
				label="Email"
				value={item.email}
				name="email"
				onChange={onChange}
			/>

			<Select
				onChange={onSelectChange}
				options={formatedOptions}
				isMulti
				label="Profiles"
				value={item.profiles || []}
			/>

			<div className="pui-input">
				<label className="pui-switch__label">
					<Switch checked={item.active} name="active" onChange={onChange} />
					<span className="label-content">{activeSwitchLabel}</span>
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
		</form>
	);
};
