$(document).ready(function() {
    //  -------------- Preloader  -------------- 
    $('body').jpreLoader({
        splashID: "#jSplash",
        showSplash: true,
        showPercentage: true,
        autoClose: true
    });
    if ($('.timeline-slider').length) {
        $('.timeline-slider').bxSlider({
            pagerCustom: '#bx-pager-2'
        });
    }
     $('#counter').countdown({
        timestamp: (new Date()).getTime() + 10 * 24 * 60 * 60 * 1000
    });
    /* ---------------------------------------------------------------------- */
    /*  FlexSlider
    /* ---------------------------------------------------------------------- */
    // if($('.flexslider').length){     
    // $('.flexslider').flexslider({
    // animation: "fade"
    // });
    // }    
    if ($('.slides').length) {
        $('.slides').bxSlider();
    }
    $('#jSplash').css("display", "block");
    //  -------------- Hover direction  --------------
    $(function() {
        $('.hoverdir-target').each(function() {
            $(this).hoverdir();
        });
    })
    //  -------------- WOW Js  --------------
    wow = new WOW({
        animateClass: 'animated',
        offset: 100,
        mobile: false
    });
    wow.init();

    //  -------------- Jquery tab  --------------
    var tabs = jQuery('ul.tabs-remix');
    tabs.each(function (i) {
        // get tabs
        var tab = jQuery(this).find('> li > a');
        tab.click(function (e) {
            // get tab's location
            var contentLocation = jQuery(this).attr('href');
            // Let go if not a hashed one
            if (contentLocation.charAt(0) === "#") {
                e.preventDefault();
                // add class active
                tab.removeClass('active');
                jQuery(this).addClass('active');
                // show tab content & add active class
                jQuery(contentLocation).fadeIn(500).addClass('active').siblings().hide().removeClass('active');
            }
        });
    });
    //  -------------- Fixed navbar on scroll  --------------
    $(window).on('scroll', function() {
        var wheight = $(window).height();
        if ($(window).scrollTop() > wheight) {
            $('.fixonscroll').addClass('navbar-fixed-top small-navbar');
            $('.fixonscroll').removeClass('solidnavbar');
        } else {
            $('.fixonscroll').removeClass('navbar-fixed-top small-navbar');
            $('.fixonscroll').addClass('solidnavbar');
        }
    });
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 800) {
            $('.fixonscroll').addClass('small-navbar');
        } else {
            $('.fixonscroll').removeClass('small-navbar');
        }
    });
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 175) {
            $('.navbar-page').addClass('small-navbar');
        } else {
            $('.navbar-page').removeClass('small-navbar');
        }
    });
    // -------------- Parallax -------------- 
    var windowSize = $(window).width();
    if (windowSize >= 767) {
        $('.banner-title').parallax("50%", 0.2);
    }
    // -------------- Scroll to content animation -------------- 
    $(".scroll-info a[href^='#']").on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $(this.hash).offset().top - 0
        }, 1000);
    });
    // -------------- Fancybox -------------- 
    $('.fancybox').fancybox({
        helpers: {
            overlay: {
                locked: false
            }
        }
    });
    // -------------- Diamond Grind Hover --------------
    $('.diamond-wrap .shape').hover(function() {
        $(this).find('.overlay').addClass("animated fadeInLeft");
    }, function() {
        $(this).find('.overlay').removeClass("animated fadeInLeft");
    });
    $('.personnel .shape').hover(function() {
        $(this).find('.overlay').addClass("animated fadeInLeft");
    }, function() {
        $(this).find('.overlay').removeClass("animated fadeInLeft");
    });
    // -------------- Owl Carousel -------------- 
    var owl = $(".personnel-list");
    owl.owlCarousel({
        items: 3, //10 items above 1000px browser width
        itemsDesktop: [1000, 3], //5 items between 1000px and 901px
        itemsDesktopSmall: [991, 2], // betweem 900px and 601px
        itemsTablet: [767, 2], //2 items between 600 and 0
        itemsMobile: [480, 1], // 1 items between 400 and 0
        pagination: true,
        autoPlay: false
    });
    var owl1 = $(".owl-carousel-team");
    owl1.owlCarousel({
        items: 3, //10 items above 1000px browser width
        itemsDesktop: [1000, 3], //5 items between 1000px and 901px
        itemsDesktopSmall: [991, 2], // betweem 900px and 601px
        itemsTablet: [767, 1], //2 items between 600 and 0
        itemsMobile: [480, 1], // 1 items between 400 and 0
        pagination: true,
        autoPlay: false
    });
    $.ajax({
        type: "POST",
        url: 'assets/data/countallspecimens.php',
        success: function(result) {
            var obj = $.parseJSON(result);
            $('.countallspecimens').html(obj[0].countspecall);
            $('.countorder').html(obj[0].countorder);
            $('.countfamily').html(obj[0].countfamily);
            $('.countgenus').html(obj[0].countgenus);
            $('.countspecies').html(obj[0].countspecies);
        }
    });
    $.ajax({
        type: "POST",
        url: 'assets/data/countcollection.php',
        success: function(result) {
            var obj = $.parseJSON(result);
            $('.countcollection').html(obj[0].countcollection);
        }
    });
    $.ajax({
        type: "POST",
        url: 'assets/data/countspecbutterfly.php',
        success: function(result) {
            var obj01 = $.parseJSON(result);
            $('.countbutterfamily').html(obj01[0].countfamily);
            $('.countbuttergenus').html(obj01[0].countgenus);
            $('.countbutterspecies').html(obj01[0].countspecies);
        }
    });
});
/* addition */
$(window).load(function() {
    //  -------------- Sly.js (Vertical scrolling news ticker)  --------------
    $(function() {
        var frame = $('#smart');
        var wrap = frame.parent();
        // Call Sly on frame
        frame.sly({
            itemNav: "basic",
            smart: 1,
            activateOn: "click",
            mouseDragging: 0,
            touchDragging: 0,
            releaseSwing: 1,
            startAt: 0,
            scrollBy: 0,
            activatePageOn: "click",
            speed: 300,
            elasticBounds: 1,
            easing: 'easeOutExpo',
            dragHandle: 1,
            dynamicHandle: 1,
            clickBar: 1,
            prev: wrap.find(".prev"),
            next: wrap.find(".next")
        });
    }());
    $(function() {
        var frame2 = $('#smart2');
        var wrap2 = frame2.parent();
        // Call Sly on frame
        frame2.sly({
            itemNav: "basic",
            smart: 1,
            activateOn: "click",
            mouseDragging: 0,
            touchDragging: 0,
            releaseSwing: 1,
            startAt: 0,
            scrollBy: 0,
            activatePageOn: "click",
            speed: 300,
            elasticBounds: 1,
            easing: 'easeOutExpo',
            dragHandle: 1,
            dynamicHandle: 1,
            clickBar: 1,
            prev: wrap2.find(".prev"),
            next: wrap2.find(".next")
        });
    }());
    $(function() {
        var frame3 = $('#smart3');
        var wrap3 = frame3.parent();
        // Call Sly on frame
        frame3.sly({
            itemNav: "basic",
            smart: 1,
            activateOn: "click",
            mouseDragging: 0,
            touchDragging: 0,
            releaseSwing: 1,
            startAt: 0,
            scrollBy: 0,
            activatePageOn: "click",
            speed: 300,
            elasticBounds: 1,
            easing: 'easeOutExpo',
            dragHandle: 1,
            dynamicHandle: 1,
            clickBar: 1,
            prev: wrap3.find(".prev"),
            next: wrap3.find(".next")
        });
    }());
    //  -------------- Jquery Isotope Filtering  --------------
    var $container = $('.album-filter-content, .gallery-filter-content');
    $container.isotope({
        filter: '*',
        animationOptions: {
            duration: 750,
            easing: 'linear',
            queue: false
        }
    });
    $('.filter a').click(function() {
        $('.filter .current').removeClass('current');
        $(this).addClass('current');
        var selector = $(this).attr('data-filter');
        $container.isotope({
            filter: selector,
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });
        return false;
    });
    //  -------------- Jquery Masonry  --------------
    var $container_masonry = $('#masonry-container');
    $container_masonry.masonry({
        columnWidth: '.masonry',
        itemSelector: '.masonry'
    });
});