import React from 'react';
import { useListViewContext } from '../../context';
import { Item } from '@beyond-js/reactive/entities';
import { v4 as uuid } from 'uuid';
import { DefaultRow } from './row';

export interface IRow {
	item: unknown;
	index: number;
}

export interface IList {
	row?: React.ComponentType<IRow>;
	default?: boolean;
	itemsConfig: {
		properties: string[];
	};
}

export const List = (props: IList) => {
	const { store } = useListViewContext();
	const Row = props?.row || DefaultRow;

	const output = store.collection.items.map((item: typeof Item, index: number) => {
		if (!Row) return null;
		return <Row key={uuid()} item={item} index={index} />;
	});

	let cls = props.default ? `default` : '';
	cls += store.fetching ? ` loading` : '';
	return <ul className={`list ${cls}`}>{output}</ul>;
};
