import React from 'react';
import { useInputContext } from '../context';
import { ILabelProps } from '../interfaces';

export /*bundle */ function Label({ required, position, children }: ILabelProps = {}) {
	const { name, id } = useInputContext();

	const variants = {
		floating: 'floating-label',
		right: 'pui-input__label--right',
		bottom: 'pui-input__label--bottom',
		'bottom-right': 'pui-input__label--bottom-right',
	};

	let cls = `pui-input__label ${variants[position] ? ` ${variants[position]}` : ''}`;
	if (required) cls += ' is-required';
	return (
		<>
			<label htmlFor={id ?? name} className={cls}>
				<span className='label-content'> {children}</span>
			</label>
		</>
	);
}
