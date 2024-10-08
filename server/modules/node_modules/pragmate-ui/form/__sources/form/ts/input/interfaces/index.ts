import { InputHTMLAttributes, MutableRefObject, ReactNode } from 'react';

export interface IProps extends InputHTMLAttributes<HTMLInputElement> {
	ref?: any;
	variant?: string;
	icon?: string;
	errorMessage?: string;
	value?: string;
	label?: any;
	children?: ReactNode;
	hasError?: boolean;
	password?: boolean;
}

export interface IPropsState {
	value?: string;
	errorMessage: string;
	lengthMessage: string;
	emptyMessage: string;
	_hasError?: boolean;
	type: InputHTMLAttributes<HTMLInputElement>['type'];
}
export interface ILabelProps {
	position?: 'right' | 'bottom' | 'bottom-right' | 'floating';
	children?: React.ReactNode;
	required?: boolean;
}

export interface TState {
	value?: string | number | readonly string[];
	type?: InputHTMLAttributes<HTMLInputElement>['type'];
}

export interface IInputContextValue {
	state?: TState;
	id?: string;
	value?: string;
	name?: string;
	props?: IProps;
	setState?: any;
	setValue?: (value) => void;
	input?: MutableRefObject<HTMLInputElement>;
}

export interface IInputContainer {
	className?: string;
}
