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

  pattern = new Pattern(canvas.width, canvas.height, square_size);
  opacity_counter = new OpacityCounter();
  iterthing = new IterThing(10, pattern)
}

function connect_to_colorpicker() {
  let colorpicker = document.getElementById('color_secondary');
  current_color = colorpicker.value;

  colorpicker.addEventListener('input', function() {
    window.requestAnimationFrame(render_all_squares);
  });

  // For Safari
  colorpicker.addEventListener('change', function() {
    window.requestAnimationFrame(render_all_squares);
  });
}

function render_all_squares() {
  let ctx = document.getElementById('canvas').getContext('2d');
  let colorpicker = document.getElementById('color_secondary');
  let hex_color = colorpicker.value;
  current_color = hex_color;

  for (square of squares.colored_squares) {
    ctx.clearRect(square.x, square.y, square_size, square_size);
    ctx.fillStyle = css_rgba(hex_color, square.opacity);
    ctx.fillRect(square.x, square.y, square_size, square_size);
  }
}

function get_next_opacity(opacity) {
  if (opacity >= 10) {
    return 1;
  }
  return opacity + 1;
}

function get_next_square_x(squares_in_row, size) {
  return random_from_0_to_max(squares_in_row) * square_size;
}

// Store all rows
let row = new Row();

let pattern;
let iterthing;
let opacity_counter;

let opacity = 0;
let x_pos = 0;
let y_pos = 0;
function draw() {
  var ctx = document.getElementById('canvas').getContext('2d');

  opacity = opacity_counter.next_opacity();
  x_pos = pattern.get_random_x();
  let opaque_square = new OpaqueSquare(x_pos, y_pos, square_size, opacity);
  row.push(opaque_square);


  if (iterthing.increment_maybe_wrap()) {
    y_pos += square_size;
  }
  if (iterthing.is_finished()) {
    interval.stop();
    return;
  }

  let fill_style = css_rgba(current_color, opaque_square.opacity);
  render_square(ctx, opaque_square, fill_style);
  return;

  ctx.fillStyle = css_rgba(current_color, squares.opacity);

  new_square = {
    x: squares.x,
    y: squares.y,
    opacity: squares.opacity,
  };
  squares.colored_squares.push(new_square);
  // x, y, width, height
  ctx.fillRect(squares.x, squares.y, square_size, square_size);

  squares.opacity = get_next_opacity(squares.opacity);
  squares.x = get_next_square_x(squares.squares_in_row, square_size);

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

function css_rgba(hex, opacity) {
  let rgba = hex_to_rgb(hex);
  rgba.a = opacity;
  return rgba_to_css_rgba(rgba);
}

function hex_to_rgb(hex) {
  hex = hex[0] === '#' ? hex.substr(1) : hex;
  var decimal = parseInt(hex, 16);
  var r = (decimal >> 16) & 255;
  var g = (decimal >> 8) & 255;
  var b = decimal & 255;
  return {r: r, g: g, b: b};
}

function rgba_to_css_rgba(rgba) {
  return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a/10})`;
}

function Pattern(width, height, square_size) {
  this.canvas_width = width;
  this.canvas_height = height;
  this.square_size = square_size;

  this.squares_in_row = this.canvas_width / this.square_size;
  this.rows = this.canvas_height / this.square_size;

  this.get_random_x = function() {
    let random = Math.random() * this.squares_in_row;
    return Math.trunc(random) * this.square_size;
  }
}

function IterThing(n_per_row, pattern) {
  // Opacity is not configurable
  this.max_n = n_per_row;

  this.n = 0;
  this.n_rows_shown = 0;

  // Returns true if all n in row are shown
  this.row_finished = function() {
    return this.n >= this.max_n;
  },

  // Returns true on wrap
  this.increment_maybe_wrap = function() {
    this.n += 1;
    if (!this.row_finished()) {
      return false;
    }
    this.n_rows_shown += 1;
    this.n = 0;
    return true;
  };
  // Returns true if all rows are shown
  this.is_finished = function() {
    return this.n_rows_shown > pattern.rows;
  };
}

function Row() {
  this.squares = new Array;
  this.push = function(square) {
    this.squares.push(square);
  }
}

function OpacityCounter() {
  this.min = 1;
  this.max = 10;
  this.current = 0;
  this.next_opacity = function() {
    this.current += 1;
    if (this.current > this.max) {
      this.current = this.min;
    }
    return this.current;
  }
}

function Square(x, y, size) {
  this.x = x;
  this.y = y;
  this.size = size;
}

// Inherit from square? Pass in a square that already exists?
function OpaqueSquare(x, y, size, opacity) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.opacity = opacity;
}

// Should this live on the square?
function render_square(context, square, style) {
  context.fillStyle = style;
  context.fillRect(square.x, square.y, square.size, square.size);
}
