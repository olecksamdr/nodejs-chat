// The object opts should contain animation options:

//     delay - через кожних delay мілісекунд буде запущений новий кадр анімаціі 
//     duration - тривалість анімації
//    
//     function delta - цій ф-ції передається progress число яке приймає значення з відрізка [0; 1]
//                      (на початку анімаці progress = 0, на кінці 1). Ф-ція delta робить певні перетворення
//                      і теж повертає число з фідрізка [0; 1]
//    
//     function step - приймає значення повернене ф-цією delta i на його основі 
//                     змінює влативість елемента який анімують

// ПРИКЛАД ВИКОРИСТАННЯ 

// function move(element, delta, duration) {
//   var to = 500

//   animate({
//     delay: 10,
//     duration: duration || 1000, // 1 sec by default
//     delta: delta,
//     step: function(delta) {
//       element.style.left = to*delta + "px"    
//     }
//   })
  
// }


export default function animate(opts) {

  var start = new Date;

  var id = setInterval(function() {
    var timePassed = new Date - start
    var progress = timePassed / opts.duration

    if (progress > 1) progress = 1
    
    var delta = opts.delta(progress)
    opts.step(delta)
    
    if (progress == 1) {
      clearInterval(id)
    }
  }, opts.delay || 10)
}