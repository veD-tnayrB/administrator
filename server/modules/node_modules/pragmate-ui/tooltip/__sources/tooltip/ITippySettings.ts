export interface ITippySettings {
	content?: string | HTMLElement;
	placement?:
		| 'top'
		| 'top-start'
		| 'top-end'
		| 'right'
		| 'right-start'
		| 'right-end'
		| 'bottom'
		| 'bottom-start'
		| 'bottom-end'
		| 'left'
		| 'left-start'
		| 'left-end'
		| 'auto'
		| 'auto-start'
		| 'auto-end';
	trigger?: string;
	duration?: number | [number, number];
	delay?: number | [number, number];
	hideOnClick?: boolean | 'toggle';
	interactive?: boolean;
	appendTo?: 'parent' | HTMLElement | (() => HTMLElement);
	zIndex?: number;
	arrow?: boolean;
	arrowType?: 'sharp' | 'round';
	animation?: string;
	inertia?: boolean;
	popperOptions?: Object;
	maxWidth?: string;
	allowHTML?: boolean;
	offset?: [number, number];
	distance?: number;
	theme?: string;
	onShow?(instance: any): void;
	onHide?(instance: any): void;
	onClickOutside?(instance: any): void;
}
