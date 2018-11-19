// Execute after CSS is loaded
let nav_height = 0;
window.addEventListener('load', () => {
  nav_height = document.getElementById('nav').getBoundingClientRect().height;
});


// For all in-document links, scroll manually to avoid changing the page's URL
let links = document.getElementsByClassName('local-link');
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
let nav_links = document.querySelectorAll('nav > a');
function highlightNavLink(current_index) {
  for (link of nav_links) {
    link.classList.remove('nav-current');
  }
  nav_links[current_index].classList.add('nav-current');
}

// Colorpickers
window.addEventListener('load', () => {
  // Set values from CSS. Must wait until styleshees are loaded.
  let root_style = getComputedStyle(document.documentElement);

  let color = root_style.getPropertyValue('--primary-color');
  let picker = document.getElementById('color_primary');
  picker.value = color;

  color = root_style.getPropertyValue('--secondary-color');
  picker = document.getElementById('color_secondary');
  picker.value = color;

  color = root_style.getPropertyValue('--nav-color');
  picker = document.getElementById('color_nav');
  picker.value = color;

  color = root_style.getPropertyValue('--text-color');
  picker = document.getElementById('color_text');
  picker.value = color;

  color = root_style.getPropertyValue('--background-color');
  picker = document.getElementById('color_bg');
  picker.value = color;
});

let root = document.documentElement;
function change_primary_color(picker) {
  root.style.setProperty('--primary-color', '#' + picker.toString());
}
function change_secondary_color(picker) {
  root.style.setProperty('--secondary-color', '#' + picker.toString());
}
function change_text_color(picker) {
  root.style.setProperty('--text-color', '#' + picker.toString());
}
function change_nav_color(picker) {
  root.style.setProperty('--nav-color', '#' + picker.toString());
}
function change_background_color(picker) {
  root.style.setProperty('--background-color', '#' + picker.toString());
}

// Modal show/hide
let modal_show = document.getElementById('btn_show_color');
modal_show.addEventListener('click', (ev) => {
  modal.style.display = 'block';
  modal.style.backgroundColor = 'rgba(0, 0, 0, 0.25)';
});

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

window.addEventListener('mousedown', (ev) => {
  if (document.getElementsByClassName('jscolor-active').length > 0) {
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0)';
  }
  else {
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.25)';
  }
});
