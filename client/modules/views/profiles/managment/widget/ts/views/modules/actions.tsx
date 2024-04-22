import React from 'react';
import { Action } from './action';

interface IProps {
	items: { id: string; name: string; description: string }[];
	moduleId: string;
}

export const Actions = ({ items, moduleId }: IProps) => {
	const output = items.map(item => <Action key={item.id} moduleId={moduleId} {...item} />);
	return <ul className="pl-4">{output}</ul>;
};
