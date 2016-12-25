import { getScrollbarWidth } from './utils/utils.js';
import { smothScroll } from './utils/scroll.js';

SimpleScrollbar.initAll();


let scrollbarWidth = getScrollbarWidth();

let ssContentWrappers = document.querySelectorAll('.ss-content');

for (let i = 0; i < ssContentWrappers.length; i++) {
	ssContentWrappers[i].style.width = 'calc(100% + '+ scrollbarWidth + 'px)';
}

// elements
let chatInput = document.querySelector('.send-input'),
	msgListScrollCnt = document.querySelector('.messages-list .ss-content'),
	msgContentWrapper = chatInput.querySelector('.ss-content');

msgContentWrapper.setAttribute('contenteditable', 'true');
msgContentWrapper.addEventListener('focus', clearInputText);

// стирає напис "Введіть ваше повідомлення ..." коли коритувач перший раз клікає по
// інпуту і після цього знімає обробник події, щоб наступного разу не стирати поідомлення 
// користувача
function clearInputText () {
	this.innerHTML = '';
	this.removeEventListener('focus', clearInputText);
}

msgContentWrapper.addEventListener('keydown', userKeyDown);

function userKeyDown(evt) {
	if (evt.which == 13) // enter key pressed
		sendMessage();
}

var messageList = document.querySelector('.messages-list .ss-content');

function sendMessage() {
	var msgContent = document.createTextNode(msgContentWrapper.textContent);

	msgContentWrapper.innerHTML = '';

	var msgDiv = document.createElement('div');
	var p = document.createElement('p');

	msgDiv.classList.add('message');
	msgDiv.classList.add('outcoming');
	p.appendChild(msgContent);
	msgDiv.appendChild(p);

	messageList.appendChild(msgDiv);

	let scrollTo = msgListScrollCnt.scrollTop + msgListScrollCnt.scrollHeight - msgListScrollCnt.clientHeight;
	smothScroll(msgListScrollCnt, scrollTo);
}



