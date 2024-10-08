import React from 'react';
import { useImageContext } from '../context';
import { Item } from './item';

export function Sources() {
	const { sources } = useImageContext();
	if (!sources || !Array.isArray(sources) || !sources.length) return null;
	const output: JSX.Element[] = sources.map(item => <Item key={item.srcSet} {...item} />);
	return <>{output}</>;
}
