import React from 'react';
import {Slide} from './slide';
export function SlideItems({items}) {
	const slides: Array<JSX.Element> = items.map((slide: JSX.Element, index: number) => (
		<Slide key={index}>{slide}</Slide>
	));
	return <div className="swiper-wrapper">{slides}</div>;
}
