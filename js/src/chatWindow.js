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

msgContentWrapper.addEventListener('keydown', userKeyDown);

console.log(msgContentWrapper);

function userKeyDown(evt) {
	if (evt.which == 13 )
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
}



