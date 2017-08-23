$(window).on('resize', resizeTriangle);
$(document).ready(function() {
	var slider = $('ul.reviews').bxSlider({
		pager: false,
		nextText: '',
		prevText: '',
		onSliderLoad: function(currentIndex) {
			$('ul.logos > li').eq(currentIndex).addClass('active');
		},
		onSlideBefore: function($slideElement, oldIndex, newIndex) {
			$('ul.logos > li').removeClass('active').eq(newIndex).addClass('active');
		}
	});

	setTimeout(function() {
		resizeTriangle();
		slider.redrawSlider();
	}, 150);

	$('.menu-toggle').on('click', function() {
		$(this).parent().toggleClass('active').find('ul.menu').on('mouseleave', function() {
			$(this).off('mouseleave').parent().toggleClass('active');
		});
	});

	goSlide = function(n) {
		slider.goToSlide(--n);
	}
});

(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

window.twttr = (function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {};
  if (d.getElementById(id)) return t;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://platform.twitter.com/widgets.js";
  fjs.parentNode.insertBefore(js, fjs);

  t._e = [];
  t.ready = function(f) {
    t._e.push(f);
  };

  return t;
}(document, "script", "twitter-wjs"));

function resizeTriangle() {
  var width = $('.content > .last').innerWidth() / 2;
  
  $('<style>.last:before{\
    border-left-width: ' + width + 'px;\
    border-right-width: ' + width + 'px;\
  }</style>').appendTo('head');
}