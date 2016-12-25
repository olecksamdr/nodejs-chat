import { animate, circ } from './animation.js';

export function smothScroll(el, scrollTo) {
	animate({
		duration: 200,
		delta: circ,
		step: (delta) => {
			el.scrollTop += delta * (scrollTo - el.scrollTop);
		}
	});
}