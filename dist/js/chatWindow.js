/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getScrollbarWidth;
// Повертає ширину полоси прокрутки

function getScrollbarWidth() {
    var outer = document.createElement("div");
    outer.style.position = "absolute";
    outer.style.top = "-1000px";
    outer.style.visibility = "hidden";
    outer.style.width = "100px";
    document.body.appendChild(outer);
    
    var widthNoScroll = outer.offsetWidth;
    // force scrollbars
    outer.style.overflow = "scroll";
    
    // add innerdiv
    var inner = document.createElement("div");
    inner.style.width = "100%";
    outer.appendChild(inner);        
    
    var widthWithScroll = inner.offsetWidth;
    
    // remove divs
    outer.parentNode.removeChild(outer);
    
    return widthNoScroll - widthWithScroll;
}

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__animate_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__timingFunctions_circ_js__ = __webpack_require__(7);
/* harmony export (immutable) */ __webpack_exports__["a"] = smothScroll;



function smothScroll(el, scrollTo) {
	__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__animate_js__["a" /* default */])({
		duration: 200,
		delta: __WEBPACK_IMPORTED_MODULE_1__timingFunctions_circ_js__["a" /* default */],
		step: (delta) => {
			el.scrollTop += delta * (scrollTo - el.scrollTop);
		}
	});
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_getScrollbarWidth_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_scroll_js__ = __webpack_require__(2);



SimpleScrollbar.initAll();


let scrollbarWidth = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_getScrollbarWidth_js__["a" /* default */])();

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

	__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_scroll_js__["a" /* default */])(msgListScrollCnt, scrollTo);
}


/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = animate;
// The object opts should contain animation options:

//     delay - через кожних delay мілісекунд буде запущений новий кадр анімаціі 
//     duration - тривалість анімації
//    
//     function delta - цій ф-ції передається progress число яке приймає значення з відрізка [0; 1]
//                      (на початку анімаці progress = 0, на кінці 1). Ф-ція delta робить певні перетворення
//                      і теж повертає число з фідрізка [0; 1]
//    
//     function step - приймає значення повернене ф-цією delta i на його основі 
//                     змінює влативість елемента який анімують

// ПРИКЛАД ВИКОРИСТАННЯ 

// function move(element, delta, duration) {
//   var to = 500

//   animate({
//     delay: 10,
//     duration: duration || 1000, // 1 sec by default
//     delta: delta,
//     step: function(delta) {
//       element.style.left = to*delta + "px"    
//     }
//   })
  
// }


function animate(opts) {

  var start = new Date;

  var id = setInterval(function() {
    var timePassed = new Date - start
    var progress = timePassed / opts.duration

    if (progress > 1) progress = 1
    
    var delta = opts.delta(progress)
    opts.step(delta)
    
    if (progress == 1) {
      clearInterval(id)
    }
  }, opts.delay || 10)
}

