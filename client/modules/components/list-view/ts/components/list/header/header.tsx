import React from 'react';
import { v4 as uuid } from 'uuid';
import { useListViewContext } from '../../../context';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { Checkbox } from 'pragmate-ui/form';
import { Button } from 'pragmate-ui/components';
import { EditRemoveActions } from './edit-remove-actions';

export interface IHeader {
	items?: IHeaderItem;
}

interface IDefaultHeaderItem {
	label: string;
	name: string;
}

export type IHeaderItem = IDefaultHeaderItem[];

interface IProps {
	items?: IHeaderItem;
}

export const Header = (props: IProps) => {
	const { store, list } = useListViewContext();
	const [, setUpdate] = React.useState({});
	useBinder([store], () => setUpdate({}), 'displaying-change');

	const selectedItems = props.items.filter(item => store.propertiesDisplaying.includes(item.name));

	const output = selectedItems?.map(Item => {
		return <li key={uuid()}>{Item.label as React.ReactNode}</li>;
	});

	const includeSelectAll = list.isSelecteable;
	const cls = store.fetching ? ` loading` : ``;
	return (
		<ul className={`header ${cls}`}>
			{includeSelectAll && (
				<li className="check-all">
					<Checkbox checked={store.isAllPageSelected} onChange={store.selectAllItems} />
				</li>
			)}

			{output}
			<EditRemoveActions />
		</ul>
	);
};
