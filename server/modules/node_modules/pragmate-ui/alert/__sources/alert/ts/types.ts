export interface IProps {
	show?: boolean;
	className?: string;
	type?: ITypes;
	message?: string;
	title?: string;
	closable?: boolean;
	onClose?: () => boolean | Promise<boolean>;
	children?: React.ReactNode;
	icon?: boolean | string;
}

export /*bundle*/ enum ITypes {
	Error = 'error',
	Warning = 'warning',
	Success = 'success',
	Info = 'info',
}

export interface IIconMap {
	[key: string]: string;
}

export type AlertAttributes = {
	onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
	className: string;
};
