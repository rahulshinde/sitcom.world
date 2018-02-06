Site = {}

$(document).ready( function(){
  setTimeout(function(){
    $('#cover').fadeToggle();
    $('#album_container').addClass('visible');
  }, 600)


  $("#banner").on('mouseenter', function(){
    $('#party_flyer').fadeIn();
  });

  $("#banner").on('mouseleave', function(){
    $('#party_flyer').fadeOut();
  });

  $(window).on('resize', function(){
    $('#party_flyer').css('display', 'none');
  });
})