/***/ }),
/* 6 */,
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = circ;
function circ(progress) {
    return 1 - Math.sin(Math.acos(progress))
}

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdFdpbmRvdy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBkYjA4ZmQzMmE0MDcxOGE4OWZhMiIsIndlYnBhY2s6Ly8vLi91dGlscy9nZXRTY3JvbGxiYXJXaWR0aC5qcyIsIndlYnBhY2s6Ly8vLi91dGlscy9zY3JvbGwuanMiLCJ3ZWJwYWNrOi8vLy4vY2hhdFdpbmRvdy5qcyIsIndlYnBhY2s6Ly8vLi91dGlscy9hbmltYXRlLmpzIiwid2VicGFjazovLy8uL3V0aWxzL3RpbWluZ0Z1bmN0aW9ucy9jaXJjLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZGIwOGZkMzJhNDA3MThhODlmYTIiLCIvLyDQn9C+0LLQtdGA0YLQsNGUINGI0LjRgNC40L3RgyDQv9C+0LvQvtGB0Lgg0L/RgNC+0LrRgNGD0YLQutC4XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFNjcm9sbGJhcldpZHRoKCkge1xuICAgIHZhciBvdXRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgb3V0ZXIuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgb3V0ZXIuc3R5bGUudG9wID0gXCItMTAwMHB4XCI7XG4gICAgb3V0ZXIuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgb3V0ZXIuc3R5bGUud2lkdGggPSBcIjEwMHB4XCI7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChvdXRlcik7XG4gICAgXG4gICAgdmFyIHdpZHRoTm9TY3JvbGwgPSBvdXRlci5vZmZzZXRXaWR0aDtcbiAgICAvLyBmb3JjZSBzY3JvbGxiYXJzXG4gICAgb3V0ZXIuc3R5bGUub3ZlcmZsb3cgPSBcInNjcm9sbFwiO1xuICAgIFxuICAgIC8vIGFkZCBpbm5lcmRpdlxuICAgIHZhciBpbm5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgaW5uZXIuc3R5bGUud2lkdGggPSBcIjEwMCVcIjtcbiAgICBvdXRlci5hcHBlbmRDaGlsZChpbm5lcik7ICAgICAgICBcbiAgICBcbiAgICB2YXIgd2lkdGhXaXRoU2Nyb2xsID0gaW5uZXIub2Zmc2V0V2lkdGg7XG4gICAgXG4gICAgLy8gcmVtb3ZlIGRpdnNcbiAgICBvdXRlci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG91dGVyKTtcbiAgICBcbiAgICByZXR1cm4gd2lkdGhOb1Njcm9sbCAtIHdpZHRoV2l0aFNjcm9sbDtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3V0aWxzL2dldFNjcm9sbGJhcldpZHRoLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBhbmltYXRlIGZyb20gJy4vYW5pbWF0ZS5qcyc7XG5pbXBvcnQgY2lyYyBmcm9tICcuL3RpbWluZ0Z1bmN0aW9ucy9jaXJjLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc21vdGhTY3JvbGwoZWwsIHNjcm9sbFRvKSB7XG5cdGFuaW1hdGUoe1xuXHRcdGR1cmF0aW9uOiAyMDAsXG5cdFx0ZGVsdGE6IGNpcmMsXG5cdFx0c3RlcDogKGRlbHRhKSA9PiB7XG5cdFx0XHRlbC5zY3JvbGxUb3AgKz0gZGVsdGEgKiAoc2Nyb2xsVG8gLSBlbC5zY3JvbGxUb3ApO1xuXHRcdH1cblx0fSk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3V0aWxzL3Njcm9sbC5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgIGdldFNjcm9sbGJhcldpZHRoIGZyb20gJy4vdXRpbHMvZ2V0U2Nyb2xsYmFyV2lkdGguanMnO1xuaW1wb3J0IHNtb3RoU2Nyb2xsIGZyb20gJy4vdXRpbHMvc2Nyb2xsLmpzJztcblxuU2ltcGxlU2Nyb2xsYmFyLmluaXRBbGwoKTtcblxuXG5sZXQgc2Nyb2xsYmFyV2lkdGggPSBnZXRTY3JvbGxiYXJXaWR0aCgpO1xuXG5sZXQgc3NDb250ZW50V3JhcHBlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc3MtY29udGVudCcpO1xuXG5mb3IgKGxldCBpID0gMDsgaSA8IHNzQ29udGVudFdyYXBwZXJzLmxlbmd0aDsgaSsrKSB7XG5cdHNzQ29udGVudFdyYXBwZXJzW2ldLnN0eWxlLndpZHRoID0gJ2NhbGMoMTAwJSArICcrIHNjcm9sbGJhcldpZHRoICsgJ3B4KSc7XG59XG5cbi8vIGVsZW1lbnRzXG5sZXQgY2hhdElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlbmQtaW5wdXQnKSxcblx0bXNnTGlzdFNjcm9sbENudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZXNzYWdlcy1saXN0IC5zcy1jb250ZW50JyksXG5cdG1zZ0NvbnRlbnRXcmFwcGVyID0gY2hhdElucHV0LnF1ZXJ5U2VsZWN0b3IoJy5zcy1jb250ZW50Jyk7XG5cbm1zZ0NvbnRlbnRXcmFwcGVyLnNldEF0dHJpYnV0ZSgnY29udGVudGVkaXRhYmxlJywgJ3RydWUnKTtcbm1zZ0NvbnRlbnRXcmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgY2xlYXJJbnB1dFRleHQpO1xuXG4vLyDRgdGC0LjRgNCw0ZQg0L3QsNC/0LjRgSBcItCS0LLQtdC00ZbRgtGMINCy0LDRiNC1INC/0L7QstGW0LTQvtC80LvQtdC90L3RjyAuLi5cIiDQutC+0LvQuCDQutC+0YDQuNGC0YPQstCw0Ycg0L/QtdGA0YjQuNC5INGA0LDQtyDQutC70ZbQutCw0ZQg0L/QvlxuLy8g0ZbQvdC/0YPRgtGDINGWINC/0ZbRgdC70Y8g0YbRjNC+0LPQviDQt9C90ZbQvNCw0ZQg0L7QsdGA0L7QsdC90LjQuiDQv9C+0LTRltGXLCDRidC+0LEg0L3QsNGB0YLRg9C/0L3QvtCz0L4g0YDQsNC30YMg0L3QtSDRgdGC0LjRgNCw0YLQuCDQv9C+0ZbQtNC+0LzQu9C10L3QvdGPXG4vLyDQutC+0YDQuNGB0YLRg9Cy0LDRh9CwXG5mdW5jdGlvbiBjbGVhcklucHV0VGV4dCAoKSB7XG5cdHRoaXMuaW5uZXJIVE1MID0gJyc7XG5cdHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXMnLCBjbGVhcklucHV0VGV4dCk7XG59XG5cbm1zZ0NvbnRlbnRXcmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB1c2VyS2V5RG93bik7XG5cbmZ1bmN0aW9uIHVzZXJLZXlEb3duKGV2dCkge1xuXHRpZiAoZXZ0LndoaWNoID09IDEzKSAvLyBlbnRlciBrZXkgcHJlc3NlZFxuXHRcdHNlbmRNZXNzYWdlKCk7XG59XG5cbnZhciBtZXNzYWdlTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZXNzYWdlcy1saXN0IC5zcy1jb250ZW50Jyk7XG5cbmZ1bmN0aW9uIHNlbmRNZXNzYWdlKCkge1xuXHR2YXIgbXNnQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG1zZ0NvbnRlbnRXcmFwcGVyLnRleHRDb250ZW50KTtcblxuXHRtc2dDb250ZW50V3JhcHBlci5pbm5lckhUTUwgPSAnJztcblxuXHR2YXIgbXNnRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdHZhciBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuXG5cdG1zZ0Rpdi5jbGFzc0xpc3QuYWRkKCdtZXNzYWdlJyk7XG5cdG1zZ0Rpdi5jbGFzc0xpc3QuYWRkKCdvdXRjb21pbmcnKTtcblx0cC5hcHBlbmRDaGlsZChtc2dDb250ZW50KTtcblx0bXNnRGl2LmFwcGVuZENoaWxkKHApO1xuXG5cdG1lc3NhZ2VMaXN0LmFwcGVuZENoaWxkKG1zZ0Rpdik7XG5cblx0bGV0IHNjcm9sbFRvID0gbXNnTGlzdFNjcm9sbENudC5zY3JvbGxUb3AgKyBtc2dMaXN0U2Nyb2xsQ250LnNjcm9sbEhlaWdodCAtIG1zZ0xpc3RTY3JvbGxDbnQuY2xpZW50SGVpZ2h0O1xuXG5cdHNtb3RoU2Nyb2xsKG1zZ0xpc3RTY3JvbGxDbnQsIHNjcm9sbFRvKTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY2hhdFdpbmRvdy5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBUaGUgb2JqZWN0IG9wdHMgc2hvdWxkIGNvbnRhaW4gYW5pbWF0aW9uIG9wdGlvbnM6XG5cbi8vICAgICBkZWxheSAtINGH0LXRgNC10Lcg0LrQvtC20L3QuNGFIGRlbGF5INC80ZbQu9GW0YHQtdC60YPQvdC0INCx0YPQtNC1INC30LDQv9GD0YnQtdC90LjQuSDQvdC+0LLQuNC5INC60LDQtNGAINCw0L3RltC80LDRhtGW0ZYgXG4vLyAgICAgZHVyYXRpb24gLSDRgtGA0LjQstCw0LvRltGB0YLRjCDQsNC90ZbQvNCw0YbRltGXXG4vLyAgICBcbi8vICAgICBmdW5jdGlvbiBkZWx0YSAtINGG0ZbQuSDRhC3RhtGW0Zcg0L/QtdGA0LXQtNCw0ZTRgtGM0YHRjyBwcm9ncmVzcyDRh9C40YHQu9C+INGP0LrQtSDQv9GA0LjQudC80LDRlCDQt9C90LDRh9C10L3QvdGPINC3INCy0ZbQtNGA0ZbQt9C60LAgWzA7IDFdXG4vLyAgICAgICAgICAgICAgICAgICAgICAo0L3QsCDQv9C+0YfQsNGC0LrRgyDQsNC90ZbQvNCw0YbRliBwcm9ncmVzcyA9IDAsINC90LAg0LrRltC90YbRliAxKS4g0KQt0YbRltGPIGRlbHRhINGA0L7QsdC40YLRjCDQv9C10LLQvdGWINC/0LXRgNC10YLQstC+0YDQtdC90L3Rj1xuLy8gICAgICAgICAgICAgICAgICAgICAg0ZYg0YLQtdC2INC/0L7QstC10YDRgtCw0ZQg0YfQuNGB0LvQviDQtyDRhNGW0LTRgNGW0LfQutCwIFswOyAxXVxuLy8gICAgXG4vLyAgICAgZnVuY3Rpb24gc3RlcCAtINC/0YDQuNC50LzQsNGUINC30L3QsNGH0LXQvdC90Y8g0L/QvtCy0LXRgNC90LXQvdC1INGELdGG0ZbRlNGOIGRlbHRhIGkg0L3QsCDQudC+0LPQviDQvtGB0L3QvtCy0ZYgXG4vLyAgICAgICAgICAgICAgICAgICAgINC30LzRltC90Y7RlCDQstC70LDRgtC40LLRltGB0YLRjCDQtdC70LXQvNC10L3RgtCwINGP0LrQuNC5INCw0L3RltC80YPRjtGC0YxcblxuLy8g0J/QoNCY0JrQm9CQ0JQg0JLQmNCa0J7QoNCY0KHQotCQ0J3QndCvIFxuXG4vLyBmdW5jdGlvbiBtb3ZlKGVsZW1lbnQsIGRlbHRhLCBkdXJhdGlvbikge1xuLy8gICB2YXIgdG8gPSA1MDBcblxuLy8gICBhbmltYXRlKHtcbi8vICAgICBkZWxheTogMTAsXG4vLyAgICAgZHVyYXRpb246IGR1cmF0aW9uIHx8IDEwMDAsIC8vIDEgc2VjIGJ5IGRlZmF1bHRcbi8vICAgICBkZWx0YTogZGVsdGEsXG4vLyAgICAgc3RlcDogZnVuY3Rpb24oZGVsdGEpIHtcbi8vICAgICAgIGVsZW1lbnQuc3R5bGUubGVmdCA9IHRvKmRlbHRhICsgXCJweFwiICAgIFxuLy8gICAgIH1cbi8vICAgfSlcbiAgXG4vLyB9XG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYW5pbWF0ZShvcHRzKSB7XG5cbiAgdmFyIHN0YXJ0ID0gbmV3IERhdGU7XG5cbiAgdmFyIGlkID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgdmFyIHRpbWVQYXNzZWQgPSBuZXcgRGF0ZSAtIHN0YXJ0XG4gICAgdmFyIHByb2dyZXNzID0gdGltZVBhc3NlZCAvIG9wdHMuZHVyYXRpb25cblxuICAgIGlmIChwcm9ncmVzcyA+IDEpIHByb2dyZXNzID0gMVxuICAgIFxuICAgIHZhciBkZWx0YSA9IG9wdHMuZGVsdGEocHJvZ3Jlc3MpXG4gICAgb3B0cy5zdGVwKGRlbHRhKVxuICAgIFxuICAgIGlmIChwcm9ncmVzcyA9PSAxKSB7XG4gICAgICBjbGVhckludGVydmFsKGlkKVxuICAgIH1cbiAgfSwgb3B0cy5kZWxheSB8fCAxMClcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3V0aWxzL2FuaW1hdGUuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2lyYyhwcm9ncmVzcykge1xuICAgIHJldHVybiAxIC0gTWF0aC5zaW4oTWF0aC5hY29zKHByb2dyZXNzKSlcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3V0aWxzL3RpbWluZ0Z1bmN0aW9ucy9jaXJjLmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBOzs7OztBQ2hFQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDekJBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNYQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDekRBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUM5Q0E7QUFBQTtBQUNBO0FBQ0E7OztBIiwic291cmNlUm9vdCI6IiJ9