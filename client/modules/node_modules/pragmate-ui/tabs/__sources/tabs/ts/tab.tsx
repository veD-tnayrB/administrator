import React from 'react';
import {useTabsContext} from './context';

export /*bundle */ function Tab(props) {
	const {children, index, disabled} = props;
	const {activeTab, setActiveTab, onChange} = useTabsContext();
	const cls = `tab ${index === activeTab ? 'active' : ''} ${disabled ? ' is-disabled' : ''}`;
	const onClick = event => {
		if (onChange) onChange(event, index);
		setActiveTab(index);
	};
	const attrs: {onClick?: (event) => void} = {};

	if (!disabled) attrs.onClick = onClick;

	return (
		<div className={cls} {...attrs}>
			{children}
		</div>
	);
}
