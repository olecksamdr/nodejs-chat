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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__getCoords_js__ = __webpack_require__(6);
/* harmony export (immutable) */ __webpack_exports__["a"] = makeDraggable;


// make all elements with class = 'draggable' available for dragging
// {control: 'controlElement', element: 'elementNeddToDrag'}

function makeDraggable(options) {
    var coords, shiftX, shiftY,
        elem = options.element,
        control = options.control;

    // if (arguments.length > 0) {
    //     if (typeof elem === 'string') {
    //         elem = document.getElementById(elem);
    //     } 
       
        control.ondragstart = function() {
            return false;
        };

        control.addEventListener('mousedown', elemMouseDown, false);

        function elemMouseDown(evt) {

            // для того щоб не виділявся текст при перетягуванні елемента
            evt.preventDefault();

            coords = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__getCoords_js__["a" /* default */])(elem);
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



/***/ }),
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_makeDraggable_js__ = __webpack_require__(1);


window.addEventListener('load', windowLoaded, true);

function windowLoaded() {
	__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_makeDraggable_js__["a" /* default */])({
		element: document.getElementById('chat-window'),
		control: document.querySelector('#chat-window .drag-control')
	});
}

/***/ }),
/* 5 */,
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getCoords;
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

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBlMjFlZWRmNDIzNzc3OGE4Y2U4Nj9hZGZlIiwid2VicGFjazovLy8uL3V0aWxzL21ha2VEcmFnZ2FibGUuanMiLCJ3ZWJwYWNrOi8vLy4vbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi91dGlscy9nZXRDb29yZHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA0KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBlMjFlZWRmNDIzNzc3OGE4Y2U4NiIsImltcG9ydCBnZXRDb29yZHMgZnJvbSAnLi9nZXRDb29yZHMuanMnO1xuXG4vLyBtYWtlIGFsbCBlbGVtZW50cyB3aXRoIGNsYXNzID0gJ2RyYWdnYWJsZScgYXZhaWxhYmxlIGZvciBkcmFnZ2luZ1xuLy8ge2NvbnRyb2w6ICdjb250cm9sRWxlbWVudCcsIGVsZW1lbnQ6ICdlbGVtZW50TmVkZFRvRHJhZyd9XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1ha2VEcmFnZ2FibGUob3B0aW9ucykge1xuICAgIHZhciBjb29yZHMsIHNoaWZ0WCwgc2hpZnRZLFxuICAgICAgICBlbGVtID0gb3B0aW9ucy5lbGVtZW50LFxuICAgICAgICBjb250cm9sID0gb3B0aW9ucy5jb250cm9sO1xuXG4gICAgLy8gaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgLy8gICAgIGlmICh0eXBlb2YgZWxlbSA9PT0gJ3N0cmluZycpIHtcbiAgICAvLyAgICAgICAgIGVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtKTtcbiAgICAvLyAgICAgfSBcbiAgICAgICBcbiAgICAgICAgY29udHJvbC5vbmRyYWdzdGFydCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnRyb2wuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZWxlbU1vdXNlRG93biwgZmFsc2UpO1xuXG4gICAgICAgIGZ1bmN0aW9uIGVsZW1Nb3VzZURvd24oZXZ0KSB7XG5cbiAgICAgICAgICAgIC8vINC00LvRjyDRgtC+0LPQviDRidC+0LEg0L3QtSDQstC40LTRltC70Y/QstGB0Y8g0YLQtdC60YHRgiDQv9GA0Lgg0L/QtdGA0LXRgtGP0LPRg9Cy0LDQvdC90ZYg0LXQu9C10LzQtdC90YLQsFxuICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIGNvb3JkcyA9IGdldENvb3JkcyhlbGVtKTtcbiAgICAgICAgICAgIHNoaWZ0WCA9IE1hdGguYWJzKGV2dC5wYWdlWCAtIGNvb3Jkcy5sZWZ0KTtcbiAgICAgICAgICAgIHNoaWZ0WSA9IE1hdGguYWJzKGV2dC5wYWdlWSAtIGNvb3Jkcy50b3ApO1xuXG4gICAgICAgICAgICBlbGVtLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgICAgIGVsZW0uc3R5bGUuekluZGV4ID0gJzEwMDAnO1xuICAgICAgICAgICAgZWxlbS5zdHlsZS5tYXJnaW4gPSAnMCc7XG5cbiAgICAgICAgICAgIG1vdmVBdChldnQpO1xuICAgICAgICAgICAgLy8g0L/QvtC80ZbRidCw0ZTQvNC+INC90LDRiCDQtdC70LXQvNC10L3RgiDQsiBib2R5INGJ0L7QsSDQstGW0L0g0L/QvtC30LjRhtGW0L7QvdGD0LLQsNCy0YHRjyDQstGW0LTQvdC+0YHQvdC+INCy0ZbQutC90LBcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWxlbSk7XG4gICAgICAgICAgICBcblxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZHJhZ0VsZW0sIGZhbHNlKTtcbiAgICAgICAgICAgIGNvbnRyb2wuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGVsZW1Nb3VzZVVwLCBmYWxzZSk7XG5cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZnVuY3Rpb24gbW92ZUF0KGV2dCkge1xuICAgICAgICAgICAgZWxlbS5zdHlsZS5sZWZ0ID0gZXZ0LnBhZ2VYICsgc2hpZnRYICsgJ3B4JztcbiAgICAgICAgICAgIGVsZW0uc3R5bGUudG9wID0gZXZ0LnBhZ2VZIC0gc2hpZnRZICsgJ3B4JztcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGRyYWdFbGVtKGV2dCkge1xuICAgICAgICAgICAgbW92ZUF0KGV2dCk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBlbGVtTW91c2VVcCgpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBkcmFnRWxlbSk7XG4gICAgICAgICAgICAgICAgZWxlbS5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgZWxlbU1vdXNlVXApO1xuICAgICAgICB9XG5cbiAgICAvLyB9IGVsc2Uge1xuICAgIC8vICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Z1bmN0aW9uIG11c3QgaGF2ZSBhbiBhcmd1bWVudCcpO1xuICAgIC8vIH1cbn1cblxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi91dGlscy9tYWtlRHJhZ2dhYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImltcG9ydCBtYWtlRHJhZ2dhYmxlIGZyb20gJy4vdXRpbHMvbWFrZURyYWdnYWJsZS5qcyc7XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIHdpbmRvd0xvYWRlZCwgdHJ1ZSk7XHJcblxyXG5mdW5jdGlvbiB3aW5kb3dMb2FkZWQoKSB7XHJcblx0bWFrZURyYWdnYWJsZSh7XHJcblx0XHRlbGVtZW50OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2hhdC13aW5kb3cnKSxcclxuXHRcdGNvbnRyb2w6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjaGF0LXdpbmRvdyAuZHJhZy1jb250cm9sJylcclxuXHR9KTtcclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbWFpbi5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvLyBcbi8vINCf0L7QstC10YDRgtCw0ZQg0L7QsdGU0LrRgiB7dG9wLCBsZWZ0fVxuLy8g0L/QvtGH0LDRgtC+0Log0LTQvtC60YPQvNC10L3RgtCwIC0g0LLQtdGA0YXQvdGW0Lkg0LvRltCy0LjQuSDQutGD0YIg0YHRgtC+0YDRltC90LrQuFxuLy8gdG9wIC0geSDQutC+0L7RgNC00LjQvdCw0YLQsCDQtdC70LXQvNC10L3RgtCwICjQstGW0LTQvdC+0YHQvdC+INC/0L7Rh9Cw0YLQutGDINC00L7QutGD0LzQtdC90YLQsCDQtNC+INCy0LXRgNGF0L3RjNC+0LPQviDQu9GW0LLQvtCz0L4g0LrRg9GC0LAg0LXQu9C10LzQtdC90YLQsClcbi8vIGxlZnQgLSB4INC60L7QvtGA0LTQuNC90LDRgtCwINC10LvQtdC80LXQvdGC0LAg0LLRltC00L3QvtGB0L3QviDQv9C+0YfQsNGC0LrRgyDQtNC+0LrRg9C80LXQvdGC0LBcbi8vIFxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRDb29yZHMoZWxlbSkge1xuICB2YXIgYm94ID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICB2YXIgc2Nyb2xsVG9wID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xuICB2YXIgc2Nyb2xsTGVmdCA9IHdpbmRvdy5wYWdlWE9mZnNldDtcblxuICB2YXIgdG9wID0gYm94LnRvcCArIHNjcm9sbFRvcDtcbiAgdmFyIGxlZnQgPSBib3gubGVmdCArIHNjcm9sbExlZnQ7XG5cbiAgcmV0dXJuIHtcbiAgICB0b3A6IHRvcCxcbiAgICBsZWZ0OiBsZWZ0XG4gIH07XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi91dGlscy9nZXRDb29yZHMuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAxIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0E7Ozs7OztBQ2hFQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDOURBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNUQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0EiLCJzb3VyY2VSb290IjoiIn0=