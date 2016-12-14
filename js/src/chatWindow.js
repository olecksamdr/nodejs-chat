let chatInput = document.querySelector('.send-input');

// стирає напис "Введіть ваше повідомлення ..." коли коритувач перший раз клікає по
// інпуту і після цього знімає обробник події, щоб наступного разу не стирати поідомлення 
// користувача
chatInput.addEventListener('focus', clearInputText);
function clearInputText () {
	this.innerHTML = '';
	chatInput.removeEventListener('focus', clearInputText);
}