import React from 'react';
export /*bundle */ function OptionSelect(props) {
	const { children } = props;
	const attributes = { ...props };
	delete attributes.children;

	return <option {...attributes}>{children}</option>;
}
