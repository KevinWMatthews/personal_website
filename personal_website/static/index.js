$(function() {
  let navStartPos = $('#nav').position().top;

  $(window).on('scroll', (ev) => {
    let scrollPos = $(window).scrollTop();
    if (scrollPos >= navStartPos) {
      $('#nav').addClass('fixed');
    }
    else {
      $('#nav').removeClass('fixed');
    }
  });

  $('.nav-link').on('click', (ev) => {
    $('#nav').addClass('fixed');
  });
});
