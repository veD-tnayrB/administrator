import { routing } from '@beyond-js/kernel/routing';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { IModule } from '@essential-js/admin/models';
import DOMPurify from 'dompurify';
import { Alert, ITypes as IAlert } from 'pragmate-ui/alert';
import { Button } from 'pragmate-ui/components';
import { Input, Switch, Textarea } from 'pragmate-ui/form';
import React from 'react';
import { useModulesManagmentContext } from '../context';
import { Actions } from './actions';

export const Form = () => {
	const { store, item, setItem } = useModulesManagmentContext();
	const [isLoading, setIsLoading] = React.useState(store.fetching);
	const [error, setError] = React.useState('');

	useBinder([store], () => {
		setIsLoading(store.fetching);
		setError(store.error);
	});

	useBinder([store], () => setItem(store.item.getProperties()), 'hide');

	const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value: rawValue, type } = event.target;
		const value = type === 'checkbox' ? (event.target as HTMLInputElement).checked : rawValue;
		setItem((currentValue: IModule) => ({ ...currentValue, [name]: value }));
	};

	const onSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		store.save(item);
	};

	const onCancel = () => {
		routing.pushState('/modules');
	};

	const cleanIcon = { __html: DOMPurify.sanitize(item.icon) };

	const activeSwitchLabel = item.active ? 'Active' : 'Inactive';

	return (
		<form onSubmit={onSubmit} className="managment-form">
			<Alert type={IAlert.Error}>{error}</Alert>
			<div className="flex gap-4 w-full">
				<Input
					className="fixed-label w-full"
					label="Label"
					value={item.label}
					name="label"
					placeholder="Profiles"
					onChange={onChange}
					required
				/>
				<Input
					className="fixed-label w-full"
					label="Url"
					placeholder="/profiles"
					value={item.to}
					name="to"
					onChange={onChange}
				/>
			</div>

			<div className="flex icon-handler">
				<Textarea className="w-half" value={item.icon} onChange={onChange} name="icon" id="icon" label="Icon" />
				<div
					className="icon-container flex items-center justify-center w-half"
					dangerouslySetInnerHTML={cleanIcon}
				/>
			</div>

			<Actions />

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
