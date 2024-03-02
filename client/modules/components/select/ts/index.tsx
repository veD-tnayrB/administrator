import React from 'react';
import { ReactSelect } from 'pragmate-ui/form/react-select';

export /*bundle*/ const Select = props => {
	return (
		<div className="pui-input pui-select__container fixed-label">
			<label className="pui-input__label">
				<span className="label-content">{props?.label}</span>
			</label>

			<ReactSelect {...props} />
		</div>
	);
};
