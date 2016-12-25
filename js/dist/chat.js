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
		(0, _utils.makeDraggable)({
			element: document.getElementById('chat-window'),
			control: document.querySelector('#chat-window .drag-control')
		});
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

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBjMWIwOWM3NzA1ZGE5ZWJlYzFjMyIsIndlYnBhY2s6Ly8vanMvc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vL2pzL3NyYy91dGlscy91dGlscy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBjMWIwOWM3NzA1ZGE5ZWJlYzFjMyIsImltcG9ydCB7IG1ha2VEcmFnZ2FibGUgfSBmcm9tICcuL3V0aWxzL3V0aWxzLmpzJztcclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgd2luZG93TG9hZGVkLCB0cnVlKTtcclxuXHJcbmZ1bmN0aW9uIHdpbmRvd0xvYWRlZCgpIHtcclxuXHRtYWtlRHJhZ2dhYmxlKHtcclxuXHRcdGVsZW1lbnQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaGF0LXdpbmRvdycpLFxyXG5cdFx0Y29udHJvbDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NoYXQtd2luZG93IC5kcmFnLWNvbnRyb2wnKVxyXG5cdH0pO1xyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGpzL3NyYy9tYWluLmpzIiwiXG4vLyBtYWtlIGFsbCBlbGVtZW50cyB3aXRoIGNsYXNzID0gJ2RyYWdnYWJsZScgYXZhaWxhYmxlIGZvciBkcmFnZ2luZ1xuLy8ge2NvbnRyb2w6ICdjb250cm9sRWxlbWVudCcsIGVsZW1lbnQ6ICdlbGVtZW50TmVkZFRvRHJhZyd9XG5leHBvcnQgZnVuY3Rpb24gbWFrZURyYWdnYWJsZShvcHRpb25zKSB7XG4gICAgdmFyIGNvb3Jkcywgc2hpZnRYLCBzaGlmdFksXG4gICAgICAgIGVsZW0gPSBvcHRpb25zLmVsZW1lbnQsXG4gICAgICAgIGNvbnRyb2wgPSBvcHRpb25zLmNvbnRyb2w7XG5cbiAgICAvLyBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICAvLyAgICAgaWYgKHR5cGVvZiBlbGVtID09PSAnc3RyaW5nJykge1xuICAgIC8vICAgICAgICAgZWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW0pO1xuICAgIC8vICAgICB9IFxuICAgICAgIFxuICAgICAgICBjb250cm9sLm9uZHJhZ3N0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH07XG5cbiAgICAgICAgY29udHJvbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBlbGVtTW91c2VEb3duLCBmYWxzZSk7XG5cbiAgICAgICAgZnVuY3Rpb24gZWxlbU1vdXNlRG93bihldnQpIHtcbiAgICAgICAgICAgIGNvb3JkcyA9IGdldENvb3JkcyhlbGVtKTtcbiAgICAgICAgICAgIHNoaWZ0WCA9IE1hdGguYWJzKGV2dC5wYWdlWCAtIGNvb3Jkcy5sZWZ0KTtcbiAgICAgICAgICAgIHNoaWZ0WSA9IE1hdGguYWJzKGV2dC5wYWdlWSAtIGNvb3Jkcy50b3ApO1xuXG4gICAgICAgICAgICBlbGVtLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgICAgIGVsZW0uc3R5bGUuekluZGV4ID0gJzEwMDAnO1xuICAgICAgICAgICAgZWxlbS5zdHlsZS5tYXJnaW4gPSAnMCc7XG5cbiAgICAgICAgICAgIG1vdmVBdChldnQpO1xuICAgICAgICAgICAgLy8g0L/QvtC80ZbRidCw0ZTQvNC+INC90LDRiCDQtdC70LXQvNC10L3RgiDQsiBib2R5INGJ0L7QsSDQstGW0L0g0L/QvtC30LjRhtGW0L7QvdGD0LLQsNCy0YHRjyDQstGW0LTQvdC+0YHQvdC+INCy0ZbQutC90LBcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWxlbSk7XG4gICAgICAgICAgICBcblxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZHJhZ0VsZW0sIGZhbHNlKTtcbiAgICAgICAgICAgIGNvbnRyb2wuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGVsZW1Nb3VzZVVwLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGZ1bmN0aW9uIG1vdmVBdChldnQpIHtcbiAgICAgICAgICAgIGVsZW0uc3R5bGUubGVmdCA9IGV2dC5wYWdlWCArIHNoaWZ0WCArICdweCc7XG4gICAgICAgICAgICBlbGVtLnN0eWxlLnRvcCA9IGV2dC5wYWdlWSAtIHNoaWZ0WSArICdweCc7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBkcmFnRWxlbShldnQpIHtcbiAgICAgICAgICAgIG1vdmVBdChldnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZWxlbU1vdXNlVXAoKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZHJhZ0VsZW0pO1xuICAgICAgICAgICAgICAgIGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGVsZW1Nb3VzZVVwKTtcbiAgICAgICAgfVxuXG4gICAgLy8gfSBlbHNlIHtcbiAgICAvLyAgICAgdGhyb3cgbmV3IEVycm9yKCdmdW5jdGlvbiBtdXN0IGhhdmUgYW4gYXJndW1lbnQnKTtcbiAgICAvLyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb29yZHMoZWxlbSkge1xuICB2YXIgYm94ID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICB2YXIgc2Nyb2xsVG9wID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xuICB2YXIgc2Nyb2xsTGVmdCA9IHdpbmRvdy5wYWdlWE9mZnNldDtcblxuICB2YXIgdG9wID0gYm94LnRvcCArIHNjcm9sbFRvcDtcbiAgdmFyIGxlZnQgPSBib3gubGVmdCArIHNjcm9sbExlZnQ7XG5cbiAgcmV0dXJuIHtcbiAgICB0b3A6IHRvcCxcbiAgICBsZWZ0OiBsZWZ0XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTY3JvbGxiYXJXaWR0aCgpIHtcbiAgICB2YXIgb3V0ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIG91dGVyLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgIG91dGVyLnN0eWxlLnRvcCA9IFwiLTEwMDBweFwiO1xuICAgIG91dGVyLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgIG91dGVyLnN0eWxlLndpZHRoID0gXCIxMDBweFwiO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQob3V0ZXIpO1xuICAgIFxuICAgIHZhciB3aWR0aE5vU2Nyb2xsID0gb3V0ZXIub2Zmc2V0V2lkdGg7XG4gICAgLy8gZm9yY2Ugc2Nyb2xsYmFyc1xuICAgIG91dGVyLnN0eWxlLm92ZXJmbG93ID0gXCJzY3JvbGxcIjtcbiAgICBcbiAgICAvLyBhZGQgaW5uZXJkaXZcbiAgICB2YXIgaW5uZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGlubmVyLnN0eWxlLndpZHRoID0gXCIxMDAlXCI7XG4gICAgb3V0ZXIuYXBwZW5kQ2hpbGQoaW5uZXIpOyAgICAgICAgXG4gICAgXG4gICAgdmFyIHdpZHRoV2l0aFNjcm9sbCA9IGlubmVyLm9mZnNldFdpZHRoO1xuICAgIFxuICAgIC8vIHJlbW92ZSBkaXZzXG4gICAgb3V0ZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChvdXRlcik7XG4gICAgXG4gICAgcmV0dXJuIHdpZHRoTm9TY3JvbGwgLSB3aWR0aFdpdGhTY3JvbGw7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGpzL3NyYy91dGlscy91dGlscy5qcyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBOzs7Ozs7Ozs7OztBQ05BO0FBcURBO0FBZUE7QUFDQTtBQXZFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OzsiLCJzb3VyY2VSb290IjoiIn0=