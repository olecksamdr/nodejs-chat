// 
// Повертає обєкт {top, left}
// початок документа - верхній лівий кут сторінки
// top - y координата елемента (відносно початку документа до верхнього лівого кута елемента)
// left - x координата елемента відносно початку документа
// 

export default function getCoords(elem) {
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