import React from 'react';
import { Dialog } from '@essential-js/admin/components/dialog';
import { FiltersToggler } from './filters-toggler';
import { Input, Form } from 'pragmate-ui/form';
import { Button } from 'pragmate-ui/components';

interface IFilter extends React.HTMLAttributes<HTMLInputElement> {
	label: string;
	name?: string;
}

export interface IFilters {
	title?: string;
	items: IFilter[];
	actions: {
		apply: { label: string };
		reset: { label: string };
	};
}

export const FiltersSearch = (props: IFilters) => {
	const [values, setValues] = React.useState({});

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValues({
			...values,
			[event.target.name]: event.target.value,
		});
	};

	const output = props.items.map(item => (
		<Input
			key={item.name}
			placeholder={item.label}
			{...item}
			label=""
			value={values[item.name] || ''}
			onChange={onChange}
		/>
	));

	const options = {
		toggler: {
			children: <FiltersToggler />,
		},
	};
	return (
		<div className="filters">
			<Dialog {...options}>
				<Form>
					<h4>{props.title}</h4>

					{output}

					<div className="actions">
						<Button variant="secondary" type="reset">
							{props.actions.reset.label}
						</Button>
						<Button type="submit">{props.actions.apply.label}</Button>
					</div>
				</Form>
			</Dialog>
		</div>
	);
};
