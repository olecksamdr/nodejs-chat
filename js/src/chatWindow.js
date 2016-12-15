let chatInput = document.querySelector('.send-input');

// стирає напис "Введіть ваше повідомлення ..." коли коритувач перший раз клікає по
// інпуту і після цього знімає обробник події, щоб наступного разу не стирати поідомлення 
// користувача
chatInput.addEventListener('focus', clearInputText);

// if user click on send-input he do not drag the winow 
chatInput.addEventListener('mousedown', stopPropagation);

function clearInputText () {
	content = document.querySelector('.ss-content');
	content.innerHTML = '';
	chatInput.removeEventListener('focus', clearInputText);
}


function stopPropagation (evt) {
	evt.stopPropagation();
}

SimpleScrollbar.initEl(chatInput);

