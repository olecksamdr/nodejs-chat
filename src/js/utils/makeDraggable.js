import getCoords from './getCoords.js';

// make all elements with class = 'draggable' available for dragging
// {control: 'controlElement', element: 'elementNeddToDrag'}

export default function makeDraggable(options) {
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

