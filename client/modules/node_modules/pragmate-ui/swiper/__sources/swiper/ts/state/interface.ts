export interface IProps {
	children: Array<JSX.Element>;
	footer?: boolean;
	navigation?: boolean;
	pagination?: boolean;
	next?: boolean;
	functionNext?: (e: React.SyntheticEvent) => void;
	className?: string;
	slideTo?: any;
	slidesPerView?: string | number;
	spaceBetween?: number;
}
