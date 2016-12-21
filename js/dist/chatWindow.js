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
	function makeDraggable(elem) {
	    var coords, shiftX, shiftY;

	    if (arguments.length > 0) {
	        (function () {
	            var elemMouseDown = function elemMouseDown(evt) {
	                coords = getCoords(elem);
	                shiftX = evt.pageX - coords.left;
	                shiftY = evt.pageY - coords.top;

	                this.style.position = 'absolute';
	                this.style.zIndex = '1000';
	                this.style.margin = '0';

	                moveAt(evt);
	                // поміщаємо наш елемент в body щоб він позиціонувався відносно вікна
	                document.body.appendChild(this);

	                document.addEventListener('mousemove', dragElem, false);
	                elem.addEventListener('mouseup', elemMouseUp, false);
	            };

	            var moveAt = function moveAt(evt) {
	                elem.style.left = evt.pageX - shiftX + 'px';
	                elem.style.top = evt.pageY - shiftY + 'px';
	            };

	            var dragElem = function dragElem(evt) {
	                moveAt(evt);
	            };

	            var elemMouseUp = function elemMouseUp() {
	                document.removeEventListener('mousemove', dragElem);
	                elem.removeEventListener('mouseup', elemMouseUp);
	            };

	            if (typeof elem === 'string') {
	                elem = document.getElementById(elem);
	            }

	            elem.ondragstart = function () {
	                return false;
	            };

	            elem.addEventListener('mousedown', elemMouseDown, false);
	        })();
	    } else {
	        throw new Error('function must have an argument');
	    }
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