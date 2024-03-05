import React from 'react';
import { Form as FormUI, Input, Switch } from 'pragmate-ui/form';
import { IUser } from '@essential-js/admin/models';
import { useNotificationsManagmentContext } from '../context';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { Button } from 'pragmate-ui/components';
import { routing } from '@beyond-js/kernel/routing';
import { toast } from 'react-toastify';

export const Form = () => {
	const { store } = useNotificationsManagmentContext();
	const [values, setValues] = React.useState<Partial<IUser>>(store.item.getProperties());
	const [isLoading, setIsLoading] = React.useState(store.fetching);

	useBinder([store], () => setIsLoading(store.fetching));

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value: rawValue, type } = event.target;
		const value = type === 'checkbox' ? event.target.checked : rawValue;

		setValues({ ...values, [name]: value });
	};

	const onSubmit = () => {
		store.save(values);
	};

	const onCancel = () => {
		routing.pushState('/notifications');
	};

	return (
		<FormUI onSubmit={onSubmit} className="managment-form">
			<Input className="fixed-label" label="Title" value={values.title} name="title" onChange={onChange} />
			<Input
				className="fixed-label"
				label="Description"
				value={values.description}
				name="description"
				onChange={onChange}
			/>
			{/* <Input
				label={texts.labels.timeInterval}
				value={values.timeInterval}
				name="timeInterval"
				type="number"
				onChange={onChange}
			/> */}
			{/* <div className="pui-input">
				<label className="pui-input__label">
					<Switch checked={values.active} name="active" onChange={onChange} />
					<span className="label-content"> {texts.labels.active}</span>
				</label>
			</div> */}

			<div className="actions">
				<Button type="reset" variant="secondary" onClick={onCancel} disabled={isLoading}>
					Cancel
				</Button>
				<Button variant="primary" type="submit" fetching={isLoading}>
					Save
				</Button>
			</div>
		</FormUI>
	);
};
