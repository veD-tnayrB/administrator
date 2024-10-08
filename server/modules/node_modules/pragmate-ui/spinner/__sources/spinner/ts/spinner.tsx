import React, { forwardRef, LegacyRef, RefAttributes } from 'react';
type properties = {
	color?: string;
	className?: string;
	type: string;
	size?: 'xs' | 'md' | 'lg' | 'xl';
	active?: boolean;
};
export /*bundle*/
const Spinner: React.FC<properties & RefAttributes<unknown>> = forwardRef(
	(props: properties, ref: LegacyRef<HTMLDivElement>): JSX.Element => {
		let { color, className, size, type, active } = props;

		const types = ['on-primary', 'on-secondary', 'on-surface', 'on-error', 'primary', 'secondary', 'tertiary'];
		const clsType = types.includes(type) ? type : 'primary';

		const style: { stroke?: string } = {};
		if (color) style.stroke = color;
		className = `${clsType}${className ? ` ${className}` : ''}`;
		let cls: string = className ? `${className} pragmate-element-spinner` : 'pragmate-element-spinner';
		if (active) cls += ' is-active';

		const sizes = {
			xs: 30,
			md: 40,
			lg: 50,
			xl: 60,
		};
		const circleSize = sizes[size] || 30;

		return (
			<div className={cls} ref={ref}>
				<svg viewBox="0 0 100 100">
					<circle cx="50" cy="50" r={circleSize} style={style} />
				</svg>
			</div>
		);
	}
);
