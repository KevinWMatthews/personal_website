$(function() {
  let navStartPos = $('#nav').position().top;

  $(window).on('scroll', (ev) => {
    let scrollPos = $(window).scrollTop();
    if (scrollPos >= navStartPos) {
      $('#nav').addClass('fixed slideDown');
    }
    else {
      $('#nav').removeClass('fixed slideDown');
    }
  });

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
