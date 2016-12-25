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

	var _utils = __webpack_require__(1);

	var _scroll = __webpack_require__(2);

	SimpleScrollbar.initAll();

	var scrollbarWidth = (0, _utils.getScrollbarWidth)();

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
		(0, _scroll.smothScroll)(msgListScrollCnt, scrollTo);
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.makeDraggable = makeDraggable;
	exports.getCoords = getCoords;
	exports.getScrollbarWidth = getScrollbarWidth;

	// make all elements with class = 'draggable' available for dragging
	// {control: 'controlElement', element: 'elementNeddToDrag'}
	function makeDraggable(options) {
	    var coords,
	        shiftX,
	        shiftY,
	        elem = options.element,
	        control = options.control;

	    // if (arguments.length > 0) {
	    //     if (typeof elem === 'string') {
	    //         elem = document.getElementById(elem);
	    //     } 

	    control.ondragstart = function () {
	        return false;
	    };

	    control.addEventListener('mousedown', elemMouseDown, false);

	    function elemMouseDown(evt) {
	        coords = getCoords(elem);
	        shiftX = Math.abs(evt.pageX - coords.left);
	        shiftY = Math.abs(evt.pageY - coords.top);

	        elem.style.position = 'absolute';
	        elem.style.zIndex = '1000';
	        elem.style.margin = '0';

	        moveAt(evt);
	        // поміщаємо наш елемент в body щоб він позиціонувався відносно вікна
	        document.body.appendChild(elem);

	        document.addEventListener('mousemove', dragElem, false);
	        control.addEventListener('mouseup', elemMouseUp, false);
	    }

	    function moveAt(evt) {
	        elem.style.left = evt.pageX + shiftX + 'px';
	        elem.style.top = evt.pageY - shiftY + 'px';
	    }

	    function dragElem(evt) {
	        moveAt(evt);
	    }

	    function elemMouseUp() {
	        document.removeEventListener('mousemove', dragElem);
	        elem.removeEventListener('mouseup', elemMouseUp);
	    }

	    // } else {
	    //     throw new Error('function must have an argument');
	    // }
	}

	function getCoords(elem) {
	    var box = elem.getBoundingClientRect();

	    var scrollTop = window.pageYOffset;
	    var scrollLeft = window.pageXOffset;

	    var top = box.top + scrollTop;
	    var left = box.left + scrollLeft;

	    return {
	        top: top,
	        left: left
	    };
	}

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
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.smothScroll = smothScroll;

	var _animation = __webpack_require__(3);

	function smothScroll(el, scrollTo) {
		(0, _animation.animate)({
			duration: 200,
			delta: _animation.circ,
			step: function step(delta) {
				el.scrollTop += delta * (scrollTo - el.scrollTop);
			}
		});
		}

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.animate = animate;
	exports.circ = circ;
	// The object opts should contain animation options:

	//     delay
	//     duration
	//     function delta
	//     function step

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

	// timing functions
	function circ(progress) {
	  return 1 - Math.sin(Math.acos(progress));
	}

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdFdpbmRvdy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAyNDQwYmUwODU5ODMxM2ZjYTlhZCIsIndlYnBhY2s6Ly8vc3JjL2pzL2NoYXRXaW5kb3cuanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy91dGlscy91dGlscy5qcyIsIndlYnBhY2s6Ly8vc3JjL2pzL3V0aWxzL3Njcm9sbC5qcyIsIndlYnBhY2s6Ly8vc3JjL2pzL3V0aWxzL2FuaW1hdGlvbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAyNDQwYmUwODU5ODMxM2ZjYTlhZCIsImltcG9ydCB7IGdldFNjcm9sbGJhcldpZHRoIH0gZnJvbSAnLi91dGlscy91dGlscy5qcyc7XG5pbXBvcnQgeyBzbW90aFNjcm9sbCB9IGZyb20gJy4vdXRpbHMvc2Nyb2xsLmpzJztcblxuU2ltcGxlU2Nyb2xsYmFyLmluaXRBbGwoKTtcblxuXG5sZXQgc2Nyb2xsYmFyV2lkdGggPSBnZXRTY3JvbGxiYXJXaWR0aCgpO1xuXG5sZXQgc3NDb250ZW50V3JhcHBlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc3MtY29udGVudCcpO1xuXG5mb3IgKGxldCBpID0gMDsgaSA8IHNzQ29udGVudFdyYXBwZXJzLmxlbmd0aDsgaSsrKSB7XG5cdHNzQ29udGVudFdyYXBwZXJzW2ldLnN0eWxlLndpZHRoID0gJ2NhbGMoMTAwJSArICcrIHNjcm9sbGJhcldpZHRoICsgJ3B4KSc7XG59XG5cbi8vIGVsZW1lbnRzXG5sZXQgY2hhdElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlbmQtaW5wdXQnKSxcblx0bXNnTGlzdFNjcm9sbENudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZXNzYWdlcy1saXN0IC5zcy1jb250ZW50JyksXG5cdG1zZ0NvbnRlbnRXcmFwcGVyID0gY2hhdElucHV0LnF1ZXJ5U2VsZWN0b3IoJy5zcy1jb250ZW50Jyk7XG5cbm1zZ0NvbnRlbnRXcmFwcGVyLnNldEF0dHJpYnV0ZSgnY29udGVudGVkaXRhYmxlJywgJ3RydWUnKTtcbm1zZ0NvbnRlbnRXcmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgY2xlYXJJbnB1dFRleHQpO1xuXG4vLyDRgdGC0LjRgNCw0ZQg0L3QsNC/0LjRgSBcItCS0LLQtdC00ZbRgtGMINCy0LDRiNC1INC/0L7QstGW0LTQvtC80LvQtdC90L3RjyAuLi5cIiDQutC+0LvQuCDQutC+0YDQuNGC0YPQstCw0Ycg0L/QtdGA0YjQuNC5INGA0LDQtyDQutC70ZbQutCw0ZQg0L/QvlxuLy8g0ZbQvdC/0YPRgtGDINGWINC/0ZbRgdC70Y8g0YbRjNC+0LPQviDQt9C90ZbQvNCw0ZQg0L7QsdGA0L7QsdC90LjQuiDQv9C+0LTRltGXLCDRidC+0LEg0L3QsNGB0YLRg9C/0L3QvtCz0L4g0YDQsNC30YMg0L3QtSDRgdGC0LjRgNCw0YLQuCDQv9C+0ZbQtNC+0LzQu9C10L3QvdGPIFxuLy8g0LrQvtGA0LjRgdGC0YPQstCw0YfQsFxuZnVuY3Rpb24gY2xlYXJJbnB1dFRleHQgKCkge1xuXHR0aGlzLmlubmVySFRNTCA9ICcnO1xuXHR0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgY2xlYXJJbnB1dFRleHQpO1xufVxuXG5tc2dDb250ZW50V3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdXNlcktleURvd24pO1xuXG5mdW5jdGlvbiB1c2VyS2V5RG93bihldnQpIHtcblx0aWYgKGV2dC53aGljaCA9PSAxMykgLy8gZW50ZXIga2V5IHByZXNzZWRcblx0XHRzZW5kTWVzc2FnZSgpO1xufVxuXG52YXIgbWVzc2FnZUxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVzc2FnZXMtbGlzdCAuc3MtY29udGVudCcpO1xuXG5mdW5jdGlvbiBzZW5kTWVzc2FnZSgpIHtcblx0dmFyIG1zZ0NvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShtc2dDb250ZW50V3JhcHBlci50ZXh0Q29udGVudCk7XG5cblx0bXNnQ29udGVudFdyYXBwZXIuaW5uZXJIVE1MID0gJyc7XG5cblx0dmFyIG1zZ0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHR2YXIgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcblxuXHRtc2dEaXYuY2xhc3NMaXN0LmFkZCgnbWVzc2FnZScpO1xuXHRtc2dEaXYuY2xhc3NMaXN0LmFkZCgnb3V0Y29taW5nJyk7XG5cdHAuYXBwZW5kQ2hpbGQobXNnQ29udGVudCk7XG5cdG1zZ0Rpdi5hcHBlbmRDaGlsZChwKTtcblxuXHRtZXNzYWdlTGlzdC5hcHBlbmRDaGlsZChtc2dEaXYpO1xuXG5cdGxldCBzY3JvbGxUbyA9IG1zZ0xpc3RTY3JvbGxDbnQuc2Nyb2xsVG9wICsgbXNnTGlzdFNjcm9sbENudC5zY3JvbGxIZWlnaHQgLSBtc2dMaXN0U2Nyb2xsQ250LmNsaWVudEhlaWdodDtcblx0c21vdGhTY3JvbGwobXNnTGlzdFNjcm9sbENudCwgc2Nyb2xsVG8pO1xufVxuXG5cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9jaGF0V2luZG93LmpzIiwiXG4vLyBtYWtlIGFsbCBlbGVtZW50cyB3aXRoIGNsYXNzID0gJ2RyYWdnYWJsZScgYXZhaWxhYmxlIGZvciBkcmFnZ2luZ1xuLy8ge2NvbnRyb2w6ICdjb250cm9sRWxlbWVudCcsIGVsZW1lbnQ6ICdlbGVtZW50TmVkZFRvRHJhZyd9XG5leHBvcnQgZnVuY3Rpb24gbWFrZURyYWdnYWJsZShvcHRpb25zKSB7XG4gICAgdmFyIGNvb3Jkcywgc2hpZnRYLCBzaGlmdFksXG4gICAgICAgIGVsZW0gPSBvcHRpb25zLmVsZW1lbnQsXG4gICAgICAgIGNvbnRyb2wgPSBvcHRpb25zLmNvbnRyb2w7XG5cbiAgICAvLyBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICAvLyAgICAgaWYgKHR5cGVvZiBlbGVtID09PSAnc3RyaW5nJykge1xuICAgIC8vICAgICAgICAgZWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW0pO1xuICAgIC8vICAgICB9IFxuICAgICAgIFxuICAgICAgICBjb250cm9sLm9uZHJhZ3N0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH07XG5cbiAgICAgICAgY29udHJvbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBlbGVtTW91c2VEb3duLCBmYWxzZSk7XG5cbiAgICAgICAgZnVuY3Rpb24gZWxlbU1vdXNlRG93bihldnQpIHtcbiAgICAgICAgICAgIGNvb3JkcyA9IGdldENvb3JkcyhlbGVtKTtcbiAgICAgICAgICAgIHNoaWZ0WCA9IE1hdGguYWJzKGV2dC5wYWdlWCAtIGNvb3Jkcy5sZWZ0KTtcbiAgICAgICAgICAgIHNoaWZ0WSA9IE1hdGguYWJzKGV2dC5wYWdlWSAtIGNvb3Jkcy50b3ApO1xuXG4gICAgICAgICAgICBlbGVtLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgICAgIGVsZW0uc3R5bGUuekluZGV4ID0gJzEwMDAnO1xuICAgICAgICAgICAgZWxlbS5zdHlsZS5tYXJnaW4gPSAnMCc7XG5cbiAgICAgICAgICAgIG1vdmVBdChldnQpO1xuICAgICAgICAgICAgLy8g0L/QvtC80ZbRidCw0ZTQvNC+INC90LDRiCDQtdC70LXQvNC10L3RgiDQsiBib2R5INGJ0L7QsSDQstGW0L0g0L/QvtC30LjRhtGW0L7QvdGD0LLQsNCy0YHRjyDQstGW0LTQvdC+0YHQvdC+INCy0ZbQutC90LBcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWxlbSk7XG4gICAgICAgICAgICBcblxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZHJhZ0VsZW0sIGZhbHNlKTtcbiAgICAgICAgICAgIGNvbnRyb2wuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGVsZW1Nb3VzZVVwLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGZ1bmN0aW9uIG1vdmVBdChldnQpIHtcbiAgICAgICAgICAgIGVsZW0uc3R5bGUubGVmdCA9IGV2dC5wYWdlWCArIHNoaWZ0WCArICdweCc7XG4gICAgICAgICAgICBlbGVtLnN0eWxlLnRvcCA9IGV2dC5wYWdlWSAtIHNoaWZ0WSArICdweCc7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBkcmFnRWxlbShldnQpIHtcbiAgICAgICAgICAgIG1vdmVBdChldnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZWxlbU1vdXNlVXAoKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZHJhZ0VsZW0pO1xuICAgICAgICAgICAgICAgIGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGVsZW1Nb3VzZVVwKTtcbiAgICAgICAgfVxuXG4gICAgLy8gfSBlbHNlIHtcbiAgICAvLyAgICAgdGhyb3cgbmV3IEVycm9yKCdmdW5jdGlvbiBtdXN0IGhhdmUgYW4gYXJndW1lbnQnKTtcbiAgICAvLyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb29yZHMoZWxlbSkge1xuICB2YXIgYm94ID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICB2YXIgc2Nyb2xsVG9wID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xuICB2YXIgc2Nyb2xsTGVmdCA9IHdpbmRvdy5wYWdlWE9mZnNldDtcblxuICB2YXIgdG9wID0gYm94LnRvcCArIHNjcm9sbFRvcDtcbiAgdmFyIGxlZnQgPSBib3gubGVmdCArIHNjcm9sbExlZnQ7XG5cbiAgcmV0dXJuIHtcbiAgICB0b3A6IHRvcCxcbiAgICBsZWZ0OiBsZWZ0XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTY3JvbGxiYXJXaWR0aCgpIHtcbiAgICB2YXIgb3V0ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIG91dGVyLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgIG91dGVyLnN0eWxlLnRvcCA9IFwiLTEwMDBweFwiO1xuICAgIG91dGVyLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgIG91dGVyLnN0eWxlLndpZHRoID0gXCIxMDBweFwiO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQob3V0ZXIpO1xuICAgIFxuICAgIHZhciB3aWR0aE5vU2Nyb2xsID0gb3V0ZXIub2Zmc2V0V2lkdGg7XG4gICAgLy8gZm9yY2Ugc2Nyb2xsYmFyc1xuICAgIG91dGVyLnN0eWxlLm92ZXJmbG93ID0gXCJzY3JvbGxcIjtcbiAgICBcbiAgICAvLyBhZGQgaW5uZXJkaXZcbiAgICB2YXIgaW5uZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGlubmVyLnN0eWxlLndpZHRoID0gXCIxMDAlXCI7XG4gICAgb3V0ZXIuYXBwZW5kQ2hpbGQoaW5uZXIpOyAgICAgICAgXG4gICAgXG4gICAgdmFyIHdpZHRoV2l0aFNjcm9sbCA9IGlubmVyLm9mZnNldFdpZHRoO1xuICAgIFxuICAgIC8vIHJlbW92ZSBkaXZzXG4gICAgb3V0ZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChvdXRlcik7XG4gICAgXG4gICAgcmV0dXJuIHdpZHRoTm9TY3JvbGwgLSB3aWR0aFdpdGhTY3JvbGw7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy91dGlscy91dGlscy5qcyIsImltcG9ydCB7IGFuaW1hdGUsIGNpcmMgfSBmcm9tICcuL2FuaW1hdGlvbi5qcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBzbW90aFNjcm9sbChlbCwgc2Nyb2xsVG8pIHtcblx0YW5pbWF0ZSh7XG5cdFx0ZHVyYXRpb246IDIwMCxcblx0XHRkZWx0YTogY2lyYyxcblx0XHRzdGVwOiAoZGVsdGEpID0+IHtcblx0XHRcdGVsLnNjcm9sbFRvcCArPSBkZWx0YSAqIChzY3JvbGxUbyAtIGVsLnNjcm9sbFRvcCk7XG5cdFx0fVxuXHR9KTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL3V0aWxzL3Njcm9sbC5qcyIsIi8vIFRoZSBvYmplY3Qgb3B0cyBzaG91bGQgY29udGFpbiBhbmltYXRpb24gb3B0aW9uczpcblxuLy8gICAgIGRlbGF5XG4vLyAgICAgZHVyYXRpb25cbi8vICAgICBmdW5jdGlvbiBkZWx0YVxuLy8gICAgIGZ1bmN0aW9uIHN0ZXBcblxuZXhwb3J0IGZ1bmN0aW9uIGFuaW1hdGUob3B0cykge1xuXG4gIHZhciBzdGFydCA9IG5ldyBEYXRlO1xuXG4gIHZhciBpZCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgIHZhciB0aW1lUGFzc2VkID0gbmV3IERhdGUgLSBzdGFydFxuICAgIHZhciBwcm9ncmVzcyA9IHRpbWVQYXNzZWQgLyBvcHRzLmR1cmF0aW9uXG5cbiAgICBpZiAocHJvZ3Jlc3MgPiAxKSBwcm9ncmVzcyA9IDFcbiAgICBcbiAgICB2YXIgZGVsdGEgPSBvcHRzLmRlbHRhKHByb2dyZXNzKVxuICAgIG9wdHMuc3RlcChkZWx0YSlcbiAgICBcbiAgICBpZiAocHJvZ3Jlc3MgPT0gMSkge1xuICAgICAgY2xlYXJJbnRlcnZhbChpZClcbiAgICB9XG4gIH0sIG9wdHMuZGVsYXkgfHwgMTApXG59XG5cblxuLy8gdGltaW5nIGZ1bmN0aW9uc1xuZXhwb3J0IGZ1bmN0aW9uIGNpcmMocHJvZ3Jlc3MpIHtcbiAgICByZXR1cm4gMSAtIE1hdGguc2luKE1hdGguYWNvcyhwcm9ncmVzcykpXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy91dGlscy9hbmltYXRpb24uanMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ3RDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNwREE7QUFxREE7QUFlQTtBQUNBO0FBdkVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUMzRkE7QUFDQTtBQUhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBT0E7Ozs7Ozs7Ozs7O0FDSEE7QUFxQkE7QUE1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7OzsiLCJzb3VyY2VSb290IjoiIn0=