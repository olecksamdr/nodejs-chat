
// make all elements with class = 'draggable' available for dragging
// {control: 'controlElement', element: 'elementNeddToDrag'}
export function makeDraggable(options) {
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

export function getCoords(elem) {
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

export function getScrollbarWidth() {
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