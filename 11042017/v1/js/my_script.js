function Screen() { return { width: $(window).width(), height: $(window).height() }; };
// Core Javascript Initialization
var App = function() {
    'use strict';

    // Handle Sidebar Menu
    var handleSidebarMenu = function() {

        $(document).ready(function($) {

            var $sidebar_trigger = $('.navbar-toggle'),
                $sidebar_icon = $('.toggle-icon'),
                $sidebar_content_overlay = $('.mask-content');

            $sidebar_trigger.on('click', function(event) {
                $sidebar_icon.toggleClass('is-clicked');
                $('.menu-box').toggleClass('is-open');
                $sidebar_content_overlay.toggleClass('mask-is-open').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
            });

            // close lateral menu clicking outside the menu itself
            $sidebar_content_overlay.on('click', function(event){
                if( !$(event.target).is('.navbar-toggle') ) {
                    $sidebar_icon.removeClass('is-clicked');
                    $sidebar_content_overlay.removeClass('mask-is-open');
                    $('.menu-box').removeClass('is-open');
                }
            });
        });
    }

    // Handle Comments Box
    var handleCommentsBox = function() {
        $(document).ready(function($) {

            var $sidebar_trigger = $('.button-comments'),
                $bottom_trigger = $('.button-comments-bottom'),
                $sidebar_content_overlay = $('.mask-content');

            $sidebar_trigger.on('click', function(event) {
                $sidebar_trigger.toggleClass('is-clicked');
                $('.comments-box').toggleClass('is-open');
                $sidebar_content_overlay.toggleClass('mask-is-open').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
            });

            $bottom_trigger.on('click', function(event) {
                $('.comments-box').toggleClass('is-open');
                $sidebar_content_overlay.toggleClass('mask-is-open').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
            });

            // close lateral menu clicking outside the menu itself
            $sidebar_content_overlay.on('click', function(event){
                if( !$(event.target).is('.button-comments') ) {
                    $sidebar_trigger.removeClass('is-clicked');
                    $sidebar_content_overlay.removeClass('mask-is-open');
                    $('.comments-box').removeClass('is-open');
                }
            });
        });
    }

    // Handle Box Sticky
    var handleBoxSticky = function() {
        // On loading, check to see if more than 46px`, then add the class
        if($('#topbar').length > 0){
            if ($('#topbar').offset().top > 46) {
                $('#comments-box').addClass('box-top');
                $('#menu-box').addClass('box-top');
            }
        }

        // On scrolling, check to see if more than 46px, then add the class
        $(window).on('scroll', function() {
            if ($('#topbar').length > 0 && $('#topbar').offset().top > 46 && $('#topbar').hasClass('nav-up') ) {
                $('#comments-box').addClass('box-top');
                $('#menu-box').addClass('box-top');
            } else {
                $('#comments-box').removeClass('box-top');
                $('#menu-box').removeClass('box-top');
            }
        });
    }

    return {
        init: function() {
            handleSidebarMenu(); // initial setup for sidebar menu
            handleCommentsBox(); // initial setup for comments box
            handleBoxSticky(); // initial setup for box fixed

        }
    }
}();
// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 10;
var navbarHeight = $('#topbar').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 0);

function hasScrolled() {
    var st = $(this).scrollTop();

    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;

    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('#topbar').removeClass('nav-down').addClass('nav-up');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('#topbar').removeClass('nav-up').addClass('nav-down');
        }
    }

    lastScrollTop = st;
}
// FullPage
var FullPage = function() {
    "use strict";

    // Handle FullPage
    var handleFullPage = function() {
        if($('#fullpage').length >= 1 && $('#fullpage').css('display') != 'none'){
            var count_image = $('#fullpage .section').length;
            var arrArchor = [],arrTooltips = [];
            for(var i = 1;i <= count_image;i++){
                if(i < count_image) arrArchor.push('page-'+i);
                else arrArchor.push('last-page');
            }
            $('#fullpage .section').each(function(k,v){
                var text_first = 'Trang nhất';
                if(typeof site_id != 'undefined' && site_id == 1003888) text_first = 'Page 1';
                if(k == 0) arrTooltips.push(text_first);
                else{
                    arrTooltips.push($(this).attr('data-credit'));
                }
            })
            $('.wrapper').css('margin','0');
            $('#topbar').addClass('topbar_transparent');
            $('#fullpage').fullpage({
                anchors : arrArchor,
                navigation: true,
                navigationPosition: 'right',
                navigationTooltips : arrTooltips,
                onLeave: function(index, nextIndex, direction){
                    if(nextIndex > 1)
                    {
                        $('#to_top').show();
                    }
                    else
                    {
                        $('#to_top').hide();
                    }
                }
            });
            $('#to_top').bind('click', function(){
                if(typeof $.fn.fullpage != 'undefined'){
                    return $.fn.fullpage.moveTo(1);
                }
            })
        }else{
            $('#fullpage').fullpage();
            $('.wrapper').css('height', Screen().height);
            $('#map-canvas').css('height', Screen().height);
        }
    }

    return {
        init: function() {
            handleFullPage(); // initial setup for fullPage
        }
    }
}();
// Handle Caption
var handleCaptionImage = function() {
    $(document).ready(function($) {
        var $toggle = $('.toggle-caption'),
            $caption = $('.caption'),
            $warp = $('.warp-text');
        $('.warp-text').on('hover', function(){
            $('.toggle-caption').parents('.fp-tableCell').find('.caption').toggleClass('is-show');
            $('.toggle-caption').parents('.fp-tableCell').find('.warp-text').toggleClass('is-warp');
            $('.toggle-caption').toggle();
        });
    });
}
// CurrentTimer
var days = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
function checkTime(i) {
    return (i < 10) ? "0" + i : i;
}
function startTime() {
    var today = new Date(),
        h = checkTime(today.getHours()),
        m = checkTime(today.getMinutes()),
        s = checkTime(today.getSeconds()),
        y = checkTime(today.getFullYear()),
        mm = checkTime(today.getMonth() + 1),
        d = checkTime(today.getDate());

    document.getElementById('timer').innerHTML = days[today.getDay()] + ', ngày ' + d + '/' + mm + '/' + y + ' ' + h + ":" + m;// + ":" + s;
    t = setTimeout(function () {
        startTime()
    }, 500);
}            

$(document).ready(function() {
    App.init();
    FullPage.init();
    handleCaptionImage();
    startTime();
});