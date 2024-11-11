import React, { MutableRefObject, useRef } from 'react';
import { useState } from 'react';
import type { IInputContainer, IInputContextValue, ILabelProps, IProps, TState } from './interfaces';
import { InputContext } from './context';
import { Label } from './components/label';
import { ControlSelector } from './control';
import { Error } from './components/error';

/**
 *
 * @param props
 *
 * 1. pattern property + existing error.
 * 2. Controlled Input where the implementer defines the error.
 * 3. Automated Input with multiple validations and error management.
 *
 * @returns
 */
export /*bundle*/
function Input(props: IProps): JSX.Element {
	const { hasError, errorMessage, variant, className, label, children, icon, type } = props;
	const [value, setValue] = React.useState<string>(props.value ?? '');
	const [state, setState] = useState<TState>({ type });
	const input: MutableRefObject<HTMLInputElement> = useRef(null);
	let cls: string = `pui-input${className ? ` ${className}` : ''}`;
	if (props.type === 'date') cls += ' pui-input--date';
	if (!!icon) cls += ' pui-input--icon';
	if (!!icon && variant === 'floating') cls += ' icon__floating';
	if (props.type === 'password') cls += ' pui-input--password';
	const variants = {
		unstyled: 'pui-input--unstyled',
		floating: 'pui-input--floating',
	};

	if (props.variant && variants[props.variant]) cls += ` ${variants[props.variant]}`;

	const providerValue: IInputContextValue = { props, state, setState, value, setValue, input };
	const labelSpecs: ILabelProps = { required: props.required };
	const attrs: IInputContainer = {};
	/**
	 * todo: review it.
	 */
	if (variant === 'floating') labelSpecs.position = variant;
	if (variant !== 'unstyled') attrs.className = cls;

	return (
		<InputContext.Provider value={providerValue}>
			<div className={cls}>
				<ControlSelector />
				{children}
				{label && <Label {...labelSpecs}>{label}</Label>}
				{errorMessage && <Error show={!!hasError} message={errorMessage} />}
			</div>
		</InputContext.Provider>
	);
}
