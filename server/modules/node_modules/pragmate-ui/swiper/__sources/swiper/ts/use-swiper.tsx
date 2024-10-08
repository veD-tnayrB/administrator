import React from 'react';
import { Controller } from './state/controller';
import { useSwiperContext } from './context';

import { ISwiperOptions } from './interfaces/swiper-props';
export const useSwiperSlider = (props: ISwiperOptions) => {
	/* const { props } = useSwiperContext(); */

	const refs = {
		next: React.useRef<HTMLButtonElement>(),
		container: React.useRef(),
		pagination: React.useRef(),
		prev: React.useRef<HTMLButtonElement>(),
	};

	const { slideTo } = props;
	const { container, prev } = refs;

	const [state, setState] = React.useState<any>({});

	React.useEffect((): any => {
		const controller: Controller = new Controller();
		const onChange: () => void = (): void =>
			console.log(99, {
				...state,
				ready: true,
				swiper: controller.swiper,
				controller,
				lastIndex: controller.lastIndex,
			});
		setState({
			...state,
			ready: true,
			swiper: controller.swiper,
			controller,
			lastIndex: controller.lastIndex,
		});
		controller.on('change', onChange);
		if (!controller.destroyed) controller.setSwiper(container.current, props, refs);
		onChange();
		return () => controller.off('change', onChange);
	}, []);

	React.useEffect(() => {
		if (!state.swiper || !slideTo) return;
		state.swiper.slideTo(slideTo);
	}, [slideTo]);
	console.log(0.2);
	return { refs, state, prev, container };
};
