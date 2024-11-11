import { TextareaHTMLAttributes, ReactNode } from 'react';
export interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	ref?: any;
	errorMessage?: string;
	max?: string;
	lengthMessage?: string;
	hasError?: boolean;
	label?: string;
	value?: string;
	counter?: boolean;
	children?: ReactNode;
}

export type TValue = string | number | readonly string[];
export interface IState {
	value?: TValue;
	errorMessage: string;
	_hasError?: boolean;
}
