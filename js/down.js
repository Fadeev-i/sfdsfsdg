(function ($) {
    "use strict";

    var $allVideos = jQuery(".post__media_wide .container iframe, .post__media iframe, .post__media object, .post__media embed");

    function publico_get_all_videos() {
        $allVideos.each(function () {
            jQuery(this).attr('data-aspectratio', this.height / this.width).removeAttr('height').removeAttr('width');
        });
    }

    function publico_resize_all_videos() {
        $allVideos.each(function () {
            var $el = jQuery(this);
            var newWidth = jQuery(this).parent().width();
            $el.width(newWidth).height((newWidth * $el.attr('data-aspectratio')).toFixed());
        });
    }

    jQuery(document).ready(function ($) {

        document.documentElement.className = 'js';

        // Fit video frames to document width
        publico_get_all_videos();
        publico_resize_all_videos();

        // PrettyPhoto
        $("a[data-gal^='prettyPhoto']").prettyPhoto({
            theme: 'dark_square',
            animation_speed:'normal',
            slideshow:3000,
            autoplay_slideshow: false,
            social_tools: false,
            hook: 'data-gal'
        });

        // Navigation in responsive layouts
        var $menu = $('.main-nav > ul'),
            optionsList = '<option value="" selected> = Main Navigation = </option>';

        if ($menu.length) {
            $menu.find('li').each(function () {
                var $this = $(this),
                    $anchor = $this.children('a'),
                    depth = $this.parents('ul').length - 1,
                    indent = '';

                if (depth) {
                    while (depth > 0) {
                        indent += ' ::: ';
                        depth--;
                    }
                }

                optionsList += '<option value="' + $anchor.attr('href') + '">' + indent + ' ' + $anchor.text() + '</option>';
            }).end().parent().parent().parent().parent().parent().find('.nav-button').append('<select class="mobile-menu">' + optionsList + '</select><div class="mobile-menu-title">MENU</div>');
        } else {
            $('.nav-button').append("Please create menu");
        }

        $('.mobile-menu').on('change', function () {
            window.location = $(this).val();
        });

        // Sticky Top Menu
        if ($().sticky) {
            $('.header-sticky').sticky({topSpacing: 0});
        }

        // Menu search
        $('.search-box .icon-search').click(function () {
            $(this).toggleClass('active');
            $('.search-box input[type="search"]').toggleClass('fadein');
            $('.search-box .search-background').toggleClass('fadein');
        });
        $('html').click(function () {
            $('.search-box .icon-search').removeClass('active');
            $('.search-box input[type="search"]').removeClass('fadein');
            $('.search-box .search-background').removeClass('fadein');
        });
        $('.search-box').click(function (evt) {
            evt.stopPropagation();
        });

        // Scroll totop button
        var toTop = $('#to-top');
        $(window).scroll(function () {
            if ($(this).scrollTop() > 1) {
                toTop.css({bottom: '11px'});
            } else {
                toTop.css({bottom: '-100px'});
            }
        });
        toTop.click(function () {
            $('html, body').animate({scrollTop: '0px'}, 800);
            return false;
        });

        $('.footer__widgets-row').isotope({
            itemSelector: '.widget-width__side',
            transitionDuration: 0,
            masonry: {}
        });

        // Bootstrap select
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
            $('.widget select').selectpicker('mobile');
        }
        else {
            $('.widget select').selectpicker({
                container: 'body',
                width: '100%',
                size: 8
            });
        }

        // Post format video thumbnail hide on click
        $('.post__thumbnail').on('click', function () {
            $(this).hide();

        });

        // Subscribe Popup
        subscribe_popup('');

        // Login Popup
        login_popup('');

    });

    //Set preloader script
    $(window).load(function() { // makes sure the whole site is loaded
        $('#loader').fadeOut(); // will first fade out the loading animation
        $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
        $('body').delay(350).css({
            'overflow': 'visible'
        });
    });

    jQuery(window).load(function () {

        // Sticky Sidebar
        var stickyParentRow = $(".post-container > .row > .col-sm-8"),
            stickySidebar = $(".sidebar-sticky");

        function detachSidebar() {
            if (992 > $(window).width()) {
                stickySidebar.trigger("sticky_kit:detach");
            }
        }

        if (stickyParentRow.length) {
            stickySidebar.stick_in_parent({
                offset_top: 0,
                parent: ".content-area",
                spacer: false
            }).on("sticky_kit:bottom", function () {
                $(this).parent().css("position", "static")
            }).on("sticky_kit:unbottom", function () {
                $(this).parent().css("position", "relative")
            });
            detachSidebar();
        }

        //Placeholder cleaning
        var $ph = $('input[type="search"], input[type="text"], input[type="url"], input[type="number"], input[type="email"], textarea');
        $ph.each(function () {
            var value = $(this).val();
            $(this).focus(function () {
                if ($(this).val() === value) {
                    $(this).val('');
                }
            });
            $(this).blur(function () {
                if ($(this).val() === '') {
                    $(this).val(value);
                }
            });
        });

        var rtl = false;

        if (jQuery('body').hasClass('rtl')) {
            rtl = true;
        }
    });

    ////////////////////////////////////////
    //init Twitter Bootstrap JS components//
    ////////////////////////////////////////
    //bootstrap carousel
    if (jQuery().carousel) {
        jQuery('.carousel').carousel();
    }
    //bootstrap tab - show first tab
    jQuery('.nav-tabs').each(function() {
        jQuery(this).find('a').first().tab('show');
    });
    jQuery('.tab-content').each(function() {
        jQuery(this).find('.tab-pane').first().addClass('fade in');
    });
    //bootstrap collapse - show first tab
    jQuery('.panel-group').each(function() {
        jQuery(this).find('a').first().filter('.collapsed').trigger('click');
    });
    //tooltip
    if (jQuery().tooltip) {
        jQuery('[data-toggle="tooltip"]').tooltip();
    }

    ////////////////
    //owl carousel//
    ////////////////
    if (jQuery().owlCarousel) {
        jQuery('.owl-carousel').each(function() {
            var $carousel = jQuery(this);
            var loop = $carousel.data('loop') ? $carousel.data('loop') : false;
            var margin = ($carousel.data('margin') || $carousel.data('margin') == 0) ? $carousel.data('margin') : 30;
            var nav = $carousel.data('nav') ? $carousel.data('nav') : false;
            var dots = $carousel.data('dots') ? $carousel.data('dots') : false;
            var themeClass = $carousel.data('themeclass') ? $carousel.data('themeclass') : 'owl-theme';
            var center = $carousel.data('center') ? $carousel.data('center') : false;
            var items = $carousel.data('items') ? $carousel.data('items') : 4;
            var autoplay = $carousel.data('autoplay') ? $carousel.data('autoplay') : false;
            var responsiveXs = $carousel.data('responsive-xs') ? $carousel.data('responsive-xs') : 1;
            var responsiveSm = $carousel.data('responsive-sm') ? $carousel.data('responsive-sm') : 2;
            var responsiveMd = $carousel.data('responsive-md') ? $carousel.data('responsive-md') : 3;
            var responsiveLg = $carousel.data('responsive-lg') ? $carousel.data('responsive-lg') : 4;
            var navContainer = $carousel.data('nav-container') ? $carousel.data('nav-container') : false;

            $carousel.owlCarousel({
                    loop: loop,
                    margin: margin,
                    nav: nav,
                    navText: [
                        "<i class='rt-icon icon-chevron-left3'></i>",
                        "<i class='rt-icon icon-chevron-right3'></i>"
                    ],
                    autoplay: autoplay,
                    dots: dots,
                    themeClass: themeClass,
                    center: center,
                    items: items,
                    navContainer: navContainer,
                    responsive: {
                        0:{
                            items: responsiveXs
                        },
                        767:{
                            items: responsiveSm
                        },
                        992:{
                            items: responsiveMd
                        },
                        1200:{
                            items: responsiveLg
                        }
                    },
                })
                .addClass(themeClass);
            if(center) {
                $carousel.addClass('owl-center');
            }
        });

    } //eof owl-carousel

    jQuery(window).resize(function () {

        // Fit video frames to document width
        publico_resize_all_videos();

    });
    $(window).on('load resize', function () {

        // Fit image size to container size.
        $('.image-fit').each(function () {
            var refH = $(this).height();
            var refW = $(this).width();
            var refRatio = refW / refH;

            var imgH = $(this).children("img").height();
            var imgW = $(this).children("img").width();

            if ((imgW / imgH) > refRatio) {
                $(this).addClass("portrait");
                $(this).removeClass("landscape");
            } else {
                $(this).addClass("landscape");
                $(this).removeClass("portrait");
            }
        });
    });

})(jQuery);

