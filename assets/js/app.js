function openNav(body, closeMobileNav) {
    body.addClass('open-nav');
    if (body.find('.nav-overlay').length <= 0) {
        body.append('<div class="overlay-mobile"></div>');
    }
    var backDrops = body.find('.overlay-mobile');
    backDrops.one('click', closeMobileNav);
}

$(document).ready(function() {
    var mobileOpenMenuButton = $('.btn-mobile-menu.cfb-open-menu'),
        mobileCloseMenuButton = $('.btn-mobile-menu.cfb-close-menu'),
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


    mobileOpenMenuButton.on('click', function(e) {
        e.preventDefault();
        openNav(body, closeMobileNav);
        mobileOpenMenuButton.hide();
        mobileCloseMenuButton.show();
    });

    mobileCloseMenuButton.on('click', function(e) {
        e.preventDefault();
        closeMobileNav(e);
        mobileCloseMenuButton.hide();
        mobileOpenMenuButton.show();
    });
});