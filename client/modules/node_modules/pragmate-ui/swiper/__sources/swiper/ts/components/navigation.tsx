import React from 'react';
import { IconButton } from 'pragmate-ui/icons';
import { useSwiperContext } from '../context';
export function SwiperNavigation() {
	const {
		controller,
		navigation,
		refs: { prev, next },
	} = useSwiperContext();
	if (!navigation) return null;
	return (
		<>
			<IconButton
				ref={prev}
				icon='left'
				variant='primary'
				className='swiper__navigation-btn swiper-button-prev'
				onClick={controller?.prevSlide}
			/>

			<IconButton
				icon='right'
				ref={next}
				variant='primary'
				onClick={controller?.nextSlide}
				className='swiper__navigation-btn  swiper-button-next'
			/>
		</>
	);
}
