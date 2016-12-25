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
/***/ function(module, exports) {

	'use strict';

	(function (w, d) {
	  var raf = w.requestAnimationFrame || w.setImmediate || function (c) {
	    return setTimeout(c, 0);
	  };

	  function initEl(el) {
	    if (el.hasOwnProperty('data-simple-scrollbar')) return;
	    Object.defineProperty(el, 'data-simple-scrollbar', new SimpleScrollbar(el));
	  }

	  // Mouse drag handler
	  function dragDealer(el, context) {
	    var lastPageY;

	    el.addEventListener('mousedown', function (e) {
	      lastPageY = e.pageY;
	      el.classList.add('ss-grabbed');
	      d.body.classList.add('ss-grabbed');

	      d.addEventListener('mousemove', drag);
	      d.addEventListener('mouseup', stop);

	      return false;
	    });

	    function drag(e) {
	      var delta = e.pageY - lastPageY;
	      lastPageY = e.pageY;

	      raf(function () {
	        context.el.scrollTop += delta / context.scrollRatio;
	      });
	    }

	    function stop() {
	      el.classList.remove('ss-grabbed');
	      d.body.classList.remove('ss-grabbed');
	      d.removeEventListener('mousemove', drag);
	      d.removeEventListener('mouseup', stop);
	    }
	  }

	  // Constructor
	  function ss(el) {
	    this.target = el;

	    this.bar = '<div class="ss-scroll">';

	    // this.wrapepr = d.querySelector('.ss-wrapper');
	    this.wrapper = d.createElement('div');
	    this.wrapper.setAttribute('class', 'ss-wrapper');

	    // this.el = d.querySelector('.ss-content');
	    this.el = d.createElement('div');
	    this.el.setAttribute('class', 'ss-content');

	    this.wrapper.appendChild(this.el);

	    while (this.target.firstChild) {
	      this.el.appendChild(this.target.firstChild);
	    }
	    this.target.appendChild(this.wrapper);

	    this.target.insertAdjacentHTML('beforeend', this.bar);
	    this.bar = this.target.lastChild;

	    dragDealer(this.bar, this);
	    this.moveBar();

	    this.el.addEventListener('scroll', this.moveBar.bind(this));
	    this.el.addEventListener('mouseenter', this.moveBar.bind(this));

	    this.target.classList.add('ss-container');

	    var css = window.getComputedStyle(el);
	    if (css['height'] === '0px' && css['max-height'] !== '0px') {
	      el.style.height = css['max-height'];
	    }
	  }

	  ss.prototype = {
	    moveBar: function moveBar(e) {
	      var totalHeight = this.el.scrollHeight,
	          ownHeight = this.el.clientHeight,
	          _this = this;

	      this.scrollRatio = ownHeight / totalHeight;

	      raf(function () {
	        // Hide scrollbar if no scrolling is possible
	        if (_this.scrollRatio >= 1) {
	          _this.bar.classList.add('ss-hidden');
	        } else {
	          _this.bar.classList.remove('ss-hidden');
	          _this.bar.style.cssText = 'height:' + _this.scrollRatio * 100 + '%; top:' + _this.el.scrollTop / totalHeight * 100 + '%;left:-' + (_this.bar.clientWidth + 10) + 'px;';
	        }
	      });
	    }
	  };

	  function initAll() {
	    var nodes = d.querySelectorAll('*[data-simple-scrollbar]');

	    for (var i = 0; i < nodes.length; i++) {
	      initEl(nodes[i]);
	    }
	  }

	  // d.addEventListener('DOMContentLoaded', initAll);
	  ss.initEl = initEl;
	  ss.initAll = initAll;

	  w.SimpleScrollbar = ss;
	})(window, document);

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlU2Nyb2xsYmFyLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIDVmZmFiZjIyOTc0ZDZlYTg2ZmVhP2RiNjAqIiwid2VicGFjazovLy9zcmMvanMvdmVuZG9yL3NpbXBsZVNjcm9sbGJhci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA1ZmZhYmYyMjk3NGQ2ZWE4NmZlYSIsIihmdW5jdGlvbih3LCBkKSB7XG4gIHZhciByYWYgPSB3LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB3LnNldEltbWVkaWF0ZSB8fCBmdW5jdGlvbihjKSB7IHJldHVybiBzZXRUaW1lb3V0KGMsIDApOyB9O1xuXG4gIGZ1bmN0aW9uIGluaXRFbChlbCkge1xuICAgIGlmIChlbC5oYXNPd25Qcm9wZXJ0eSgnZGF0YS1zaW1wbGUtc2Nyb2xsYmFyJykpIHJldHVybjtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWwsICdkYXRhLXNpbXBsZS1zY3JvbGxiYXInLCBuZXcgU2ltcGxlU2Nyb2xsYmFyKGVsKSk7XG4gIH1cblxuICAvLyBNb3VzZSBkcmFnIGhhbmRsZXJcbiAgZnVuY3Rpb24gZHJhZ0RlYWxlcihlbCwgY29udGV4dCkge1xuICAgIHZhciBsYXN0UGFnZVk7XG5cbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBmdW5jdGlvbihlKSB7XG4gICAgICBsYXN0UGFnZVkgPSBlLnBhZ2VZO1xuICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnc3MtZ3JhYmJlZCcpO1xuICAgICAgZC5ib2R5LmNsYXNzTGlzdC5hZGQoJ3NzLWdyYWJiZWQnKTtcblxuICAgICAgZC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBkcmFnKTtcbiAgICAgIGQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHN0b3ApO1xuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBkcmFnKGUpIHtcbiAgICAgIHZhciBkZWx0YSA9IGUucGFnZVkgLSBsYXN0UGFnZVk7XG4gICAgICBsYXN0UGFnZVkgPSBlLnBhZ2VZO1xuXG4gICAgICByYWYoZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnRleHQuZWwuc2Nyb2xsVG9wICs9IGRlbHRhIC8gY29udGV4dC5zY3JvbGxSYXRpbztcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdzcy1ncmFiYmVkJyk7XG4gICAgICBkLmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnc3MtZ3JhYmJlZCcpO1xuICAgICAgZC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBkcmFnKTtcbiAgICAgIGQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHN0b3ApO1xuICAgIH1cbiAgfVxuXG4gIC8vIENvbnN0cnVjdG9yXG4gIGZ1bmN0aW9uIHNzKGVsKSB7XG4gICAgdGhpcy50YXJnZXQgPSBlbDtcbiAgICBcbiAgICB0aGlzLmJhciA9ICc8ZGl2IGNsYXNzPVwic3Mtc2Nyb2xsXCI+JztcblxuICAgIC8vIHRoaXMud3JhcGVwciA9IGQucXVlcnlTZWxlY3RvcignLnNzLXdyYXBwZXInKTtcbiAgICB0aGlzLndyYXBwZXIgPSBkLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMud3JhcHBlci5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3NzLXdyYXBwZXInKTtcblxuICAgIC8vIHRoaXMuZWwgPSBkLnF1ZXJ5U2VsZWN0b3IoJy5zcy1jb250ZW50Jyk7XG4gICAgdGhpcy5lbCA9IGQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5lbC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3NzLWNvbnRlbnQnKTtcblxuICAgIHRoaXMud3JhcHBlci5hcHBlbmRDaGlsZCh0aGlzLmVsKTtcblxuICAgIHdoaWxlICh0aGlzLnRhcmdldC5maXJzdENoaWxkKSB7XG4gICAgICB0aGlzLmVsLmFwcGVuZENoaWxkKHRoaXMudGFyZ2V0LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICB0aGlzLnRhcmdldC5hcHBlbmRDaGlsZCh0aGlzLndyYXBwZXIpO1xuXG4gICAgdGhpcy50YXJnZXQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCB0aGlzLmJhcik7XG4gICAgdGhpcy5iYXIgPSB0aGlzLnRhcmdldC5sYXN0Q2hpbGQ7XG5cbiAgICBkcmFnRGVhbGVyKHRoaXMuYmFyLCB0aGlzKTtcbiAgICB0aGlzLm1vdmVCYXIoKTtcblxuICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5tb3ZlQmFyLmJpbmQodGhpcykpO1xuICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIHRoaXMubW92ZUJhci5iaW5kKHRoaXMpKTtcblxuICAgIHRoaXMudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ3NzLWNvbnRhaW5lcicpOyBcbiAgICAgIFxuICAgIHZhciBjc3MgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbCk7XG4gIFx0aWYgKGNzc1snaGVpZ2h0J10gPT09ICcwcHgnICYmIGNzc1snbWF4LWhlaWdodCddICE9PSAnMHB4Jykge1xuICAgIFx0ZWwuc3R5bGUuaGVpZ2h0ID0gY3NzWydtYXgtaGVpZ2h0J107XG4gICAgfVxuICB9XG5cbiAgc3MucHJvdG90eXBlID0ge1xuICAgIG1vdmVCYXI6IGZ1bmN0aW9uKGUpIHtcbiAgICAgIHZhciB0b3RhbEhlaWdodCA9IHRoaXMuZWwuc2Nyb2xsSGVpZ2h0LFxuICAgICAgICAgIG93bkhlaWdodCA9IHRoaXMuZWwuY2xpZW50SGVpZ2h0LFxuICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgdGhpcy5zY3JvbGxSYXRpbyA9IG93bkhlaWdodCAvIHRvdGFsSGVpZ2h0O1xuXG4gICAgICByYWYoZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIEhpZGUgc2Nyb2xsYmFyIGlmIG5vIHNjcm9sbGluZyBpcyBwb3NzaWJsZVxuICAgICAgICBpZihfdGhpcy5zY3JvbGxSYXRpbyA+PSAxKSB7XG4gICAgICAgICAgX3RoaXMuYmFyLmNsYXNzTGlzdC5hZGQoJ3NzLWhpZGRlbicpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX3RoaXMuYmFyLmNsYXNzTGlzdC5yZW1vdmUoJ3NzLWhpZGRlbicpXG4gICAgICAgICAgX3RoaXMuYmFyLnN0eWxlLmNzc1RleHQgPSAnaGVpZ2h0OicgKyAoX3RoaXMuc2Nyb2xsUmF0aW8pICogMTAwICsgJyU7IHRvcDonICsgKF90aGlzLmVsLnNjcm9sbFRvcCAvIHRvdGFsSGVpZ2h0ICkgKiAxMDAgKyAnJTtsZWZ0Oi0nICsgKF90aGlzLmJhci5jbGllbnRXaWR0aCArIDEwKSArICdweDsnO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpbml0QWxsKCkge1xuICAgIHZhciBub2RlcyA9IGQucXVlcnlTZWxlY3RvckFsbCgnKltkYXRhLXNpbXBsZS1zY3JvbGxiYXJdJyk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpbml0RWwobm9kZXNbaV0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIGQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGluaXRBbGwpO1xuICBzcy5pbml0RWwgPSBpbml0RWw7XG4gIHNzLmluaXRBbGwgPSBpbml0QWxsO1xuXG4gIHcuU2ltcGxlU2Nyb2xsYmFyID0gc3M7XG59KSh3aW5kb3csIGRvY3VtZW50KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL3ZlbmRvci9zaW1wbGVTY3JvbGxiYXIuanMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ3RDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBakJBO0FBQ0E7QUFtQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Iiwic291cmNlUm9vdCI6IiJ9