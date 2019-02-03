// Execute after CSS is loaded
let nav_height = 0;
window.addEventListener('load', () => {
  nav_height = document.getElementById('nav_top').getBoundingClientRect().height;
});


// For all in-document links, scroll manually to avoid changing the page's URL
let links = document.getElementsByClassName('scrolling-link');
for (link of links) {
  link.addEventListener('click', function(ev) {
    ev.preventDefault();
    let hash = this.hash;
    let dest = hash.split('#')[1];
    document.getElementById(dest).scrollIntoView();
  });
}

// Scroll handler for visual effects
let is_requesting = false;
window.addEventListener('scroll', function(ev) {
  if (!is_requesting) {
    is_requesting = true;
    window.requestAnimationFrame(function() {
      updateNavLinks(window.scrollY);
      is_requesting = false;
    });
  }
});

// Update visual effects for current nav link, if needed
let current_link_index = 0;
function updateNavLinks(scroll_pos) {
  let new_index = getCurrentNavLinkIndex(scroll_pos);
  if (current_link_index != new_index) {
    current_link_index = new_index;
    highlightNavLink(current_link_index);
  }
}

// Determine which nav link should be highlighted based on scroll position
// Sections must be in the same order as their respective nav links!
let sections = document.getElementsByTagName('section');
function getCurrentNavLinkIndex(scroll_pos) {
  let index = -1;
  for (section of sections) {
    let position = section.offsetTop;
    if (scroll_pos >= position - nav_height) {
      index += 1;
    }
  }
  return index;
}

// Highlight current nav link
let nav_links = document.querySelectorAll('nav a');
function highlightNavLink(current_index) {
  for (link of nav_links) {
    link.classList.remove('nav-current');
  }
  nav_links[current_index].classList.add('nav-current');
}

// Colorpickers
window.addEventListener('load', () => {
  // Set values from CSS. Must wait until styleshees are loaded.
  initialize_colorpicker('color_primary', '--primary-color');
  initialize_colorpicker('color_secondary', '--secondary-color');
});

function initialize_colorpicker(picker_id, css_var) {
  let root_style = getComputedStyle(document.documentElement);
  let hex_color = root_style.getPropertyValue(css_var);
  let picker = document.getElementById(picker_id);
  picker.value = hex_color;

  let root = document.documentElement;
  picker.addEventListener('input', (ev) => {
    root.style.setProperty(css_var, ev.target.value);
  });

  // Safari doesn't support color pickers but it does fire the change event.
  picker.addEventListener('change', (ev) => {
    root.style.setProperty(css_var, ev.target.value);
  });

  let modal = document.getElementById('modal_colorpicker');
  picker.addEventListener('click', (ev) => {
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.0)';
  })
}

// Mobile nav bar show/hide
let mobile_menu = document.getElementById('mobile_menu');
let menu_toggle = document.querySelector('.nav_mobile .toggle');
mobile_menu.addEventListener('click', () => {
  menu_toggle.classList.toggle('hide');
});

window.addEventListener('click', (ev) => {
  if (ev.target != mobile_menu) {
    menu_toggle.classList.add('hide');
  }
});

// Modal show/hide
let modal_show_buttons = document.getElementsByClassName('btn_show_color');
for (modal_show of modal_show_buttons) {
  modal_show.addEventListener('click', (ev) => {
    modal.style.display = 'block';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.25)';
  });
}

let modal = document.getElementById('modal_colorpicker');
window.addEventListener('click', (ev) => {
  if (ev.target == modal) {
    modal.style.display = 'none';
  }
});
let modal_close = document.getElementById('btn_close_colorpicker');
modal_close.addEventListener('click', (ev) => {
  modal.style.display = 'none';
});
let modal_x = document.getElementById('span_close_colorpicker');
modal_x.addEventListener('click', (ev) => {
  modal.style.display = 'none';
});
