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