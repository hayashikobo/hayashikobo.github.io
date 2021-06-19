/*
	Read Only by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var $window = $(window),
		$body = $('body'),
		$header = $('#header'),
//		$titleBar = null,
//		$nav = $('#nav'),
		$wrapper = $('#wrapper');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '1025px',  '1280px' ],
			medium:   [ '737px',   '1024px' ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ],
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Tweaks/fixes.

		// Polyfill: Object fit.
			if (!browser.canUse('object-fit')) {

				$('.image[data-position]').each(function() {

					var $this = $(this),
						$img = $this.children('img');

					// Apply img as background.
						$this
							.css('background-image', 'url("' + $img.attr('src') + '")')
							.css('background-position', $this.data('position'))
							.css('background-size', 'cover')
							.css('background-repeat', 'no-repeat');

					// Hide img.
						$img
							.css('opacity', '0');

				});

			}

	
  /**
   * Easy selector helper function
   */
   const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }
	
  /**
   * Back to top button
   */
   let backtotop = select('.back-to-top')
   if (backtotop) {
	 const toggleBacktotop = () => {
	   if (window.scrollY > 100) {
		 backtotop.classList.add('active')
	   } else {
		 backtotop.classList.remove('active')
	   }
	 }
	 window.addEventListener('load', toggleBacktotop)
	 onscroll(document, toggleBacktotop)
   }
 
   /**
	* Mobile nav toggle
	*/
   on('click', '.mobile-nav-toggle', function(e) {
	 select('body').classList.toggle('mobile-nav-active')
	 this.classList.toggle('bx-menu')
	 this.classList.toggle('bx-arrow-back')
   })
	
/**
   * Scrool with ofset on links with a class name .scrollto
   */
 on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });


  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }
	
	
	// Header Panel.

	// 	// Title Bar.
	// 		$titleBar = $(
	// 			'<div id="titleBar">' +
	// 				'<a href="#header" class="toggle"></a>' +
	// 				'<span class="title">' + $('#logo').html() + '</span>' +
	// 			'</div>'
	// 		)
	// 			.appendTo($body);

	// 	// Panel.
	// 		$header
	// 			.panel({
	// 				delay: 500,
	// 				hideOnClick: true,
	// 				hideOnSwipe: true,
	// 				resetScroll: true,
	// 				resetForms: true,
	// 				side: 'right',
	// 				target: $body,
	// 				visibleClass: 'header-visible'
	// 			});

	// // Scrolly.
	// 	$('.scrolly').scrolly({
	// 		speed: 1000,
	// 		offset: function() {

	// 			if (breakpoints.active('<=medium'))
	// 				return $titleBar.height();

	// 			return 0;

	// 		}
	// 	});

})(jQuery);