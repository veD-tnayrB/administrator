import React from 'react';
import { v4 as uuid } from 'uuid';

export const DefaultRow = ({ item }) => {
	const output = item.properties.map(property => {
		if (typeof item[property] === 'object') return null;

		const value = item[property] === true ? 'OK' : item[property] || '';
		return <span key={uuid()}>{value}</span>;
	});
	return <li className="row default-row">{output}</li>;
};
