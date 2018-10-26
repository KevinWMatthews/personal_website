$(function() {
  let navStartPos = $('#nav').position().top;

  $(window).on('scroll', () => {
    let scrollPos = $(window).scrollTop();
    if (scrollPos > navStartPos) {
      $('#nav').addClass('fixed');
    }
    else {
      $('#nav').removeClass('fixed');
    }
  });
});
