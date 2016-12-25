// The object opts should contain animation options:

//     delay
//     duration
//     function delta
//     function step

export function animate(opts) {

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


// timing functions
export function circ(progress) {
    return 1 - Math.sin(Math.acos(progress))
}