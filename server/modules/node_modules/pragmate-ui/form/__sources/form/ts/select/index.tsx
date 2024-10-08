import React from 'react';
import { OptionSelect } from './option';

export /*bundle */ function Select(props) {
	const { children } = props;
	const attributes = { ...props };
	delete attributes.children;
	delete attributes.options;

	const value = ![undefined, null].includes(props.value) ?? '';

	let output = [];
	if (props.options) {
		props.options.forEach((item, key) => {
			output.push(<OptionSelect {...item} key={key} />);
		});
	}
	const ramdon = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
	const id = props.id ?? `${name}-${performance.now()}.${ramdon}`;
	const cls = `pui-input-select`;

	return (
		<div className={cls}>
			<label htmlFor={id}>{props.label}</label>
			<select className={cls} {...attributes}>
				{output}
				{children}
			</select>
		</div>
	);
}
