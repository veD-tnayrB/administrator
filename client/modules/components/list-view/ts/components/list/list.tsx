import React from 'react';
import { useListViewContext } from '../../context';
import { DefaultRow, IRow } from './row';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { IAction as IModalAction } from '@essential-js/admin/components/modal';

export /*bundle*/ enum ItemActionType {
	EDIT = 'edit',
	DELETE = 'delete',
}

export /*bundle*/ interface IItemAction extends React.HTMLAttributes<HTMLButtonElement> {
	modal?: {
		title?: string;
		description?: string;
		close: IModalAction;
		confirm: IModalAction;
	};
	to?: string;
	type: ItemActionType;
}

interface IItemConfig {
	properties: string[];
	actions?: IItemAction[];
}

export interface IList {
	row?: React.ComponentType<IRow>;
	default?: boolean;
	itemsConfig: IItemConfig;
	isSelecteable?: boolean;
}

export const List = (props: IList) => {
	const { store, itemsProperties } = useListViewContext();
	const Row = props?.row || DefaultRow;
	const [, setUpdate] = React.useState({});
	useBinder([store], () => setUpdate({}), 'displaying-change');

	const propertiesToDisplay = itemsProperties.filter((item) => store.propertiesDisplaying.includes(item));

	const output = store.items.map((item: Record<string, any>, index: number) => {
		if (!Row) return null;
		return (
			<Row
				key={item.id}
				propertiesToDisplay={propertiesToDisplay}
				item={item}
				index={index}
				selectedItems={store.selectedItems}
			/>
		);
	});

	let cls = props.default ? `default` : '';
	cls += store.fetching ? ` loading` : '';
	return <ul className={`list ${cls}`}>{output}</ul>;
};
