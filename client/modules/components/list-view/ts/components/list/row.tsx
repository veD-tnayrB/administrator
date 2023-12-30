import React from 'react';
import { v4 as uuid } from 'uuid';
import { useListViewContext } from '../../context';

const getValue = (obj: Object, prop: string) => {
	return prop.split('.').reduce((o, p) => (o || {})[p], obj);
};

export const DefaultRow = ({ item }) => {
	const { itemsProperties } = useListViewContext();

	const output = itemsProperties.map(property => {
		const value = getValue(item, property);
		return <span key={uuid()}>{value}</span>;
	});
	return <li className="row default-row">{output}</li>;
};
