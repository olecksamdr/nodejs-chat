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

	SimpleScrollbar.initAll();

	var chatInput = document.querySelector('.send-input');

	SimpleScrollbar.initEl(chatInput);

	// стирає напис "Введіть ваше повідомлення ..." коли коритувач перший раз клікає по
	// інпуту і після цього знімає обробник події, щоб наступного разу не стирати поідомлення 
	// користувача
	var scrollbarWidth = (0, _utils.getScrollbarWidth)();

	var ssContentWrappers = document.querySelectorAll('.ss-content');

	for (var i = 0; i < ssContentWrappers.length; i++) {
		ssContentWrappers[i].style.width = 'calc(100% + ' + scrollbarWidth + 'px)';
	}

	var msgContentWrapper = chatInput.querySelector('.ss-content');
	msgContentWrapper.setAttribute('contenteditable', 'true');
	msgContentWrapper.addEventListener('focus', clearInputText);

	// if user click on send-input he do not drag the winow 
	chatInput.addEventListener('mousedown', stopPropagation);

	function clearInputText() {
		this.innerHTML = '';
		this.removeEventListener('focus', clearInputText);
	}

	function stopPropagation(evt) {
		evt.stopPropagation();
	}

	msgContentWrapper.addEventListener('keydown', userKeyDown);

	console.log(msgContentWrapper);

	function userKeyDown(evt) {
		if (evt.which == 13) sendMessage();
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
	        console.log(evt.pageX);
	        console.log(evt.pageY);

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

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdFdpbmRvdy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBhYmNlYWY0YzU1YmRjYmMxNTkzMyIsIndlYnBhY2s6Ly8vanMvc3JjL2NoYXRXaW5kb3cuanMiLCJ3ZWJwYWNrOi8vL2pzL3NyYy91dGlscy91dGlscy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBhYmNlYWY0YzU1YmRjYmMxNTkzMyIsImltcG9ydCB7IGdldFNjcm9sbGJhcldpZHRoIH0gZnJvbSAnLi91dGlscy91dGlscy5qcyc7XG5cblNpbXBsZVNjcm9sbGJhci5pbml0QWxsKCk7XG5cbmxldCBjaGF0SW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VuZC1pbnB1dCcpO1xuXG5TaW1wbGVTY3JvbGxiYXIuaW5pdEVsKGNoYXRJbnB1dCk7XG5cbi8vINGB0YLQuNGA0LDRlCDQvdCw0L/QuNGBIFwi0JLQstC10LTRltGC0Ywg0LLQsNGI0LUg0L/QvtCy0ZbQtNC+0LzQu9C10L3QvdGPIC4uLlwiINC60L7Qu9C4INC60L7RgNC40YLRg9Cy0LDRhyDQv9C10YDRiNC40Lkg0YDQsNC3INC60LvRltC60LDRlCDQv9C+XG4vLyDRltC90L/Rg9GC0YMg0ZYg0L/RltGB0LvRjyDRhtGM0L7Qs9C+INC30L3RltC80LDRlCDQvtCx0YDQvtCx0L3QuNC6INC/0L7QtNGW0ZcsINGJ0L7QsSDQvdCw0YHRgtGD0L/QvdC+0LPQviDRgNCw0LfRgyDQvdC1INGB0YLQuNGA0LDRgtC4INC/0L7RltC00L7QvNC70LXQvdC90Y8gXG4vLyDQutC+0YDQuNGB0YLRg9Cy0LDRh9CwXG5sZXQgc2Nyb2xsYmFyV2lkdGggPSBnZXRTY3JvbGxiYXJXaWR0aCgpO1xuXG5sZXQgc3NDb250ZW50V3JhcHBlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc3MtY29udGVudCcpO1xuXG5mb3IgKGxldCBpID0gMDsgaSA8IHNzQ29udGVudFdyYXBwZXJzLmxlbmd0aDsgaSsrKSB7XG5cdHNzQ29udGVudFdyYXBwZXJzW2ldLnN0eWxlLndpZHRoID0gJ2NhbGMoMTAwJSArICcrIHNjcm9sbGJhcldpZHRoICsgJ3B4KSc7XG59XG5cbmxldCBtc2dDb250ZW50V3JhcHBlciA9IGNoYXRJbnB1dC5xdWVyeVNlbGVjdG9yKCcuc3MtY29udGVudCcpO1xubXNnQ29udGVudFdyYXBwZXIuc2V0QXR0cmlidXRlKCdjb250ZW50ZWRpdGFibGUnLCAndHJ1ZScpO1xubXNnQ29udGVudFdyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCBjbGVhcklucHV0VGV4dCk7XG5cbi8vIGlmIHVzZXIgY2xpY2sgb24gc2VuZC1pbnB1dCBoZSBkbyBub3QgZHJhZyB0aGUgd2lub3cgXG5jaGF0SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgc3RvcFByb3BhZ2F0aW9uKTtcblxuZnVuY3Rpb24gY2xlYXJJbnB1dFRleHQgKCkge1xuXHR0aGlzLmlubmVySFRNTCA9ICcnO1xuXHR0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgY2xlYXJJbnB1dFRleHQpO1xufVxuXG5cbmZ1bmN0aW9uIHN0b3BQcm9wYWdhdGlvbiAoZXZ0KSB7XG5cdGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcbn1cblxubXNnQ29udGVudFdyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHVzZXJLZXlEb3duKTtcblxuY29uc29sZS5sb2cobXNnQ29udGVudFdyYXBwZXIpO1xuXG5mdW5jdGlvbiB1c2VyS2V5RG93bihldnQpIHtcblx0aWYgKGV2dC53aGljaCA9PSAxMyApXG5cdFx0c2VuZE1lc3NhZ2UoKTtcbn1cblxudmFyIG1lc3NhZ2VMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lc3NhZ2VzLWxpc3QgLnNzLWNvbnRlbnQnKTtcblxuZnVuY3Rpb24gc2VuZE1lc3NhZ2UoKSB7XG5cdHZhciBtc2dDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobXNnQ29udGVudFdyYXBwZXIudGV4dENvbnRlbnQpO1xuXG5cdG1zZ0NvbnRlbnRXcmFwcGVyLmlubmVySFRNTCA9ICcnO1xuXG5cdHZhciBtc2dEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0dmFyIHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG5cblx0bXNnRGl2LmNsYXNzTGlzdC5hZGQoJ21lc3NhZ2UnKTtcblx0bXNnRGl2LmNsYXNzTGlzdC5hZGQoJ291dGNvbWluZycpO1xuXHRwLmFwcGVuZENoaWxkKG1zZ0NvbnRlbnQpO1xuXHRtc2dEaXYuYXBwZW5kQ2hpbGQocCk7XG5cblx0bWVzc2FnZUxpc3QuYXBwZW5kQ2hpbGQobXNnRGl2KTtcbn1cblxuXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBqcy9zcmMvY2hhdFdpbmRvdy5qcyIsIlxuLy8gbWFrZSBhbGwgZWxlbWVudHMgd2l0aCBjbGFzcyA9ICdkcmFnZ2FibGUnIGF2YWlsYWJsZSBmb3IgZHJhZ2dpbmdcbi8vIHtjb250cm9sOiAnY29udHJvbEVsZW1lbnQnLCBlbGVtZW50OiAnZWxlbWVudE5lZGRUb0RyYWcnfVxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VEcmFnZ2FibGUob3B0aW9ucykge1xuICAgIHZhciBjb29yZHMsIHNoaWZ0WCwgc2hpZnRZLFxuICAgICAgICBlbGVtID0gb3B0aW9ucy5lbGVtZW50LFxuICAgICAgICBjb250cm9sID0gb3B0aW9ucy5jb250cm9sO1xuXG4gICAgLy8gaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgLy8gICAgIGlmICh0eXBlb2YgZWxlbSA9PT0gJ3N0cmluZycpIHtcbiAgICAvLyAgICAgICAgIGVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtKTtcbiAgICAvLyAgICAgfSBcbiAgICAgICBcbiAgICAgICAgY29udHJvbC5vbmRyYWdzdGFydCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnRyb2wuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZWxlbU1vdXNlRG93biwgZmFsc2UpO1xuXG4gICAgICAgIGZ1bmN0aW9uIGVsZW1Nb3VzZURvd24oZXZ0KSB7XG4gICAgICAgICAgICBjb29yZHMgPSBnZXRDb29yZHMoZWxlbSk7XG4gICAgICAgICAgICBzaGlmdFggPSBNYXRoLmFicyhldnQucGFnZVggLSBjb29yZHMubGVmdCk7XG4gICAgICAgICAgICBzaGlmdFkgPSBNYXRoLmFicyhldnQucGFnZVkgLSBjb29yZHMudG9wKTtcblxuICAgICAgICAgICAgZWxlbS5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICAgICAgICBlbGVtLnN0eWxlLnpJbmRleCA9ICcxMDAwJztcbiAgICAgICAgICAgIGVsZW0uc3R5bGUubWFyZ2luID0gJzAnO1xuXG4gICAgICAgICAgICBtb3ZlQXQoZXZ0KTtcbiAgICAgICAgICAgIC8vINC/0L7QvNGW0YnQsNGU0LzQviDQvdCw0Ygg0LXQu9C10LzQtdC90YIg0LIgYm9keSDRidC+0LEg0LLRltC9INC/0L7Qt9C40YbRltC+0L3Rg9Cy0LDQstGB0Y8g0LLRltC00L3QvtGB0L3QviDQstGW0LrQvdCwXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsZW0pO1xuICAgICAgICAgICAgXG5cbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGRyYWdFbGVtLCBmYWxzZSk7XG4gICAgICAgICAgICBjb250cm9sLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBlbGVtTW91c2VVcCwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBmdW5jdGlvbiBtb3ZlQXQoZXZ0KSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhldnQucGFnZVgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXZ0LnBhZ2VZKTtcblxuICAgICAgICAgICAgZWxlbS5zdHlsZS5sZWZ0ID0gZXZ0LnBhZ2VYICsgc2hpZnRYICsgJ3B4JztcbiAgICAgICAgICAgIGVsZW0uc3R5bGUudG9wID0gZXZ0LnBhZ2VZIC0gc2hpZnRZICsgJ3B4JztcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGRyYWdFbGVtKGV2dCkge1xuICAgICAgICAgICAgbW92ZUF0KGV2dCk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBlbGVtTW91c2VVcCgpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBkcmFnRWxlbSk7XG4gICAgICAgICAgICAgICAgZWxlbS5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgZWxlbU1vdXNlVXApO1xuICAgICAgICB9XG5cbiAgICAvLyB9IGVsc2Uge1xuICAgIC8vICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Z1bmN0aW9uIG11c3QgaGF2ZSBhbiBhcmd1bWVudCcpO1xuICAgIC8vIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENvb3JkcyhlbGVtKSB7XG4gIHZhciBib3ggPSBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gIHZhciBzY3JvbGxUb3AgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XG4gIHZhciBzY3JvbGxMZWZ0ID0gd2luZG93LnBhZ2VYT2Zmc2V0O1xuXG4gIHZhciB0b3AgPSBib3gudG9wICsgc2Nyb2xsVG9wO1xuICB2YXIgbGVmdCA9IGJveC5sZWZ0ICsgc2Nyb2xsTGVmdDtcblxuICByZXR1cm4ge1xuICAgIHRvcDogdG9wLFxuICAgIGxlZnQ6IGxlZnRcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNjcm9sbGJhcldpZHRoKCkge1xuICAgIHZhciBvdXRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgb3V0ZXIuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgb3V0ZXIuc3R5bGUudG9wID0gXCItMTAwMHB4XCI7XG4gICAgb3V0ZXIuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgb3V0ZXIuc3R5bGUud2lkdGggPSBcIjEwMHB4XCI7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChvdXRlcik7XG4gICAgXG4gICAgdmFyIHdpZHRoTm9TY3JvbGwgPSBvdXRlci5vZmZzZXRXaWR0aDtcbiAgICAvLyBmb3JjZSBzY3JvbGxiYXJzXG4gICAgb3V0ZXIuc3R5bGUub3ZlcmZsb3cgPSBcInNjcm9sbFwiO1xuICAgIFxuICAgIC8vIGFkZCBpbm5lcmRpdlxuICAgIHZhciBpbm5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgaW5uZXIuc3R5bGUud2lkdGggPSBcIjEwMCVcIjtcbiAgICBvdXRlci5hcHBlbmRDaGlsZChpbm5lcik7ICAgICAgICBcbiAgICBcbiAgICB2YXIgd2lkdGhXaXRoU2Nyb2xsID0gaW5uZXIub2Zmc2V0V2lkdGg7XG4gICAgXG4gICAgLy8gcmVtb3ZlIGRpdnNcbiAgICBvdXRlci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG91dGVyKTtcbiAgICBcbiAgICByZXR1cm4gd2lkdGhOb1Njcm9sbCAtIHdpZHRoV2l0aFNjcm9sbDtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8ganMvc3JjL3V0aWxzL3V0aWxzLmpzIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDekRBO0FBd0RBO0FBZUE7QUFDQTtBQTFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OzsiLCJzb3VyY2VSb290IjoiIn0=