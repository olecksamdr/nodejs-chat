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

	console.log(msgContentWrapper);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdFdpbmRvdy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBiNWY2ZTBiMmQzZGYyYzQ3NGU5MSIsIndlYnBhY2s6Ly8vanMvc3JjL2NoYXRXaW5kb3cuanMiLCJ3ZWJwYWNrOi8vL2pzL3NyYy91dGlscy91dGlscy5qcyIsIndlYnBhY2s6Ly8vanMvc3JjL3V0aWxzL3Njcm9sbC5qcyIsIndlYnBhY2s6Ly8vanMvc3JjL3V0aWxzL2FuaW1hdGlvbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBiNWY2ZTBiMmQzZGYyYzQ3NGU5MSIsImltcG9ydCB7IGdldFNjcm9sbGJhcldpZHRoIH0gZnJvbSAnLi91dGlscy91dGlscy5qcyc7XG5pbXBvcnQgeyBzbW90aFNjcm9sbCB9IGZyb20gJy4vdXRpbHMvc2Nyb2xsLmpzJztcblxuU2ltcGxlU2Nyb2xsYmFyLmluaXRBbGwoKTtcblxuXG5sZXQgc2Nyb2xsYmFyV2lkdGggPSBnZXRTY3JvbGxiYXJXaWR0aCgpO1xuXG5sZXQgc3NDb250ZW50V3JhcHBlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc3MtY29udGVudCcpO1xuXG5mb3IgKGxldCBpID0gMDsgaSA8IHNzQ29udGVudFdyYXBwZXJzLmxlbmd0aDsgaSsrKSB7XG5cdHNzQ29udGVudFdyYXBwZXJzW2ldLnN0eWxlLndpZHRoID0gJ2NhbGMoMTAwJSArICcrIHNjcm9sbGJhcldpZHRoICsgJ3B4KSc7XG59XG5cbi8vIGVsZW1lbnRzXG5sZXQgY2hhdElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlbmQtaW5wdXQnKSxcblx0bXNnTGlzdFNjcm9sbENudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZXNzYWdlcy1saXN0IC5zcy1jb250ZW50JyksXG5cdG1zZ0NvbnRlbnRXcmFwcGVyID0gY2hhdElucHV0LnF1ZXJ5U2VsZWN0b3IoJy5zcy1jb250ZW50Jyk7XG5cbm1zZ0NvbnRlbnRXcmFwcGVyLnNldEF0dHJpYnV0ZSgnY29udGVudGVkaXRhYmxlJywgJ3RydWUnKTtcbm1zZ0NvbnRlbnRXcmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgY2xlYXJJbnB1dFRleHQpO1xuXG4vLyDRgdGC0LjRgNCw0ZQg0L3QsNC/0LjRgSBcItCS0LLQtdC00ZbRgtGMINCy0LDRiNC1INC/0L7QstGW0LTQvtC80LvQtdC90L3RjyAuLi5cIiDQutC+0LvQuCDQutC+0YDQuNGC0YPQstCw0Ycg0L/QtdGA0YjQuNC5INGA0LDQtyDQutC70ZbQutCw0ZQg0L/QvlxuLy8g0ZbQvdC/0YPRgtGDINGWINC/0ZbRgdC70Y8g0YbRjNC+0LPQviDQt9C90ZbQvNCw0ZQg0L7QsdGA0L7QsdC90LjQuiDQv9C+0LTRltGXLCDRidC+0LEg0L3QsNGB0YLRg9C/0L3QvtCz0L4g0YDQsNC30YMg0L3QtSDRgdGC0LjRgNCw0YLQuCDQv9C+0ZbQtNC+0LzQu9C10L3QvdGPIFxuLy8g0LrQvtGA0LjRgdGC0YPQstCw0YfQsFxuZnVuY3Rpb24gY2xlYXJJbnB1dFRleHQgKCkge1xuXHR0aGlzLmlubmVySFRNTCA9ICcnO1xuXHR0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgY2xlYXJJbnB1dFRleHQpO1xufVxuXG5tc2dDb250ZW50V3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdXNlcktleURvd24pO1xuXG5jb25zb2xlLmxvZyhtc2dDb250ZW50V3JhcHBlcik7XG5cbmZ1bmN0aW9uIHVzZXJLZXlEb3duKGV2dCkge1xuXHRpZiAoZXZ0LndoaWNoID09IDEzKSAvLyBlbnRlciBrZXkgcHJlc3NlZFxuXHRcdHNlbmRNZXNzYWdlKCk7XG59XG5cbnZhciBtZXNzYWdlTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZXNzYWdlcy1saXN0IC5zcy1jb250ZW50Jyk7XG5cbmZ1bmN0aW9uIHNlbmRNZXNzYWdlKCkge1xuXHR2YXIgbXNnQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG1zZ0NvbnRlbnRXcmFwcGVyLnRleHRDb250ZW50KTtcblxuXHRtc2dDb250ZW50V3JhcHBlci5pbm5lckhUTUwgPSAnJztcblxuXHR2YXIgbXNnRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdHZhciBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuXG5cdG1zZ0Rpdi5jbGFzc0xpc3QuYWRkKCdtZXNzYWdlJyk7XG5cdG1zZ0Rpdi5jbGFzc0xpc3QuYWRkKCdvdXRjb21pbmcnKTtcblx0cC5hcHBlbmRDaGlsZChtc2dDb250ZW50KTtcblx0bXNnRGl2LmFwcGVuZENoaWxkKHApO1xuXG5cdG1lc3NhZ2VMaXN0LmFwcGVuZENoaWxkKG1zZ0Rpdik7XG5cblx0bGV0IHNjcm9sbFRvID0gbXNnTGlzdFNjcm9sbENudC5zY3JvbGxUb3AgKyBtc2dMaXN0U2Nyb2xsQ250LnNjcm9sbEhlaWdodCAtIG1zZ0xpc3RTY3JvbGxDbnQuY2xpZW50SGVpZ2h0O1xuXHRzbW90aFNjcm9sbChtc2dMaXN0U2Nyb2xsQ250LCBzY3JvbGxUbyk7XG59XG5cblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8ganMvc3JjL2NoYXRXaW5kb3cuanMiLCJcbi8vIG1ha2UgYWxsIGVsZW1lbnRzIHdpdGggY2xhc3MgPSAnZHJhZ2dhYmxlJyBhdmFpbGFibGUgZm9yIGRyYWdnaW5nXG4vLyB7Y29udHJvbDogJ2NvbnRyb2xFbGVtZW50JywgZWxlbWVudDogJ2VsZW1lbnROZWRkVG9EcmFnJ31cbmV4cG9ydCBmdW5jdGlvbiBtYWtlRHJhZ2dhYmxlKG9wdGlvbnMpIHtcbiAgICB2YXIgY29vcmRzLCBzaGlmdFgsIHNoaWZ0WSxcbiAgICAgICAgZWxlbSA9IG9wdGlvbnMuZWxlbWVudCxcbiAgICAgICAgY29udHJvbCA9IG9wdGlvbnMuY29udHJvbDtcblxuICAgIC8vIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMCkge1xuICAgIC8vICAgICBpZiAodHlwZW9mIGVsZW0gPT09ICdzdHJpbmcnKSB7XG4gICAgLy8gICAgICAgICBlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbSk7XG4gICAgLy8gICAgIH0gXG4gICAgICAgXG4gICAgICAgIGNvbnRyb2wub25kcmFnc3RhcnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfTtcblxuICAgICAgICBjb250cm9sLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGVsZW1Nb3VzZURvd24sIGZhbHNlKTtcblxuICAgICAgICBmdW5jdGlvbiBlbGVtTW91c2VEb3duKGV2dCkge1xuICAgICAgICAgICAgY29vcmRzID0gZ2V0Q29vcmRzKGVsZW0pO1xuICAgICAgICAgICAgc2hpZnRYID0gTWF0aC5hYnMoZXZ0LnBhZ2VYIC0gY29vcmRzLmxlZnQpO1xuICAgICAgICAgICAgc2hpZnRZID0gTWF0aC5hYnMoZXZ0LnBhZ2VZIC0gY29vcmRzLnRvcCk7XG5cbiAgICAgICAgICAgIGVsZW0uc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICAgICAgZWxlbS5zdHlsZS56SW5kZXggPSAnMTAwMCc7XG4gICAgICAgICAgICBlbGVtLnN0eWxlLm1hcmdpbiA9ICcwJztcblxuICAgICAgICAgICAgbW92ZUF0KGV2dCk7XG4gICAgICAgICAgICAvLyDQv9C+0LzRltGJ0LDRlNC80L4g0L3QsNGIINC10LvQtdC80LXQvdGCINCyIGJvZHkg0YnQvtCxINCy0ZbQvSDQv9C+0LfQuNGG0ZbQvtC90YPQstCw0LLRgdGPINCy0ZbQtNC90L7RgdC90L4g0LLRltC60L3QsFxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbGVtKTtcbiAgICAgICAgICAgIFxuXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBkcmFnRWxlbSwgZmFsc2UpO1xuICAgICAgICAgICAgY29udHJvbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgZWxlbU1vdXNlVXAsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZnVuY3Rpb24gbW92ZUF0KGV2dCkge1xuICAgICAgICAgICAgZWxlbS5zdHlsZS5sZWZ0ID0gZXZ0LnBhZ2VYICsgc2hpZnRYICsgJ3B4JztcbiAgICAgICAgICAgIGVsZW0uc3R5bGUudG9wID0gZXZ0LnBhZ2VZIC0gc2hpZnRZICsgJ3B4JztcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGRyYWdFbGVtKGV2dCkge1xuICAgICAgICAgICAgbW92ZUF0KGV2dCk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBlbGVtTW91c2VVcCgpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBkcmFnRWxlbSk7XG4gICAgICAgICAgICAgICAgZWxlbS5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgZWxlbU1vdXNlVXApO1xuICAgICAgICB9XG5cbiAgICAvLyB9IGVsc2Uge1xuICAgIC8vICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Z1bmN0aW9uIG11c3QgaGF2ZSBhbiBhcmd1bWVudCcpO1xuICAgIC8vIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENvb3JkcyhlbGVtKSB7XG4gIHZhciBib3ggPSBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gIHZhciBzY3JvbGxUb3AgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XG4gIHZhciBzY3JvbGxMZWZ0ID0gd2luZG93LnBhZ2VYT2Zmc2V0O1xuXG4gIHZhciB0b3AgPSBib3gudG9wICsgc2Nyb2xsVG9wO1xuICB2YXIgbGVmdCA9IGJveC5sZWZ0ICsgc2Nyb2xsTGVmdDtcblxuICByZXR1cm4ge1xuICAgIHRvcDogdG9wLFxuICAgIGxlZnQ6IGxlZnRcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNjcm9sbGJhcldpZHRoKCkge1xuICAgIHZhciBvdXRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgb3V0ZXIuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgb3V0ZXIuc3R5bGUudG9wID0gXCItMTAwMHB4XCI7XG4gICAgb3V0ZXIuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgb3V0ZXIuc3R5bGUud2lkdGggPSBcIjEwMHB4XCI7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChvdXRlcik7XG4gICAgXG4gICAgdmFyIHdpZHRoTm9TY3JvbGwgPSBvdXRlci5vZmZzZXRXaWR0aDtcbiAgICAvLyBmb3JjZSBzY3JvbGxiYXJzXG4gICAgb3V0ZXIuc3R5bGUub3ZlcmZsb3cgPSBcInNjcm9sbFwiO1xuICAgIFxuICAgIC8vIGFkZCBpbm5lcmRpdlxuICAgIHZhciBpbm5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgaW5uZXIuc3R5bGUud2lkdGggPSBcIjEwMCVcIjtcbiAgICBvdXRlci5hcHBlbmRDaGlsZChpbm5lcik7ICAgICAgICBcbiAgICBcbiAgICB2YXIgd2lkdGhXaXRoU2Nyb2xsID0gaW5uZXIub2Zmc2V0V2lkdGg7XG4gICAgXG4gICAgLy8gcmVtb3ZlIGRpdnNcbiAgICBvdXRlci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG91dGVyKTtcbiAgICBcbiAgICByZXR1cm4gd2lkdGhOb1Njcm9sbCAtIHdpZHRoV2l0aFNjcm9sbDtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8ganMvc3JjL3V0aWxzL3V0aWxzLmpzIiwiaW1wb3J0IHsgYW5pbWF0ZSwgY2lyYyB9IGZyb20gJy4vYW5pbWF0aW9uLmpzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHNtb3RoU2Nyb2xsKGVsLCBzY3JvbGxUbykge1xuXHRhbmltYXRlKHtcblx0XHRkdXJhdGlvbjogMjAwLFxuXHRcdGRlbHRhOiBjaXJjLFxuXHRcdHN0ZXA6IChkZWx0YSkgPT4ge1xuXHRcdFx0ZWwuc2Nyb2xsVG9wICs9IGRlbHRhICogKHNjcm9sbFRvIC0gZWwuc2Nyb2xsVG9wKTtcblx0XHR9XG5cdH0pO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBqcy9zcmMvdXRpbHMvc2Nyb2xsLmpzIiwiLy8gVGhlIG9iamVjdCBvcHRzIHNob3VsZCBjb250YWluIGFuaW1hdGlvbiBvcHRpb25zOlxuXG4vLyAgICAgZGVsYXlcbi8vICAgICBkdXJhdGlvblxuLy8gICAgIGZ1bmN0aW9uIGRlbHRhXG4vLyAgICAgZnVuY3Rpb24gc3RlcFxuXG5leHBvcnQgZnVuY3Rpb24gYW5pbWF0ZShvcHRzKSB7XG5cbiAgdmFyIHN0YXJ0ID0gbmV3IERhdGU7XG5cbiAgdmFyIGlkID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgdmFyIHRpbWVQYXNzZWQgPSBuZXcgRGF0ZSAtIHN0YXJ0XG4gICAgdmFyIHByb2dyZXNzID0gdGltZVBhc3NlZCAvIG9wdHMuZHVyYXRpb25cblxuICAgIGlmIChwcm9ncmVzcyA+IDEpIHByb2dyZXNzID0gMVxuICAgIFxuICAgIHZhciBkZWx0YSA9IG9wdHMuZGVsdGEocHJvZ3Jlc3MpXG4gICAgb3B0cy5zdGVwKGRlbHRhKVxuICAgIFxuICAgIGlmIChwcm9ncmVzcyA9PSAxKSB7XG4gICAgICBjbGVhckludGVydmFsKGlkKVxuICAgIH1cbiAgfSwgb3B0cy5kZWxheSB8fCAxMClcbn1cblxuXG4vLyB0aW1pbmcgZnVuY3Rpb25zXG5leHBvcnQgZnVuY3Rpb24gY2lyYyhwcm9ncmVzcykge1xuICAgIHJldHVybiAxIC0gTWF0aC5zaW4oTWF0aC5hY29zKHByb2dyZXNzKSlcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8ganMvc3JjL3V0aWxzL2FuaW1hdGlvbi5qcyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDdENBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN0REE7QUFxREE7QUFlQTtBQUNBO0FBdkVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUMzRkE7QUFDQTtBQUhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBT0E7Ozs7Ozs7Ozs7O0FDSEE7QUFxQkE7QUE1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7OzsiLCJzb3VyY2VSb290IjoiIn0=