import React from 'react';
import { ReactSelect } from 'pragmate-ui/form/react-select';

export /*bundle*/ const Select = props => {
	const multiValue = props.isMulti
		? props.value.map(value => props.options.find(option => option.value === value))
		: [];
	const value = props.isMulti ? multiValue : props.options.find(option => option.value === props.value);
	return (
		<div className="pui-input pui-select__container fixed-label">
			<label className="pui-input__label">
				<span className="label-content">{props?.label}</span>
			</label>

			<ReactSelect {...props} value={value} />
		</div>
	);
};
