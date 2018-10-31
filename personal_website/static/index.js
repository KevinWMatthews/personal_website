let navLinks = document.getElementsByClassName('nav-link');
for (link of navLinks) {
  link.addEventListener('click', function(ev) {
    // Scroll manually to avoid changing the page's URL
    ev.preventDefault();
    let hash = this.hash;
    let dest = hash.split('#')[1];
    document.getElementById(dest).scrollIntoView();

    // Set class for "active" link for css effect
    for (link of navLinks) {
      link.classList.remove('active');
    }
    this.classList.add('active');
  });
}
