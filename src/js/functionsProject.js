//Fechar nav ao clicar
$('.navbar-nav>li>a').on('click', function(){
    $('.navbar-collapse').collapse('hide');
});

//Scroll Page
$('a.scroll_section').on('click',function (e) {
    // e.preventDefault();
    var target = this.hash,
    $target = $(target);

   $('html, body').stop().animate({
     'scrollTop': $target.offset().top-50
    }, 2500, 'swing', function () {
     window.location.hash = target;
    });
});

//slick menu
$(window).on('scroll',function() {
  var scrolltop = $(this).scrollTop();

  if(scrolltop >= 40) {
    $('.navClient').addClass('fixClient');
  }

  else if(scrolltop <= 40) {
    $('.navClient').removeClass('fixClient');
  }

  if(scrolltop >= 1200) {
      $(".animated").addClass("fadeInUp");
  } 

});