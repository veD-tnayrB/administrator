import React from 'react';
export /*bundle*/ function Chips(props) {
	const { children } = props;

	const properties = { ...props };
	['items', 'type'].forEach(key => delete properties[key]);

	const cls = `${props.type ? `pui-chip__container--${props.type}` : ''}`;
	properties.className = `pui-chip__container${properties.className ? ` ${properties.className}` : ''} ${cls}`;

	return (
		<div {...properties}>
			<div className='content-chip'>{children}</div>
		</div>
	);
}
