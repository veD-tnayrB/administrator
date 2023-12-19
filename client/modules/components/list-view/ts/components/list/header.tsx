import React from 'react';
import { v4 as uuid } from 'uuid';

export type IHeaderItem = JSX.Element[];

interface IProps {
	items?: IHeaderItem;
}

export const Header = (props: IProps) => {
	const output = props.items?.map((Item: React.ReactElement, index: number) => {
		if (typeof Item === 'string') return <li key={uuid()}>{Item}</li>;

		return React.cloneElement(Item, { key: uuid(), index });
	});
	return <ul className="header">{output}</ul>;
};
