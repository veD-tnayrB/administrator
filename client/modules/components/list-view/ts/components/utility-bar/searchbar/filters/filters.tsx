import React from 'react';
import { Dialog } from '@essential-js/admin/components/dialog';
import { FiltersToggler } from './filters-toggler';
import { Form } from 'pragmate-ui/form';
import { Button } from 'pragmate-ui/components';
import { useListViewContext } from '../../../../context';
import { Modal } from '@essential-js/admin/components/modal';

export interface IFilter extends React.HTMLAttributes<HTMLInputElement> {
	label: string;
	name: string;
}

export interface IFilters {
	title?: string;
	label?: string;
	actions?: {
		apply: { label: string };
		reset: { label: string };
	};
}

export const FiltersSearch = (props: IFilters) => {
	const { store } = useListViewContext();
	const [isOpen, setIsOpen] = React.useState<boolean | null>(false);
	const [values, setValues] = React.useState<Record<string, string>>({});

	if (!props?.actions) return null;
	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValues({ ...values, [event.target.name]: event.target.value });
	};

	const onSubmit = async () => {
		const toSearchValues: Record<string, string> = {};
		Object.keys(values).forEach((property) => {
			if (values[property]) toSearchValues[property] = values[property];
		});

		await store.search(toSearchValues);
		setIsOpen(false);
	};

	const reset = () => {
		const defaultValues: Record<string, string> = {};
		store.specificFilters.forEach((item) => {
			const key = item.name;
			defaultValues[key] = '';
		});

		setValues(defaultValues);
		store.clearSearch();
		setIsOpen(false);
	};

	const output = store.specificFilters.map((item) => (
		<div key={item.name} className="pui-input">
			<input {...item} placeholder={item.label} value={values[item.name] || ''} onChange={onChange} />
		</div>
	));

	const cls = isOpen ? 'open' : '';

	return (
		<div className={`filters ${cls}`}>
			<FiltersToggler setIsOpen={setIsOpen} label={props.label} />

			{isOpen && (
				<Modal>
					<Form onSubmit={onSubmit}>
						<h4 className="text-2xl">{props.title}</h4>
						<div className="content">{output}</div>
						<div className="actions">
							<Button onClick={reset} variant="secondary" type="reset">
								{props.actions.reset.label || 'Reset'}
							</Button>
							<Button variant="primary" type="submit">
								{props.actions.apply.label || 'Confirm'}
							</Button>
						</div>
					</Form>
				</Modal>
			)}
		</div>
	);
};
