import animate from './animate.js';
import circ from './timingFunctions/circ.js';

export default function smothScroll(el, scrollTo) {
	animate({
		duration: 200,
		delta: circ,
		step: (delta) => {
			el.scrollTop += delta * (scrollTo - el.scrollTop);
		}
	});
}
