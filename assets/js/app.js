function openNav(body, closeMobileNav) {
    body.addClass('open-nav');
    if (body.find('.nav-overlay').length <= 0) {
        body.append('<div class="overlay-mobile"></div>');
    }
    var backDrops = body.find('.overlay-mobile');
    backDrops.one('click', closeMobileNav);
}

function openMainSearch(body, closeMobileNav) {
    body.addClass('open-mainsearch');
    if (body.find('.nav-overlay').length <= 0) {
        body.append('<div class="overlay-mobile"></div>');
    }
    var backDrops = body.find('.overlay-mobile');
    backDrops.one('click', closeMobileNav);
}

function offset(el) {
    var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

$(document).ready(function() {
    var mobileOpenMenuButton = $('.btn-mobile-menu.cfb-open-menu'),
        mobileCloseMenuButton = $('.btn-mobile-menu.cfb-close-menu'),
        mainSearchButton = $('.btn-open-main-search'),
        closeMainSearchButton = $('.cfb-close-search'),
        mainSearch = $("#main_search"),
        body = $('body');

    var closeMobileNav = function(e) {
        e.preventDefault();
        var backDrops = body.find('.overlay-mobile');
        body.removeClass('open-nav');
        backDrops.remove('.overlay-mobile');

        if(mobileCloseMenuButton.is(':visible')) {
            mobileCloseMenuButton.hide();
            mobileOpenMenuButton.show();
        }
    };

    var closeMainSearch = function(e) {
        e.preventDefault();
        var backDrops = body.find('.overlay-mobile');
        body.removeClass('open-mainsearch');
        backDrops.remove('.overlay-mobile');
    };


    mobileOpenMenuButton.on('click', function(e) {
        e.preventDefault();
        openNav(body, closeMobileNav);
        mobileOpenMenuButton.hide();
        mobileCloseMenuButton.show();
        return false;
    });

    mobileCloseMenuButton.on('click', function(e) {
        e.preventDefault();
        closeMobileNav(e);
        mobileCloseMenuButton.hide();
        mobileOpenMenuButton.show();
        return false;
    });

    mainSearchButton.on('click', function(e) {
        openMainSearch(body, mainSearch);
        return false;
    });

    closeMainSearchButton.on('click', function(e) {
        e.preventDefault();
        closeMainSearch(e);
        return false;
    });
});

var subSocial = $('#sub_socials');

$(window).scroll(function() {
    var backgroundHeight = $('#sliders').outerHeight();

    if (typeof backgroundHeight === 'undefined') {
        backgroundHeight = 200;
    }

    var contentHeight = offset.top;
    var scrollHeight = $(this).scrollTop();

    subSocial.css({
        top: (scrollHeight + 100)
    });

    if(scrollHeight >= backgroundHeight) {
        $('header.header').addClass('is-fixed');
    } else {
        $('header.header').removeClass('is-fixed');
    }
});

(function(){
    // Back to Top - by CodyHouse.co
	var backTop = document.getElementsByClassName('js-cd-top')[0],
		// browser window scroll (in pixels) after which the "back to top" link is shown
		offset = 300,
		//browser window scroll (in pixels) after which the "back to top" link opacity is reduced
		offsetOpacity = 1200,
		scrollDuration = 700
		scrolling = false;
	if( backTop ) {
		//update back to top visibility on scrolling
		window.addEventListener("scroll", function(event) {
			if( !scrolling ) {
				scrolling = true;
				(!window.requestAnimationFrame) ? setTimeout(checkBackToTop, 250) : window.requestAnimationFrame(checkBackToTop);
			}
		});
		//smooth scroll to top
		backTop.addEventListener('click', function(event) {
			event.preventDefault();
			(!window.requestAnimationFrame) ? window.scrollTo(0, 0) : scrollTop(scrollDuration);
		});
	}

	function checkBackToTop() {
		var windowTop = window.scrollY || document.documentElement.scrollTop;
		( windowTop > offset ) ? addClass(backTop, 'cd-top--show') : removeClass(backTop, 'cd-top--show', 'cd-top--fade-out');
		( windowTop > offsetOpacity ) && addClass(backTop, 'cd-top--fade-out');
		scrolling = false;
	}
	
	function scrollTop(duration) {
	    var start = window.scrollY || document.documentElement.scrollTop,
	        currentTime = null;
	        
	    var animateScroll = function(timestamp){
	    	if (!currentTime) currentTime = timestamp;        
	        var progress = timestamp - currentTime;
	        var val = Math.max(Math.easeInOutQuad(progress, start, -start, duration), 0);
	        window.scrollTo(0, val);
	        if(progress < duration) {
	            window.requestAnimationFrame(animateScroll);
	        }
	    };

	    window.requestAnimationFrame(animateScroll);
	}

	Math.easeInOutQuad = function (t, b, c, d) {
 		t /= d/2;
		if (t < 1) return c/2*t*t + b;
		t--;
		return -c/2 * (t*(t-2) - 1) + b;
	};

	//class manipulations - needed if classList is not supported
	function hasClass(el, className) {
	  	if (el.classList) return el.classList.contains(className);
	  	else return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
	}
	function addClass(el, className) {
		var classList = className.split(' ');
	 	if (el.classList) el.classList.add(classList[0]);
	 	else if (!hasClass(el, classList[0])) el.className += " " + classList[0];
	 	if (classList.length > 1) addClass(el, classList.slice(1).join(' '));
	}
	function removeClass(el, className) {
		var classList = className.split(' ');
	  	if (el.classList) el.classList.remove(classList[0]);	
	  	else if(hasClass(el, classList[0])) {
	  		var reg = new RegExp('(\\s|^)' + classList[0] + '(\\s|$)');
	  		el.className=el.className.replace(reg, ' ');
	  	}
	  	if (classList.length > 1) removeClass(el, classList.slice(1).join(' '));
	}
})();