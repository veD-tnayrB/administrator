import React from 'react';
import { SwiperFooter } from './components/footer';
import { SwiperNavigation } from './components/navigation';
import { SlideItems } from './slide';
import { useSwiperSlider } from './use-swiper';
import { ISwiperContext, SwiperContext } from './context';
import { ISwiperOptions } from './interfaces/swiper-props';
import { Pagination } from './components/pagination';

export /*bundle*/
function SwiperSlider(props: ISwiperOptions): JSX.Element {
	const { pagination, footer, navigation, children } = props;
	const { refs, state } = useSwiperSlider(props);

	const { controller } = state;

	const contextValue: ISwiperContext = {
		footer,
		pagination,
		controller,
		navigation,
		refs,
	};

	const cls: string = `swiper-container swiper ${
		props.className ? `${props.className} pui-swiper-slider` : 'pui-swiper-slider'
	};`;
	return (
		<SwiperContext.Provider value={contextValue}>
			<div ref={refs.container} className={cls}>
				<SlideItems items={children} />
				<Pagination />
				<SwiperFooter />
				<SwiperNavigation />
			</div>
		</SwiperContext.Provider>
	);
}
