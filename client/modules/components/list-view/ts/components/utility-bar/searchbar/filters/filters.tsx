import React from 'react';
import { Dialog } from '@essential-js/admin/components/dialog';
import { FiltersToggler } from './filters-toggler';
import { Form } from 'pragmate-ui/form';
import { Button } from 'pragmate-ui/components';
import { useListViewContext } from '../../../../context';

export interface IFilter extends React.HTMLAttributes<HTMLInputElement> {
	label: string;
	name?: string;
}

export interface IFilters {
	title?: string;
	label: string;
	actions: {
		apply: { label: string };
		reset: { label: string };
	};
}

export const FiltersSearch = (props: IFilters) => {
	const { store } = useListViewContext();
	const [isOpen, setIsOpen] = React.useState(false);
	const [values, setValues] = React.useState({});

	if (!props?.actions) return null;
	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValues({ ...values, [event.target.name]: event.target.value });
	};

	const onSubmit = async () => {
		await store.search(values);
		setIsOpen(false);
	};

	const reset = () => {
		const defaultValues = {};
		store.propertiesToSearch.forEach(item => (defaultValues[item.name] = ''));
		setValues(defaultValues);
		store.clearSearch();
		setIsOpen(false);
	};

	const output = store.propertiesToSearch.map(item => (
		<div key={item.name} className="pui-input">
			<input {...item} placeholder={item.label} value={values[item.name] || ''} onChange={onChange} />
		</div>
	));

	const options = {
		toggler: {
			children: <FiltersToggler label={props.label} />,
		},
		setIsOpen,
		isOpen,
	};

	const cls = isOpen ? 'open' : '';

	return (
		<div className={`filters ${cls}`}>
			<Dialog {...options}>
				<Form onSubmit={onSubmit}>
					<h4>{props.title}</h4>
					{output}
					<div className="actions">
						<Button onClick={reset} variant="secondary" type="reset">
							{props.actions.reset.label}
						</Button>
						<Button variant="primary" type="submit">
							{props.actions.apply.label}
						</Button>
					</div>
				</Form>
			</Dialog>
		</div>
	);
};
