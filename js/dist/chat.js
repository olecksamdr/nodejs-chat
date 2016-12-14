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

	window.addEventListener('load', windowLoaded, true);

	function windowLoaded() {
	    (0, _utils.makeDraggable)('chat-window');
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

/***/ }
/******/ ]);