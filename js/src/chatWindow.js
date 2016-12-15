let chatInput = document.querySelector('.send-input');

// стирає напис "Введіть ваше повідомлення ..." коли коритувач перший раз клікає по
// інпуту і після цього знімає обробник події, щоб наступного разу не стирати поідомлення 
// користувача
msgContentWrapper = document.querySelector('.ss-content');
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

SimpleScrollbar.initEl(chatInput);

