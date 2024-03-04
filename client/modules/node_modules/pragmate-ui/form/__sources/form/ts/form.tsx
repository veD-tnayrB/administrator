import React, { FormHTMLAttributes, FormEvent, PropsWithChildren } from 'react';

type props = FormHTMLAttributes<HTMLFormElement>;
export /*bundle*/ function Form(props: PropsWithChildren<props>): JSX.Element {
	const { onSubmit, ...restProps } = props;
	const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		event.stopPropagation();
		props.onSubmit(event);
	};

	return (
		<form onSubmit={handleSubmit} {...restProps}>
			{props.children}
		</form>
	);
}
