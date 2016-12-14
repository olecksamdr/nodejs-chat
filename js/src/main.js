import { makeDraggable } from './utils/utils.js';

window.addEventListener('load', windowLoaded, true);

function windowLoaded() {
    makeDraggable('chat-window');
}