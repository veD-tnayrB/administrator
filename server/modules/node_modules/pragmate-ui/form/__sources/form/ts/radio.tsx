import React, { useRef, MutableRefObject, ChangeEvent, InputHTMLAttributes, HTMLAttributes } from 'react';

interface props extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	className?: HTMLAttributes<HTMLDivElement>['className'];
}

export /*bundle*/ function Radio(props: props): JSX.Element {
	const input: MutableRefObject<HTMLInputElement> = useRef<HTMLInputElement>();

	
	const onClick = (event): void => {
		event.stopPropagation();
		input.current.checked = true;
		if (!!props.onChange) props.onChange(event);
	};

	const properties: props = { ...props };
	delete properties.onChange;

	const cls: string = `pragmate-element-radio ${properties.className ? properties.className : ''}`;

	return (
		<label className={cls} onClick={onClick}>
			<input ref={input} {...properties} type='radio' onChange={onClick} />
			{properties.label && <span>{properties.label}</span>}
		</label>
	);
}
