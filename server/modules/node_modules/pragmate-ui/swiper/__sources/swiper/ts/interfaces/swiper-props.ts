//import { SwiperOptions } from 'swiper/types';

export interface ISwiperOptions {
	slideTo?: number;
	footer?: boolean;
	className?: string;
	next?: boolean;
	pagination?: boolean;
	navigation: boolean;
	children?: React.FC[];
}
