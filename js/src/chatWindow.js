import { getScrollbarWidth } from './utils/utils.js';

SimpleScrollbar.initAll();

let chatInput = document.querySelector('.send-input');

SimpleScrollbar.initEl(chatInput);

// стирає напис "Введіть ваше повідомлення ..." коли коритувач перший раз клікає по
// інпуту і після цього знімає обробник події, щоб наступного разу не стирати поідомлення 
// користувача
let scrollbarWidth = getScrollbarWidth();

let ssContentWrappers = document.querySelectorAll('.ss-content');

for (let i = 0; i < ssContentWrappers.length; i++) {
	ssContentWrappers[i].style.width = 'calc(100% + '+ scrollbarWidth + 'px)';
}

let msgContentWrapper = chatInput.querySelector('.ss-content');
msgContentWrapper.setAttribute('contenteditable', 'true');
msgContentWrapper.addEventListener('focus', clearInputText);

// if user click on send-input he do not drag the winow 
chatInput.addEventListener('mousedown', stopPropagation);

function clearInputText () {
	this.innerHTML = '';
	this.removeEventListener('focus', clearInputText);
}


function stopPropagation (evt) {
	evt.stopPropagation();
}



