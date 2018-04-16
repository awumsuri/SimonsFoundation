"use strict";

//C++ Binding
let MathCplusPlus = new Module.Math();

let mathbox = mathBox({

  plugins: ['core', 'controls', 'cursor', 'stats'],
  controls: {
    klass: THREE.OrbitControls
  },

});

let three = mathbox.three;

three.camera.position.set(-3.5, 2.2, -3.3);
three.renderer.setClearColor(new THREE.Color(0xFFFFFF), 1.0);

let view = mathbox.cartesian({
  range: [[-3, 3], [0, 1], [-3, 3]],
  scale: [2, 1, 2],
});

view.axis({
  axis: 1,
  width: 5
});

view.axis({
  axis: 2,
  width: 5
});

view.axis({
  axis: 3,
  width: 5
});

view.grid({

  width: 5,
  opacity: 0.5,
  axes: [1,3],

});

let sampler = view.area({

  id: 'sampler',
  width: 64,
  height: 64,
  axes: [1, 3],
  expr: function (emit, x, y, i, j, time) {

    //Using C++ Bindings
    emit(x, .35 + .25 * (MathCplusPlus.sin(x + 0) * MathCplusPlus.sin(y + 0)), y);

  },

  items: 1,
  channels: 3,

});

let color = view.matrix({

  expr: function (emit, i, j, time) {

    //Using C++ Bindings
    let r = .5 + MathCplusPlus.cos(time * .873) * j;
    let g = .5 + MathCplusPlus.sin(time) * i;
    let b = 1;
    let m = g * .75;
    let n = (r + g + b) / 3;

    r = Math.max(r, m, n*n);
    g = Math.max(g, m, n*n);
    b = Math.max(b, m, n*n);

    //Using C++ Bindings
    let rr = (r * r + r * MathCplusPlus.sin(time * .354)) / 2 * .9;
    let gg = b + (r + g) * .25 * MathCplusPlus.cos(time * .289)
    let bb = g + r * .5 + b * .5;

    rr = rr + (n - rr) * .75
    gg = gg + (n - gg) * .75
    bb = bb + (n - bb) * .75

    emit(.4, .7, 1, 1);
    emit(1, 1, 1, 1);
    emit(rr, gg, bb, 1);
  },
  width:  2,
  height: 2,
  items:  3,
  channels: 4,
})
.repeat({
  id: 'color',
});

view.surface({

  shaded: true,
  lineX: true,
  lineY: true,
  points: sampler,
  colors: color,
  color: 0xFFFFFF,
  width: 5,

});
