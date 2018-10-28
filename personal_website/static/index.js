let navLinks = document.getElementsByClassName('nav-link');
for (link of navLinks) {
  link.addEventListener('click', function(ev) {
    ev.preventDefault();
    let hash = this.hash;
    let dest = hash.split('#')[1];
    document.getElementById(dest).scrollIntoView();
  });
}

let cards = document.getElementsByClassName('card');
for (card of cards) {
  card.addEventListener('mouseover', function(ev) {
    console.log('they see me hoverin');
    this.classList.add('fadeOut');
  });
  card.addEventListener('mouseleave', function(ev) {
    console.log('aint no moe');
    this.classList.remove('fadeOut');
  })
}
