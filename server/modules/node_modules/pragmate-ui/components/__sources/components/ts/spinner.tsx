import React, { forwardRef, LegacyRef, RefAttributes } from 'react';
type properties = {
	color?: string;
	className?: string;
	type?: string;
	size?: 'xs' | 'md' | 'lg' | 'xl';
	active: boolean;
};

const Component = (props: properties, ref: LegacyRef<HTMLDivElement>): JSX.Element => {
	let { color, className, size, type, active } = props;
	size = size ? size : 'xs';
	const types = ['on-primary', 'on-secondary', 'on-surface', 'on-error', 'primary', 'secondary', 'tertiary'];
	const clsType = types.includes(type) ? type : 'primary';

	const style: { stroke?: string } = {};
	if (color) style.stroke = color;
	className = `${clsType}${className ? ` ${className}` : ''}`;
	let cls: string = `${className ? `${className} ` : ''}pragmate-element-spinner spinner--${size}`;
	if (active) cls += ' is-active';

	return (
		<div className={cls} ref={ref}>
			<svg viewBox='0 0 100 100'>
				<circle cx='50' cy='50' r='30' style={style} />
			</svg>
		</div>
	);
};
export /*bundle*/
const Spinner: React.FC<properties & RefAttributes<unknown>> = forwardRef(Component);
