"use strict";

let mathbox = mathBox({
  plugins: ['core', 'controls', 'cursor'],
  controls: {
    klass: THREE.OrbitControls
  },
});
let three = mathbox.three;

three.renderer.setClearColor(new THREE.Color(0xFFFFFF), 1.0);

let view = mathbox
.set({
  focus: 3
})
.camera({
  proxy: true,
  position: [0, 0, 3],
})
.polar({
  range: [[-2*π, 2*π], [-1, 1], [-1, 1]],
  scale: [12, 1, 1],
});

view.axis({
  axis: 2,
});

view
.interval({
  id: 'sampler',
  width: 256,
  expr: function (emit, x, i, t) {
    emit(x, 2 - Math.cos(6 * x)/12)
  },
  channels: 2,
})
.line({
  points: '#sampler',
  color: 0x3090FF,
  width: 5,
});

view
.area({
  width: 256,
  height: 2,
})
.surface({
  color: '#fff',
  opacity: .75,
  zBias: -10,
});

view.grid({
  divideX: 5,
  detailX: 256,
  width: 1,
  opacity: 0.5,
  unitX: π,
  baseX: 2,
  zBias: -5,
  zOrder: -2
});

