import * as Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { ReactiveModel } from '@beyond-js/reactive/model';

const SwiperCasted: typeof Swiper.Swiper = Swiper.Swiper as unknown as typeof Swiper.default;
export class Controller extends ReactiveModel<any> {
	#swiper;
	get swiper(): any {
		return this.#swiper;
	}

	#onEnd: boolean;
	#props;

	setSwiper = (element, props, ref): void => {
		this.#props = props;
		let specs = {
			slidesPerView: props.slidesPerView ?? 1,
			modules: [Navigation, Pagination],
			...props,
		};
		Object.keys(specs).forEach(key => {
			if (['children'].includes(key)) delete specs[key];
		});

		if (!Swiper) {
			console.warn('Swiper keeps without been loaded');
			return;
		}
		if (props.pagination || props.footer) {
			specs.pagination = {
				el: ref.pagination.current, // @todo: review it.
				clickable: true,
				type: props.typePagination ?? 'bullets',
				dynamicBullets: props.dynamicBullets ?? false,
			};
		}

		if (props.navigation) {
			specs.navigation = {
				nextEl: ref.next.current,
				prevEl: ref.prev.current,
			};
		}

		this.#swiper = new SwiperCasted(element, specs);

		if (props.activeSlide) this.#swiper.slideTo(parseInt(props.activeSlide));
		const nextSlide = () => {
			if (this.#swiper) this.#swiper.slideNext();
		};

		const prevSlide = () => {
			if (this.#swiper) this.#swiper.slidePrev();
		};

		const slideTo = index => {
			if (this.#swiper) this.#swiper.slideTo(parseInt(index));
		};
		if (props.nextSlide && typeof props.nextSlide === 'function') props.nextSlide(nextSlide);
		if (props.prevSlide && typeof props.prevSlide === 'function') props.prevSlide(prevSlide);
		if (props.slideTo && typeof props.slideTo === 'function') props.slideTo(slideTo);
		this.#swiper.on('slideChange', () => {
			if (this.#swiper?.isEnd) {
				this.#onEnd = true;
				this.triggerEvent();
			} else {
				this.#onEnd = false;
				this.triggerEvent();
			}
		});
	};

	nextSlide = () => {
		if (!this.#swiper?.isEnd) {
			this.#swiper?.slideNext(500, false);
			return;
		}
		if (!this.#onEnd) return;
		if (this.#props.onNext) this.#props.onNext();
		else this.#swiper?.slideNext(500, false);
	};

	prevSlide = () => {
		if (!this.#swiper?.isEnd) {
			this.#swiper?.slideNext(500, false);
			return;
		}
		if (!this.#onEnd) return;
		if (this.#props.onPrev) this.#props.onPrev();
		else this.#swiper?.slidePrev(500, false);
	};

	next = (): void => {
		if (!this.#swiper?.isEnd) {
			this.#swiper?.slideNext(500, false);
			return;
		}
		if (!this.#onEnd) return;
		this.#props.functionNext();
	};
}
