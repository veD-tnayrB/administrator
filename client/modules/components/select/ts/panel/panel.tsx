import React from 'react';
import { useSelectContext } from '../context';
import { Option } from './option';

export const Panel = () => {
	const { options } = useSelectContext();

	const output = options.map(option => <Option key={option.value} {...option} />);
	return <ul className="select-panel">{output}</ul>;
};
