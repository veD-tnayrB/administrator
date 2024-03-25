import React from 'react';
import { Form as FormUI, Input } from 'pragmate-ui/form';
import { IUser } from '@essential-js/admin/models';
import { useNotificationsManagmentContext } from '../context';
import { Button } from 'pragmate-ui/components';
import { routing } from '@beyond-js/kernel/routing';
import { Tabs } from './tabs';
import { Frecuency } from './frecuency';

export const Form = () => {
	const { store } = useNotificationsManagmentContext();
	const [values, setValues] = React.useState<Partial<IUser>>(store.item.getProperties());

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value: rawValue, type } = event.target;
		const value = type === 'checkbox' ? event.target.checked : rawValue;

		setValues({ ...values, [name]: value });
	};

	const onSubmit = () => store.save(values);
	const onCancel = () => routing.pushState('/notifications');

	return (
		<FormUI onSubmit={onSubmit} className="managment-form">
			<Input
				placeholder="Your package has been delivered!"
				className="fixed-label"
				label="Title"
				value={values.title}
				name="title"
				onChange={onChange}
			/>
			<Input
				placeholder="Let us know if you have any problems and remember to rate us!"
				className="fixed-label"
				label="Description"
				value={values.description}
				name="description"
				onChange={onChange}
			/>

			<Input label="End date" value={values.endDate} type="date" className="fixed-label" />

			<Frecuency endDate={values.endDate} />
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

			<Tabs />

			<div className="actions">
				<Button type="reset" variant="secondary" onClick={onCancel} disabled={store.fetching}>
					Cancel
				</Button>
				<Button variant="primary" type="submit" disabled={store.fetching}>
					Save
				</Button>
			</div>
		</FormUI>
	);
};
