import React from 'react';
import { v4 as uuid } from 'uuid';
import { useListViewContext } from '../../../context';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { Checkbox } from 'pragmate-ui/form';
import { IHeaderActionButton, RemoveAction } from './remove-actions';

export interface IHeader {
	items?: IHeaderItem;
	actions: {
		edit: IHeaderActionButton;
		remove: IHeaderActionButton;
	};
}

interface IDefaultHeaderItem {
	label: string;
	name: string;
}

export type IHeaderItem = IDefaultHeaderItem[];

interface IProps {
	items?: IHeaderItem;
	bulkActions: {
		remove: boolean;
	};
}

export const Header = (props: IProps) => {
	const { store, list } = useListViewContext();
	const [, setUpdate] = React.useState({});
	useBinder([store], () => setUpdate({}), 'displaying-change');

	const selectedItems = props.items.filter(item => store.propertiesDisplaying.includes(item.name));

	const output = selectedItems?.map(Item => {
		return (
			<li key={uuid()}>
				<div className="label">{Item.label as React.ReactNode}</div>
			</li>
		);
	});

	const includeBuilkRemove = props.bulkActions.remove;

	const includeSelectAll = list.isSelecteable;
	const cls = store.fetching ? ` loading` : ``;
	return (
		<ul className={`header ${cls}`}>
			{includeSelectAll && (
				<li className="check-all">
					<div className="check-container">
						<Checkbox checked={store.isAllPageSelected} onChange={store.selectAllItems} />
					</div>
				</li>
			)}

			{output}
			{includeBuilkRemove && <RemoveAction />}
		</ul>
	);
};
