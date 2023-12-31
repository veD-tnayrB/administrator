import React from 'react';
import { v4 as uuid } from 'uuid';
import { useListViewContext } from '../../context';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';

const getValue = (obj: Object, prop: string) => {
	return prop.split('.').reduce((o, p) => (o || {})[p], obj);
};

export const DefaultRow = ({ item }) => {
	const { itemsProperties, store } = useListViewContext();
	const [, setUpdate] = React.useState({});
	useBinder([store], () => setUpdate({}), 'displaying-change');

	const propertiesToDisplay = itemsProperties.filter(item => store.propertiesDisplaying.includes(item));

	const output = propertiesToDisplay.map(property => {
		const value = getValue(item, property);
		return <span key={uuid()}>{value}</span>;
	});
	return <li className="row default-row">{output}</li>;
};
