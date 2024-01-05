import React from 'react';
import { Form as FormUI, Input, Switch } from 'pragmate-ui/form';
import { IUser } from '@essential-js/admin/models';
import { useNotificationsManagmentContext } from '../context';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { Button } from 'pragmate-ui/components';
import { routing } from '@beyond-js/kernel/routing';
import { toast } from 'react-toastify';

export const Form = () => {
	const { store, texts } = useNotificationsManagmentContext();
	const [values, setValues] = React.useState<Partial<IUser>>({
		title: store.item.title || '',
		description: store.item.description || '',
		timeInterval: store.item.timeInterval || 0,
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
		toast.success(store.isCreating ? texts.success.created : texts.success.updated);
		routing.pushState('/notifications');
		store.reset();
	};

	const onCancel = () => {
		setValues({});
		store.reset();
		routing.pushState('/notifications');
	};

	return (
		<FormUI onSubmit={onSubmit} className="managment-form">
			<Input label={texts.labels.title} value={values.title} name="title" onChange={onChange} />
			<Input label={texts.labels.description} value={values.description} name="description" onChange={onChange} />
			<Input
				label={texts.labels.timeInterval}
				value={values.timeInterval}
				name="timeInterval"
				type="number"
				onChange={onChange}
			/>
			{/* <div className="pui-input">
				<label className="pui-input__label">
					<Switch checked={values.active} name="active" onChange={onChange} />
					<span className="label-content"> {texts.labels.active}</span>
				</label>
			</div> */}

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
