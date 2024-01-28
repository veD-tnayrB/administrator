import React from 'react';
import { Dialog } from '@essential-js/admin/components/dialog';
import { ColumnSelectorToggler } from './column-selector-toggler';
import { useListViewContext } from '../../../../../context';
import { Form, Checkbox } from 'pragmate-ui/form';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { toast } from 'react-toastify';

export interface IColumnSelector {
	label: string;
	min?: {
		number: number;
		label: string;
	};
	max?: {
		number: number;
		label: string;
	};
	title?: string;
}

export const ColumnsSelector = (props: IColumnSelector) => {
	const { store, header } = useListViewContext();
	const [, setUpdate] = React.useState({});
	useBinder([store], () => setUpdate({}), 'displaying-change');

	React.useMemo(() => {
		if (store.propertiesDisplaying.length) return;
		store.propertiesDisplaying = header.items.map(item => item.name);
	}, []);

	const options = {
		toggler: {
			children: <ColumnSelectorToggler {...props} />,
		},
	};

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = event.target;

		if (checked && store.propertiesDisplaying.length >= props?.max?.number) {
			toast.error(props.max.label.replace('{{number}}', props?.max?.number.toString()));
			return;
		}

		if (!checked && store.propertiesDisplaying.length <= props?.min?.number) {
			toast.error(props.min.label.replace('{{number}}', props?.min?.number.toString()));
			return;
		}

		if (!checked) store.propertiesDisplaying = store.propertiesDisplaying.filter(property => property !== name);
		else store.propertiesDisplaying = [...store.propertiesDisplaying, name];

		localStorage.setItem(store.id, JSON.stringify(store.propertiesDisplaying));
	};

	const output = header.items.map(property => {
		const isTheFirstTime = !!store.propertiesDisplaying.length;
		const isChecked = isTheFirstTime ? store.propertiesDisplaying.includes(property.name) : true;
		return (
			<Checkbox
				label={property.label}
				key={property.name}
				name={property.name}
				checked={isChecked}
				onChange={onChange}
			/>
		);
	});

	return (
		<div className="column-selector">
			<Dialog {...options}>
				<h4>{props.title}</h4>
				<Form>{output}</Form>
			</Dialog>
		</div>
	);
};
