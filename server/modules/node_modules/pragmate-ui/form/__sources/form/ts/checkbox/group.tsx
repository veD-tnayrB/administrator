import React from 'react';
import { Checkbox } from './index';

export /*bundle*/ function CheckboxGroup(props) {
	const { options } = props;
	console.log(100, props);
	const output = options.map((option, index) => {
		const random = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
		const key = `${performance.now()}-${random}`
		const { label, ...rest } = option;
		return <Checkbox key={key} label={label} {...rest} />;
	});

	const directions = {
		column: 'column',
		row: 'row',
	};
	const direction = props.direction ?? `row`;
	const cls = `pui-checkbox-group pui-checkbox-group--${directions[direction]}`; // `pui-checkbox-group $;

	return (
		<div className={cls}>
			{props.label && <span className='pui-label'>{props.label}</span>}
			<div className='pui-group__items-container'>{output}</div>
		</div>
	);
}
