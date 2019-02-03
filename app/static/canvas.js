document.body.onload = initialize;

function initialize() {
  create_canvas();
}

function create_canvas() {
  let canvas = document.createElement('canvas');
  canvas.id = 'canvas';
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;

  let div = document.getElementById('canvas_wrap');
  div.appendChild(canvas);
}
