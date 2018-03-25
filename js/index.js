mathbox = mathBox({
  plugins: ['core', 'controls', 'cursor', 'stats'],
  controls: {
    klass: THREE.OrbitControls
  },
});
three = mathbox.three;

three.camera.position.set(-3.5, 2.2, -3.3);
three.renderer.setClearColor(new THREE.Color(0xFFFFFF), 1.0);

view = mathbox.cartesian({
  range: [[-3, 3], [0, 1], [-3, 3]],
  scale: [2, 1, 2],
});

view.axis({
  axis: 1,
});
view.axis({
  axis: 3,
});

view.grid({
  width: 5,
  opacity: 0.5,
  axes: [1, 3],
});

var sampler = view.area({
  id: 'sampler',
  width: 64,
  height: 64,
  axes: [1, 3],
  expr: function (emit, x, y, i, j, time) {
    emit(x, .35 + .25 * (Math.sin(x + time) * Math.sin(y + time)), y);
    emit(x, .35 + .25 * (Math.sin(x * 1.31 + time * 1.13) * Math.sin(y * 1.46 - time * .94)) + .5, y);
    emit(x, .35 + .25 * (Math.sin(x * 1.25 + Math.sin(y + time) - time * 1.34) * Math.sin(y * 1.17 - time * .79)) + 1, y);
  },
  items: 3,
  channels: 3,
});

var color = view.matrix({
  expr: function (emit, i, j, time) {
    var r = .5 + Math.cos(time * .873) * j;
    var g = .5 + Math.sin(time) * i;
    var b = 1;
    var m = g * .75;
    var n = (r + g + b) / 3;

    r = Math.max(r, m, n*n);
    g = Math.max(g, m, n*n);
    b = Math.max(b, m, n*n);

    var rr = (r * r + r * Math.sin(time * .354)) / 2 * .9;
    var gg = b + (r + g) * .25 * Math.cos(time * .289)
    var bb = g + r * .5 + b * .5;

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
