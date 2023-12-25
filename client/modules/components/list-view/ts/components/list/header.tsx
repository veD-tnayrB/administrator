import React from 'react';
import { v4 as uuid } from 'uuid';
import { useListViewContext } from '../../context';

export interface IHeader {
	items?: IHeaderItem;
}

export type IHeaderItem = JSX.Element[];

interface IProps {
	items?: IHeaderItem;
}

export const Header = (props: IProps) => {
	const { store } = useListViewContext();
	const output = props.items?.map((Item: React.ReactElement, index: number) => {
		if (typeof Item === 'string') return <li key={uuid()}>{Item}</li>;

		return React.cloneElement(Item, { key: uuid(), index });
	});

	const cls = store.fetching ? ` loading` : ``;
	return <ul className={`header ${cls}`}>{output}</ul>;
};
