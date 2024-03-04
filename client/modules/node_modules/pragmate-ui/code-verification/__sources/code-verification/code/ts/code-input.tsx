import React, { ChangeEvent, KeyboardEvent, useState, useRef, MutableRefObject, useEffect } from 'react';
import Input from './input';
interface IProps {
	length?: number;
	onCodeFull?: (e: string) => void;
	className?: string;
	onlyNumber?: boolean;
	reset: any;
}
const defaultOnCodeFull: (code) => void = () => null;

/**
 * It's a React component that takes a length prop and an onCodeFull prop. It renders an array of
 * inputs, each of which is limited to one character. When the user enters a character, the component
 * updates the state with the character and focuses the next input. When the user presses backspace,
 * the component removes the last character from the state and focuses the previous input. When the
 * user enters the last character, the component calls the onCodeFull prop with the code as a string.
 * @param {props}  - props
 */
export /*bundle*/ function InputCode({ length, onCodeFull, className, onlyNumber, reset }: IProps): JSX.Element {
	type code = Array<string>;
	const [code, setCode] = useState<code>([]);
	const refs: MutableRefObject<HTMLInputElement[]> = useRef<HTMLInputElement[]>(Array(length));
	const onClean = (event: KeyboardEvent<HTMLInputElement>): void => {
		window.setTimeout(() => {
			if (event.which === 8 || event.key?.toLowerCase() === 'backspace') {
				if (code.length) setCode(code.slice(0, code.length - 1));
				return;
			}
		}, 0);
	};

	const preventDefault = (event: ChangeEvent<HTMLInputElement>): void => {
		const target: EventTarget & HTMLInputElement = event.currentTarget as HTMLInputElement;
		if (target.value.length > 1) {
			target.value = target.value[1];
			event.preventDefault();
			return;
		}
		if (!target.value.match(/\d/g) && onlyNumber) {
			target.value = target.value.replace(/[^0-9.]+/g, '');
			event.preventDefault();
			return;
		}
		setCode((currentCode: code): Array<string> => [...currentCode, target.value]);
	};

	const setFocus = (): void => refs.current[code.length]?.focus();
	const cls: string = className ? `${className} code-inputs` : 'code-inputs';
	useEffect(() => {
		if (refs.current[code.length]) refs.current[code.length].focus();
		onCodeFull(code.join(''));
	}, [code, length]);

	useEffect(() => {
		setCode([]);
	}, [reset]);
	const output: Array<JSX.Element> = [...Array(length)].map(
		(_, i: number): JSX.Element => (
			<Input
				value={code[i] ?? ''}
				key={i.toString()}
				ref={(el: HTMLInputElement): void => {
					refs.current[i] = el;
				}}
				onChange={preventDefault}
				onKeyDown={onClean}
				onFocus={setFocus}
			/>
		)
	);

	return <div className={cls}>{output}</div>;
}
InputCode.defaultPros = {
	onCodeFull: defaultOnCodeFull,
	length: 6,
};
