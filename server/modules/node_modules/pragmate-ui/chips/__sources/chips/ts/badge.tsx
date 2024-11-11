import React from 'react';
import { RippleEffect } from 'pragmate-ui/ripple';
import tippy from 'tippy.js';
import { Icon } from 'pragmate-ui/icons';

export /*bundle*/ function Chip(props) {
	const { item, type, className, title, children, icon } = props;
	const properties = { ...props };
	const ref = React.useRef<HTMLSpanElement>(null);

	['children', 'type', 'className'].forEach(key => delete properties[key]);

	React.useEffect(() => {
		if (properties.onClick) {
			const ripple = new RippleEffect();
			ripple.addRippleEffect(ref.current);
		}
		if (title) tippy(ref.current);
	}, [properties.onClick, title]);

	if (title) properties['data-tippy-content'] = title;

	let cls = `pui-chip${type ? ` pui-chip--${type}` : ''}${className ? ` ${className}` : ''}`;

	if (properties.onClick) {
		cls += ` is-clickable`;
	}
	const showIcon = icon && <Icon icon={icon} />;

	return (
		<span ref={ref} className={cls} {...properties}>
			{item}
			{children}
			{showIcon}
		</span>
	);
}
