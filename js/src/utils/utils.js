
// make all elements with class = 'draggable' available for dragging
export function makeDraggable(elem) {
    var coords, shiftX, shiftY;

    if (arguments.length > 0) {
        if (typeof elem === 'string') {
            elem = document.getElementById(elem);
        } 
       
        elem.ondragstart = function() {
            return false;
        };

        elem.addEventListener('mousedown', elemMouseDown, false);

        function elemMouseDown(evt) {
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
        }
        
        function moveAt(evt) {
            elem.style.left = evt.pageX  - shiftX + 'px';
            elem.style.top = evt.pageY  - shiftY + 'px';
        }

        function dragElem(evt) {
            moveAt(evt);
        }

        function elemMouseUp() {
                document.removeEventListener('mousemove', dragElem);
                elem.removeEventListener('mouseup', elemMouseUp);
        }

    } else {
        throw new Error('function must have an argument');
    }
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