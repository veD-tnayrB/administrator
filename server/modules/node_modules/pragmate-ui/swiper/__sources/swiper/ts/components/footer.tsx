import React from 'react';
export function SwiperFooter(props) {
	const {footer, controller, refs} = props;
	if (!footer) return null;

	return (
		<>
			{!controller?.swiper.isEnd && (
				<button className="swiper-button-prev" onClick={props.functionNext}>
					SKIP
				</button>
			)}
			<div ref={refs.pagination} className="swiper-pagination" />
			<button className="swiper-button-next " onClick={controller?.next}>
				Next
			</button>
		</>
	);
}
