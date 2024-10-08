import React, { InputHTMLAttributes, forwardRef, RefAttributes, useState, useEffect, MouseEvent } from 'react';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
}
export /*bundle*/ const Checkbox: React.FC<IProps & RefAttributes<HTMLInputElement>> = forwardRef(function (
	props: IProps,
	ref: React.Ref<HTMLInputElement>
): JSX.Element {
	const { checked, disabled, className, onChange, label } = props;
	const [value, setValue] = useState<boolean>(!!checked);

	useEffect(() => {
		if (checked === value) return
		setValue(!!checked);
	}, [checked]);
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		event.stopPropagation();
		setValue(!value);
		onChange && onChange(event);
	};
	let cls: string = `pui-checkbox ${className ? className : ''}`;
	cls += disabled ? ' disabled' : '';
	const properties: IProps = Object.assign({}, props);

	['className', 'checked', 'name', 'onChange'].forEach((prop: string): void => {
		delete properties[prop];
	});

	const ramdon = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
	const name = props.name ?? 'pui-checkbox--name';
	const id = props.id ?? `${name}-${performance.now()}.${ramdon}`;

	const handleClick = (event: MouseEvent) => event.stopPropagation();
	return (
		<div className={cls} onClick={handleClick}>
			<input
				ref={ref}
				type='checkbox'
				className='pui-checkbox--input'
				id={id}
				name={name}
				checked={value}
				onChange={handleChange}
				{...properties}
			/>
			<label className='pui-checkbox--label' htmlFor={id}>
				<span>
					<svg viewBox='0 0 12 9'>
						<polyline points='1 5 4 8 11 1'></polyline>
					</svg>
				</span>
				<span>{label}</span>
			</label>
		</div>
	);
});
