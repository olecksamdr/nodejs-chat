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

	var _makeDraggable = __webpack_require__(1);

	var _makeDraggable2 = _interopRequireDefault(_makeDraggable);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	window.addEventListener('load', windowLoaded, true);

	function windowLoaded() {
		(0, _makeDraggable2.default)({
			element: document.getElementById('chat-window'),
			control: document.querySelector('#chat-window .drag-control')
		});
		}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = makeDraggable;

	var _getCoords = __webpack_require__(6);

	var _getCoords2 = _interopRequireDefault(_getCoords);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

	        // для того щоб не виділявся текст при перетягуванні елемента
	        evt.preventDefault();

	        coords = (0, _getCoords2.default)(elem);
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

/***/ },
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = getCoords;
	// 
	// Повертає обєкт {top, left}
	// початок документа - верхній лівий кут сторінки
	// top - y координата елемента (відносно початку документа до верхнього лівого кута елемента)
	// left - x координата елемента відносно початку документа
	// 

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAyYTc3OGE3ZThmYTBkMzBkYmMxMSIsIndlYnBhY2s6Ly8vc3JjL2pzL21haW4uanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy91dGlscy9tYWtlRHJhZ2dhYmxlLmpzIiwid2VicGFjazovLy9zcmMvanMvdXRpbHMvZ2V0Q29vcmRzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDJhNzc4YTdlOGZhMGQzMGRiYzExIiwiaW1wb3J0IG1ha2VEcmFnZ2FibGUgZnJvbSAnLi91dGlscy9tYWtlRHJhZ2dhYmxlLmpzJztcclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgd2luZG93TG9hZGVkLCB0cnVlKTtcclxuXHJcbmZ1bmN0aW9uIHdpbmRvd0xvYWRlZCgpIHtcclxuXHRtYWtlRHJhZ2dhYmxlKHtcclxuXHRcdGVsZW1lbnQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaGF0LXdpbmRvdycpLFxyXG5cdFx0Y29udHJvbDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NoYXQtd2luZG93IC5kcmFnLWNvbnRyb2wnKVxyXG5cdH0pO1xyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9tYWluLmpzIiwiaW1wb3J0IGdldENvb3JkcyBmcm9tICcuL2dldENvb3Jkcy5qcyc7XG5cbi8vIG1ha2UgYWxsIGVsZW1lbnRzIHdpdGggY2xhc3MgPSAnZHJhZ2dhYmxlJyBhdmFpbGFibGUgZm9yIGRyYWdnaW5nXG4vLyB7Y29udHJvbDogJ2NvbnRyb2xFbGVtZW50JywgZWxlbWVudDogJ2VsZW1lbnROZWRkVG9EcmFnJ31cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWFrZURyYWdnYWJsZShvcHRpb25zKSB7XG4gICAgdmFyIGNvb3Jkcywgc2hpZnRYLCBzaGlmdFksXG4gICAgICAgIGVsZW0gPSBvcHRpb25zLmVsZW1lbnQsXG4gICAgICAgIGNvbnRyb2wgPSBvcHRpb25zLmNvbnRyb2w7XG5cbiAgICAvLyBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICAvLyAgICAgaWYgKHR5cGVvZiBlbGVtID09PSAnc3RyaW5nJykge1xuICAgIC8vICAgICAgICAgZWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW0pO1xuICAgIC8vICAgICB9IFxuICAgICAgIFxuICAgICAgICBjb250cm9sLm9uZHJhZ3N0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH07XG5cbiAgICAgICAgY29udHJvbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBlbGVtTW91c2VEb3duLCBmYWxzZSk7XG5cbiAgICAgICAgZnVuY3Rpb24gZWxlbU1vdXNlRG93bihldnQpIHtcblxuICAgICAgICAgICAgLy8g0LTQu9GPINGC0L7Qs9C+INGJ0L7QsSDQvdC1INCy0LjQtNGW0LvRj9Cy0YHRjyDRgtC10LrRgdGCINC/0YDQuCDQv9C10YDQtdGC0Y/Qs9GD0LLQsNC90L3RliDQtdC70LXQvNC10L3RgtCwXG4gICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgY29vcmRzID0gZ2V0Q29vcmRzKGVsZW0pO1xuICAgICAgICAgICAgc2hpZnRYID0gTWF0aC5hYnMoZXZ0LnBhZ2VYIC0gY29vcmRzLmxlZnQpO1xuICAgICAgICAgICAgc2hpZnRZID0gTWF0aC5hYnMoZXZ0LnBhZ2VZIC0gY29vcmRzLnRvcCk7XG5cbiAgICAgICAgICAgIGVsZW0uc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICAgICAgZWxlbS5zdHlsZS56SW5kZXggPSAnMTAwMCc7XG4gICAgICAgICAgICBlbGVtLnN0eWxlLm1hcmdpbiA9ICcwJztcblxuICAgICAgICAgICAgbW92ZUF0KGV2dCk7XG4gICAgICAgICAgICAvLyDQv9C+0LzRltGJ0LDRlNC80L4g0L3QsNGIINC10LvQtdC80LXQvdGCINCyIGJvZHkg0YnQvtCxINCy0ZbQvSDQv9C+0LfQuNGG0ZbQvtC90YPQstCw0LLRgdGPINCy0ZbQtNC90L7RgdC90L4g0LLRltC60L3QsFxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbGVtKTtcbiAgICAgICAgICAgIFxuXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBkcmFnRWxlbSwgZmFsc2UpO1xuICAgICAgICAgICAgY29udHJvbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgZWxlbU1vdXNlVXAsIGZhbHNlKTtcblxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBmdW5jdGlvbiBtb3ZlQXQoZXZ0KSB7XG4gICAgICAgICAgICBlbGVtLnN0eWxlLmxlZnQgPSBldnQucGFnZVggKyBzaGlmdFggKyAncHgnO1xuICAgICAgICAgICAgZWxlbS5zdHlsZS50b3AgPSBldnQucGFnZVkgLSBzaGlmdFkgKyAncHgnO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZHJhZ0VsZW0oZXZ0KSB7XG4gICAgICAgICAgICBtb3ZlQXQoZXZ0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGVsZW1Nb3VzZVVwKCkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGRyYWdFbGVtKTtcbiAgICAgICAgICAgICAgICBlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBlbGVtTW91c2VVcCk7XG4gICAgICAgIH1cblxuICAgIC8vIH0gZWxzZSB7XG4gICAgLy8gICAgIHRocm93IG5ldyBFcnJvcignZnVuY3Rpb24gbXVzdCBoYXZlIGFuIGFyZ3VtZW50Jyk7XG4gICAgLy8gfVxufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL3V0aWxzL21ha2VEcmFnZ2FibGUuanMiLCIvLyBcbi8vINCf0L7QstC10YDRgtCw0ZQg0L7QsdGU0LrRgiB7dG9wLCBsZWZ0fVxuLy8g0L/QvtGH0LDRgtC+0Log0LTQvtC60YPQvNC10L3RgtCwIC0g0LLQtdGA0YXQvdGW0Lkg0LvRltCy0LjQuSDQutGD0YIg0YHRgtC+0YDRltC90LrQuFxuLy8gdG9wIC0geSDQutC+0L7RgNC00LjQvdCw0YLQsCDQtdC70LXQvNC10L3RgtCwICjQstGW0LTQvdC+0YHQvdC+INC/0L7Rh9Cw0YLQutGDINC00L7QutGD0LzQtdC90YLQsCDQtNC+INCy0LXRgNGF0L3RjNC+0LPQviDQu9GW0LLQvtCz0L4g0LrRg9GC0LAg0LXQu9C10LzQtdC90YLQsClcbi8vIGxlZnQgLSB4INC60L7QvtGA0LTQuNC90LDRgtCwINC10LvQtdC80LXQvdGC0LAg0LLRltC00L3QvtGB0L3QviDQv9C+0YfQsNGC0LrRgyDQtNC+0LrRg9C80LXQvdGC0LBcbi8vIFxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRDb29yZHMoZWxlbSkge1xuICB2YXIgYm94ID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICB2YXIgc2Nyb2xsVG9wID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xuICB2YXIgc2Nyb2xsTGVmdCA9IHdpbmRvdy5wYWdlWE9mZnNldDtcblxuICB2YXIgdG9wID0gYm94LnRvcCArIHNjcm9sbFRvcDtcbiAgdmFyIGxlZnQgPSBib3gubGVmdCArIHNjcm9sbExlZnQ7XG5cbiAgcmV0dXJuIHtcbiAgICB0b3A6IHRvcCxcbiAgICBsZWZ0OiBsZWZ0XG4gIH07XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy91dGlscy9nZXRDb29yZHMuanMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ3RDQTtBQUNBOzs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7Ozs7Ozs7Ozs7O0FDSkE7QUFDQTtBQU5BO0FBQ0E7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3JEQTtBQVBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTs7OyIsInNvdXJjZVJvb3QiOiIifQ==