import React from 'react';
import { Form as FormUI, Input, Switch } from 'pragmate-ui/form';
import { useProfilesManagmentContext } from '../context';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { Button } from 'pragmate-ui/components';
import { routing } from '@beyond-js/kernel/routing';
import { toast } from 'react-toastify';
import { Modules } from './modules';

export interface IValues {
	name: string;
	description: string;
	active: boolean;
	modules: Record<string, Record<string, boolean>>;
}

export const Form = () => {
	const { store } = useProfilesManagmentContext();
	const [values, setValues] = React.useState<IValues>({
		name: store.item.name || '',
		description: store.item.description || '',
		active: store.item.active,
		modules: store.selectedModules,
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
		toast.success(store.item.id ? 'Profile updated successfully' : 'Profile created successfully');
		routing.pushState('/profiles');
		store.reset();
	};

	const onCancel = () => {
		store.reset();
		routing.pushState('/profiles');
	};
	const activeSwitchLabel = values.active ? 'Active' : 'Inactive';

	return (
		<FormUI onSubmit={onSubmit} className="managment-form">
			<Input className="fixed-label" label="Name" value={values.name} name="name" onChange={onChange} />
			<Input
				className="fixed-label"
				label="Description"
				value={values.description}
				name="description"
				onChange={onChange}
			/>
			<div className="pui-input">
				<label className="pui-switch__label">
					<Switch checked={values.active} name="active" onChange={onChange} />
					<span className="label-content">{activeSwitchLabel}</span>
				</label>
			</div>

			<Modules values={values} />

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
