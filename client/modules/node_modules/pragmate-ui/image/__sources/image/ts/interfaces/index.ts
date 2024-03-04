import { ImgHTMLAttributes, SyntheticEvent, ReactNode, SourceHTMLAttributes } from 'react';
export interface IProps extends ImgHTMLAttributes<HTMLImageElement> {
	graphSrc?: string;
	size?: string;
	children?: ReactNode;
	onError?: (e: SyntheticEvent<Element, Event>) => void;
	sources?: Array<ISrcSet>;
	sizeLoading?: {
		height: string,
		width: string
	};
}

export interface IInitialState {
	size?: string;
	error?: boolean;
	loaded?: boolean;
	url?: string;
	onload?: undefined;
	src?: string;
	htmlLoaded?: boolean;
	onerror?: undefined;
};

export type ISetState = React.Dispatch<React.SetStateAction<IInitialState>>

export interface IContext extends IProps {
	setState?: ISetState,
	state?: IInitialState
};

export interface ISrcSet {
	maxWidth?: number,
	minWidth?: number,
	srcSet: string
}
