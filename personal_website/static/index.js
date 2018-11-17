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

// Update visual effects for active nav link, if needed
let active_link_index = 0;
function updateNavLinks(scroll_pos) {
  let current_link_index = getCurrentNavLinkIndex(scroll_pos);
  if (active_link_index != current_link_index) {
    active_link_index = current_link_index;
    highlightNavLink(active_link_index);
  }
}

// Determine which nav link is active based on scroll position
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

// Highlight active nav link
let nav_links = document.getElementsByClassName('nav-link');
function highlightNavLink(active_index) {
  for (link of nav_links) {
    link.classList.remove('active');
  }
  nav_links[active_index].classList.add('active');
}
