import { routing } from '@beyond-js/kernel/routing';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { Alert, ITypes as IAlert } from 'pragmate-ui/alert';
import { Button } from 'pragmate-ui/components';
import { Form as FormUI, Input, Switch, Textarea } from 'pragmate-ui/form';
import React from 'react';
import { useProfilesManagmentContext } from '../context';
import { Modules } from './modules';
import { Widgets } from './widgets';

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
	const [error, setError] = React.useState(store.error);
	const [isLoading, setIsLoading] = React.useState(store.fetching);

	useBinder([store], () => {
		setIsLoading(store.fetching);
		setError(store.error);
	});

	const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value: rawValue, type } = event.target;
		const value = type === 'checkbox' ? (event.target as HTMLInputElement).checked : rawValue;
		setValues({ ...values, [name]: value });
	};

	const onSubmit = async () => {
		store.save(values);
	};

	const onCancel = () => {
		store.reset();
		routing.pushState('/profiles');
	};
	const activeSwitchLabel = values.active ? 'Active' : 'Inactive';

	return (
		<FormUI onSubmit={onSubmit} className="managment-form">
			<Alert type={IAlert.Error}>{error}</Alert>

			<Input
				placeholder="Deliveryman"
				className="fixed-label"
				label="Name"
				value={values.name}
				name="name"
				onChange={onChange}
			/>
			<Textarea
				placeholder="He is in charge of delivering the packages, he is allowed to see on the dashboard the number of packages he delivered during the day and how much he is paid."
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
			<Widgets values={values} />

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
