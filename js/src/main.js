import { makeDraggable } from './utils/utils.js';

window.addEventListener('load', windowLoaded, true);

function windowLoaded() {
	makeDraggable({
		element: document.getElementById('chat-window'),
		control: document.querySelector('#chat-window .drag-control')
	});
}