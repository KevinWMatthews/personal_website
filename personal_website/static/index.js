$(function() {
  $('.nav-link').on('click', function(ev) {
    // Hash is the part of the URL after and including the '#'
    if (this.hash === "") {
      return;
    }

    ev.preventDefault();
    let dest = this.hash;
    console.log($(dest).offset());
    $('html, body').animate({
      // CSS properties that will gradually be implemented. Wild!
      scrollTop: $(dest).offset().top,
    }, 500);
  });
});
