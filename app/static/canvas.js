const square_size = 5;
let squares = {};
let current_color;

let interval = {
  id: null,
  start: () => {
    self.id = setInterval(draw, 5);
  },
  stop: () => {
    clearInterval(self.id);
  },
};

// Must be added after the colorpickers are initialized... risky.
window.addEventListener('load', () => {
  resize_canvas();
  initialize_squares();
  connect_to_colorpicker();
  interval.start();
});

window.addEventListener('resize', () => {
  resize_canvas();
  window.requestAnimationFrame(render_all_squares);
})

function resize_canvas() {
  let canvas = document.getElementById('canvas');
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;
}

function initialize_squares() {
  let canvas = document.getElementById('canvas');

  squares.canvas_width = canvas.width;
  squares.canvas_height = canvas.height;
  squares.squares_in_row = canvas.width / square_size;
  squares.opacity = 1;
  squares.x = 0;
  squares.y = 0;
  squares.colored_squares = [];
  squares.nth_square_in_row = 0;
}

function connect_to_colorpicker() {
  let colorpicker = document.getElementById('color_secondary');
  current_color = colorpicker.value;

  colorpicker.addEventListener('input', function() {
    window.requestAnimationFrame(render_all_squares);
  });

  //TODO add change event for safari
}

function render_all_squares() {
  let colorpicker = document.getElementById('color_secondary');
  current_color = colorpicker.value;

  let ctx = document.getElementById('canvas').getContext('2d');
  let rgb = hex_to_rgb(colorpicker.value);
  for (square of squares.colored_squares) {
    ctx.clearRect(square.x, square.y, square_size, square_size);
    ctx.fillStyle = rgb_add_a(rgb, square.opacity);
    ctx.fillRect(square.x, square.y, square_size, square_size);
  }
}

function draw() {
  var ctx = document.getElementById('canvas').getContext('2d');

  ctx.fillStyle = hex_to_rgba(current_color, squares.opacity);

  new_square = {
    x: squares.x,
    y: squares.y,
    opacity: squares.opacity,
  };
  squares.colored_squares.push(new_square);
  // x, y, width, height
  ctx.fillRect(squares.x, squares.y, square_size, square_size);

  squares.opacity += 1;
  if (squares.opacity >= 10) {
    squares.opacity = 1;
  }

  squares.x = square_size * random_from_0_to_max(squares.squares_in_row);
  if (squares.nth_square_in_row >= 10) {
    squares.nth_square_in_row = 0;
    squares.y += square_size;
  }
  squares.nth_square_in_row += 1;
  if (squares.y >= squares.canvas_height) {
    interval.stop();
  }
}

// Get a random number from 0 to max, not including the max.
// (Range is open on the right)
function random_from_0_to_max(max) {
  let random = Math.random() * max;
  return Math.trunc(random);
}

function hex_to_rgba(hex, opacity) {
  let rgb = hex_to_rgb(hex);
  return rgb_add_a(rgb, opacity);
}

function hex_to_rgb(hex) {
  hex = hex[0] === '#' ? hex.substr(1) : hex;
  var decimal = parseInt(hex, 16);
  var r = (decimal >> 16) & 255;
  var g = (decimal >> 8) & 255;
  var b = decimal & 255;
  return {r: r, g: g, b: b};
}

function rgb_add_a(rgb, opacity) {
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity/10})`;
}