//video images preview
jQuery('.embed-placeholder').each(function(){
    jQuery(this).on('click', function(e) {
        e.preventDefault();
        var $thisLink = jQuery(this);
        if ($thisLink.attr('href') == '' || $thisLink.attr('href') == '#') {
            $thisLink.replaceWith($thisLink.data('iframe').replace(/&amp/g, '&').replace(/$lt;/g, '<').replace(/&gt;/g, '>').replace(/$quot;/g, '"')).trigger('click');
        } else {
            $thisLink.replaceWith('<iframe class="embed-responsive-item" src="'+ $thisLink.attr('href') + '?rel=0&autoplay=1'+ '"></iframe>');
        }
    });
});


function login_popup(unique_id) {
    // Login popup
    if (jQuery('.login-popup__toggle' + unique_id).length) {
        jQuery('.login-popup__toggle' + unique_id).on('click', function () {
            jQuery('.login-popup__popup' + unique_id).toggleClass('login-popup__popup--opened');
        });
        jQuery('.login-popup__popup #user_login').attr('placeholder', 'Username');
        jQuery('.login-popup__popup #user_pass').attr('placeholder', 'Password');
        jQuery('.login-popup__popup #rememberme').after('<span>').after('<span>');
    }
}

function subscribe_popup() {
    // Login popup
    if (jQuery('.subscribe-popup__toggle')) {
        jQuery('.subscribe-popup__toggle').on('click', function () {
            jQuery('.subscribe-popup__popup').toggleClass('subscribe-popup__popup--opened');
        });
    }
}