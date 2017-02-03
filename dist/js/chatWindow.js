/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _getScrollbarWidth = __webpack_require__(2);

	var _getScrollbarWidth2 = _interopRequireDefault(_getScrollbarWidth);

	var _scroll = __webpack_require__(3);

	var _scroll2 = _interopRequireDefault(_scroll);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	SimpleScrollbar.initAll();

	var scrollbarWidth = (0, _getScrollbarWidth2.default)();

	var ssContentWrappers = document.querySelectorAll('.ss-content');

	for (var i = 0; i < ssContentWrappers.length; i++) {
		ssContentWrappers[i].style.width = 'calc(100% + ' + scrollbarWidth + 'px)';
	}

	// elements
	var chatInput = document.querySelector('.send-input'),
	    msgListScrollCnt = document.querySelector('.messages-list .ss-content'),
	    msgContentWrapper = chatInput.querySelector('.ss-content');

	msgContentWrapper.setAttribute('contenteditable', 'true');
	msgContentWrapper.addEventListener('focus', clearInputText);

	// стирає напис "Введіть ваше повідомлення ..." коли коритувач перший раз клікає по
	// інпуту і після цього знімає обробник події, щоб наступного разу не стирати поідомлення 
	// користувача
	function clearInputText() {
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

		var scrollTo = msgListScrollCnt.scrollTop + msgListScrollCnt.scrollHeight - msgListScrollCnt.clientHeight;
		(0, _scroll2.default)(msgListScrollCnt, scrollTo);
	}

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = getScrollbarWidth;
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

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.smothScroll = smothScroll;

	var _animate = __webpack_require__(4);

	var _animate2 = _interopRequireDefault(_animate);

	var _circ = __webpack_require__(5);

	var _circ2 = _interopRequireDefault(_circ);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function smothScroll(el, scrollTo) {
		(0, _animate2.default)({
			duration: 200,
			delta: _circ2.default,
			step: function step(delta) {
				el.scrollTop += delta * (scrollTo - el.scrollTop);
			}
		});
		}

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = animate;
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

	  var start = new Date();

	  var id = setInterval(function () {
	    var timePassed = new Date() - start;
	    var progress = timePassed / opts.duration;

	    if (progress > 1) progress = 1;

	    var delta = opts.delta(progress);
	    opts.step(delta);

	    if (progress == 1) {
	      clearInterval(id);
	    }
	  }, opts.delay || 10);
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = circ;
	function circ(progress) {
	    return 1 - Math.sin(Math.acos(progress));
	}

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdFdpbmRvdy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBjYTUwMzY2MGY3ZmYzMzg1NWUxMz81ZWYzIiwid2VicGFjazovLy9zcmMvanMvY2hhdFdpbmRvdy5qcyIsIndlYnBhY2s6Ly8vc3JjL2pzL3V0aWxzL2dldFNjcm9sbGJhcldpZHRoLmpzIiwid2VicGFjazovLy9zcmMvanMvdXRpbHMvc2Nyb2xsLmpzIiwid2VicGFjazovLy9zcmMvanMvdXRpbHMvYW5pbWF0ZS5qcyIsIndlYnBhY2s6Ly8vc3JjL2pzL3V0aWxzL3RpbWluZ0Z1bmN0aW9ucy9jaXJjLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGNhNTAzNjYwZjdmZjMzODU1ZTEzIiwiaW1wb3J0ICBnZXRTY3JvbGxiYXJXaWR0aCBmcm9tICcuL3V0aWxzL2dldFNjcm9sbGJhcldpZHRoLmpzJztcbmltcG9ydCBzbW90aFNjcm9sbCBmcm9tICcuL3V0aWxzL3Njcm9sbC5qcyc7XG5cblNpbXBsZVNjcm9sbGJhci5pbml0QWxsKCk7XG5cblxubGV0IHNjcm9sbGJhcldpZHRoID0gZ2V0U2Nyb2xsYmFyV2lkdGgoKTtcblxubGV0IHNzQ29udGVudFdyYXBwZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNzLWNvbnRlbnQnKTtcblxuZm9yIChsZXQgaSA9IDA7IGkgPCBzc0NvbnRlbnRXcmFwcGVycy5sZW5ndGg7IGkrKykge1xuXHRzc0NvbnRlbnRXcmFwcGVyc1tpXS5zdHlsZS53aWR0aCA9ICdjYWxjKDEwMCUgKyAnKyBzY3JvbGxiYXJXaWR0aCArICdweCknO1xufVxuXG4vLyBlbGVtZW50c1xubGV0IGNoYXRJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZW5kLWlucHV0JyksXG5cdG1zZ0xpc3RTY3JvbGxDbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVzc2FnZXMtbGlzdCAuc3MtY29udGVudCcpLFxuXHRtc2dDb250ZW50V3JhcHBlciA9IGNoYXRJbnB1dC5xdWVyeVNlbGVjdG9yKCcuc3MtY29udGVudCcpO1xuXG5tc2dDb250ZW50V3JhcHBlci5zZXRBdHRyaWJ1dGUoJ2NvbnRlbnRlZGl0YWJsZScsICd0cnVlJyk7XG5tc2dDb250ZW50V3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIGNsZWFySW5wdXRUZXh0KTtcblxuLy8g0YHRgtC40YDQsNGUINC90LDQv9C40YEgXCLQktCy0LXQtNGW0YLRjCDQstCw0YjQtSDQv9C+0LLRltC00L7QvNC70LXQvdC90Y8gLi4uXCIg0LrQvtC70Lgg0LrQvtGA0LjRgtGD0LLQsNGHINC/0LXRgNGI0LjQuSDRgNCw0Lcg0LrQu9GW0LrQsNGUINC/0L5cbi8vINGW0L3Qv9GD0YLRgyDRliDQv9GW0YHQu9GPINGG0YzQvtCz0L4g0LfQvdGW0LzQsNGUINC+0LHRgNC+0LHQvdC40Log0L/QvtC00ZbRlywg0YnQvtCxINC90LDRgdGC0YPQv9C90L7Qs9C+INGA0LDQt9GDINC90LUg0YHRgtC40YDQsNGC0Lgg0L/QvtGW0LTQvtC80LvQtdC90L3RjyBcbi8vINC60L7RgNC40YHRgtGD0LLQsNGH0LBcbmZ1bmN0aW9uIGNsZWFySW5wdXRUZXh0ICgpIHtcblx0dGhpcy5pbm5lckhUTUwgPSAnJztcblx0dGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1cycsIGNsZWFySW5wdXRUZXh0KTtcbn1cblxubXNnQ29udGVudFdyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHVzZXJLZXlEb3duKTtcblxuZnVuY3Rpb24gdXNlcktleURvd24oZXZ0KSB7XG5cdGlmIChldnQud2hpY2ggPT0gMTMpIC8vIGVudGVyIGtleSBwcmVzc2VkXG5cdFx0c2VuZE1lc3NhZ2UoKTtcbn1cblxudmFyIG1lc3NhZ2VMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lc3NhZ2VzLWxpc3QgLnNzLWNvbnRlbnQnKTtcblxuZnVuY3Rpb24gc2VuZE1lc3NhZ2UoKSB7XG5cdHZhciBtc2dDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobXNnQ29udGVudFdyYXBwZXIudGV4dENvbnRlbnQpO1xuXG5cdG1zZ0NvbnRlbnRXcmFwcGVyLmlubmVySFRNTCA9ICcnO1xuXG5cdHZhciBtc2dEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0dmFyIHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG5cblx0bXNnRGl2LmNsYXNzTGlzdC5hZGQoJ21lc3NhZ2UnKTtcblx0bXNnRGl2LmNsYXNzTGlzdC5hZGQoJ291dGNvbWluZycpO1xuXHRwLmFwcGVuZENoaWxkKG1zZ0NvbnRlbnQpO1xuXHRtc2dEaXYuYXBwZW5kQ2hpbGQocCk7XG5cblx0bWVzc2FnZUxpc3QuYXBwZW5kQ2hpbGQobXNnRGl2KTtcblxuXHRsZXQgc2Nyb2xsVG8gPSBtc2dMaXN0U2Nyb2xsQ250LnNjcm9sbFRvcCArIG1zZ0xpc3RTY3JvbGxDbnQuc2Nyb2xsSGVpZ2h0IC0gbXNnTGlzdFNjcm9sbENudC5jbGllbnRIZWlnaHQ7XG5cdHNtb3RoU2Nyb2xsKG1zZ0xpc3RTY3JvbGxDbnQsIHNjcm9sbFRvKTtcbn1cblxuXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvY2hhdFdpbmRvdy5qcyIsIi8vINCf0L7QstC10YDRgtCw0ZQg0YjQuNGA0LjQvdGDINC/0L7Qu9C+0YHQuCDQv9GA0L7QutGA0YPRgtC60LhcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0U2Nyb2xsYmFyV2lkdGgoKSB7XG4gICAgdmFyIG91dGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBvdXRlci5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgICBvdXRlci5zdHlsZS50b3AgPSBcIi0xMDAwcHhcIjtcbiAgICBvdXRlci5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICBvdXRlci5zdHlsZS53aWR0aCA9IFwiMTAwcHhcIjtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG91dGVyKTtcbiAgICBcbiAgICB2YXIgd2lkdGhOb1Njcm9sbCA9IG91dGVyLm9mZnNldFdpZHRoO1xuICAgIC8vIGZvcmNlIHNjcm9sbGJhcnNcbiAgICBvdXRlci5zdHlsZS5vdmVyZmxvdyA9IFwic2Nyb2xsXCI7XG4gICAgXG4gICAgLy8gYWRkIGlubmVyZGl2XG4gICAgdmFyIGlubmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBpbm5lci5zdHlsZS53aWR0aCA9IFwiMTAwJVwiO1xuICAgIG91dGVyLmFwcGVuZENoaWxkKGlubmVyKTsgICAgICAgIFxuICAgIFxuICAgIHZhciB3aWR0aFdpdGhTY3JvbGwgPSBpbm5lci5vZmZzZXRXaWR0aDtcbiAgICBcbiAgICAvLyByZW1vdmUgZGl2c1xuICAgIG91dGVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQob3V0ZXIpO1xuICAgIFxuICAgIHJldHVybiB3aWR0aE5vU2Nyb2xsIC0gd2lkdGhXaXRoU2Nyb2xsO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvdXRpbHMvZ2V0U2Nyb2xsYmFyV2lkdGguanMiLCJpbXBvcnQgYW5pbWF0ZSBmcm9tICcuL2FuaW1hdGUuanMnO1xuaW1wb3J0IGNpcmMgZnJvbSAnLi90aW1pbmdGdW5jdGlvbnMvY2lyYy5qcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBzbW90aFNjcm9sbChlbCwgc2Nyb2xsVG8pIHtcblx0YW5pbWF0ZSh7XG5cdFx0ZHVyYXRpb246IDIwMCxcblx0XHRkZWx0YTogY2lyYyxcblx0XHRzdGVwOiAoZGVsdGEpID0+IHtcblx0XHRcdGVsLnNjcm9sbFRvcCArPSBkZWx0YSAqIChzY3JvbGxUbyAtIGVsLnNjcm9sbFRvcCk7XG5cdFx0fVxuXHR9KTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL3V0aWxzL3Njcm9sbC5qcyIsIi8vIFRoZSBvYmplY3Qgb3B0cyBzaG91bGQgY29udGFpbiBhbmltYXRpb24gb3B0aW9uczpcblxuLy8gICAgIGRlbGF5IC0g0YfQtdGA0LXQtyDQutC+0LbQvdC40YUgZGVsYXkg0LzRltC70ZbRgdC10LrRg9C90LQg0LHRg9C00LUg0LfQsNC/0YPRidC10L3QuNC5INC90L7QstC40Lkg0LrQsNC00YAg0LDQvdGW0LzQsNGG0ZbRliBcbi8vICAgICBkdXJhdGlvbiAtINGC0YDQuNCy0LDQu9GW0YHRgtGMINCw0L3RltC80LDRhtGW0Zdcbi8vICAgIFxuLy8gICAgIGZ1bmN0aW9uIGRlbHRhIC0g0YbRltC5INGELdGG0ZbRlyDQv9C10YDQtdC00LDRlNGC0YzRgdGPIHByb2dyZXNzINGH0LjRgdC70L4g0Y/QutC1INC/0YDQuNC50LzQsNGUINC30L3QsNGH0LXQvdC90Y8g0Lcg0LLRltC00YDRltC30LrQsCBbMDsgMV1cbi8vICAgICAgICAgICAgICAgICAgICAgICjQvdCwINC/0L7Rh9Cw0YLQutGDINCw0L3RltC80LDRhtGWIHByb2dyZXNzID0gMCwg0L3QsCDQutGW0L3RhtGWIDEpLiDQpC3RhtGW0Y8gZGVsdGEg0YDQvtCx0LjRgtGMINC/0LXQstC90ZYg0L/QtdGA0LXRgtCy0L7RgNC10L3QvdGPXG4vLyAgICAgICAgICAgICAgICAgICAgICDRliDRgtC10LYg0L/QvtCy0LXRgNGC0LDRlCDRh9C40YHQu9C+INC3INGE0ZbQtNGA0ZbQt9C60LAgWzA7IDFdXG4vLyAgICBcbi8vICAgICBmdW5jdGlvbiBzdGVwIC0g0L/RgNC40LnQvNCw0ZQg0LfQvdCw0YfQtdC90L3RjyDQv9C+0LLQtdGA0L3QtdC90LUg0YQt0YbRltGU0Y4gZGVsdGEgaSDQvdCwINC50L7Qs9C+INC+0YHQvdC+0LLRliBcbi8vICAgICAgICAgICAgICAgICAgICAg0LfQvNGW0L3RjtGUINCy0LvQsNGC0LjQstGW0YHRgtGMINC10LvQtdC80LXQvdGC0LAg0Y/QutC40Lkg0LDQvdGW0LzRg9GO0YLRjFxuXG4vLyDQn9Cg0JjQmtCb0JDQlCDQktCY0JrQntCg0JjQodCi0JDQndCd0K8gXG5cbi8vIGZ1bmN0aW9uIG1vdmUoZWxlbWVudCwgZGVsdGEsIGR1cmF0aW9uKSB7XG4vLyAgIHZhciB0byA9IDUwMFxuXG4vLyAgIGFuaW1hdGUoe1xuLy8gICAgIGRlbGF5OiAxMCxcbi8vICAgICBkdXJhdGlvbjogZHVyYXRpb24gfHwgMTAwMCwgLy8gMSBzZWMgYnkgZGVmYXVsdFxuLy8gICAgIGRlbHRhOiBkZWx0YSxcbi8vICAgICBzdGVwOiBmdW5jdGlvbihkZWx0YSkge1xuLy8gICAgICAgZWxlbWVudC5zdHlsZS5sZWZ0ID0gdG8qZGVsdGEgKyBcInB4XCIgICAgXG4vLyAgICAgfVxuLy8gICB9KVxuICBcbi8vIH1cblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhbmltYXRlKG9wdHMpIHtcblxuICB2YXIgc3RhcnQgPSBuZXcgRGF0ZTtcblxuICB2YXIgaWQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICB2YXIgdGltZVBhc3NlZCA9IG5ldyBEYXRlIC0gc3RhcnRcbiAgICB2YXIgcHJvZ3Jlc3MgPSB0aW1lUGFzc2VkIC8gb3B0cy5kdXJhdGlvblxuXG4gICAgaWYgKHByb2dyZXNzID4gMSkgcHJvZ3Jlc3MgPSAxXG4gICAgXG4gICAgdmFyIGRlbHRhID0gb3B0cy5kZWx0YShwcm9ncmVzcylcbiAgICBvcHRzLnN0ZXAoZGVsdGEpXG4gICAgXG4gICAgaWYgKHByb2dyZXNzID09IDEpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwoaWQpXG4gICAgfVxuICB9LCBvcHRzLmRlbGF5IHx8IDEwKVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvdXRpbHMvYW5pbWF0ZS5qcyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNpcmMocHJvZ3Jlc3MpIHtcbiAgICByZXR1cm4gMSAtIE1hdGguc2luKE1hdGguYWNvcyhwcm9ncmVzcykpXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy91dGlscy90aW1pbmdGdW5jdGlvbnMvY2lyYy5qcyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDdENBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7O0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNyREE7QUFGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDckJBO0FBQ0E7QUFKQTtBQUNBOzs7QUFBQTtBQUNBOzs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFPQTs7Ozs7Ozs7Ozs7QUNrQkE7QUE3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzdDQTtBQUFBO0FBQ0E7Ozs7Iiwic291cmNlUm9vdCI6IiJ9