import React from 'react';
import { Dialog } from '@essential-js/admin/components/dialog';
import { ColumnSelectorToggler } from './column-selector-toggler';
import { useListViewContext } from '../../../../../context';
import { Form, Checkbox } from 'pragmate-ui/form';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { toast } from 'react-toastify';

export interface IColumnSelector {
	label?: string;
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
	const [isOpen, setIsOpen] = React.useState<boolean | null>(false);
	useBinder([store], () => setUpdate({}), 'displaying-change');

	if (!header || !header.items) {
		console.error("Column selector can't work without header items");
		return null;
	}

	const max = props.max || { number: header.items.length, label: "You can't select more than {{number}} columns" };
	const min = props.min || { number: 2, label: "You can't select less than {{number}} columns" };

	React.useMemo(() => {
		if (store.propertiesDisplaying.length || !header.items) return;
		store.propertiesDisplaying = header.items?.map((item) => item.name);
	}, []);

	const options = {
		toggler: {
			children: <ColumnSelectorToggler {...props} />,
		},
		isOpen: !!isOpen,
		setIsOpen,
	};

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = event.target;

		if (checked && store.propertiesDisplaying.length >= (max.number || 0)) {
			toast.error(props.max?.label?.replace('{{number}}', props.max?.number?.toString() || ''));
			return;
		}

		if (!checked && store.propertiesDisplaying.length <= (min.number || 0)) {
			toast.error(props.min?.label?.replace('{{number}}', props.min?.number?.toString() || ''));
			return;
		}

		if (!checked) {
			store.propertiesDisplaying = store.propertiesDisplaying.filter((property) => property !== name);
		} else {
			store.propertiesDisplaying = [...store.propertiesDisplaying, name];
		}

		localStorage.setItem(store.id, JSON.stringify(store.propertiesDisplaying));
	};

	const cleanedItems = header.items.filter((property) => property.name);

	const output = cleanedItems.map((property) => {
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
	const cls = isOpen ? 'open' : '';

	return (
		<div className={`column-selector ${cls}`}>
			<Dialog {...options}>
				<h4>{props?.title || 'Select the columns you want to appear'}</h4>
				<Form>{output}</Form>
			</Dialog>
		</div>
	);
};
