/*
-------------------------------------------------------------------------
* Template Name    : Ctotek - Onepage Multi-Purpose HTML5 Template      *
* Author           : ParExcellence                                      *
* Version          : 1.0.0                                              *
* File Description : Main js file of the template                      *
*------------------------------------------------------------------------
*/

$(function () {
  "use strict";
  /*---- CURSOR -----*/
  var viewPortWidth = jQuery(window).width();
  if (viewPortWidth > 768) {
    var $circle = $(".circle"),
      $follow = $(".circle-follow");
    function moveCircle(e) {
      TweenLite.to($circle, 0.3, {
        x: e.clientX,
        y: e.clientY,
      });
      TweenLite.to($follow, 0.7, {
        x: e.clientX,
        y: e.clientY,
      });
    }
    function hoverFunction(e) {
      TweenLite.to($circle, 0.3, {
        opacity: 1,
        scale: 0,
      });
      TweenLite.to($follow, 0.3, {
        scale: 3,
      });
    }
    function unhoverFunction(e) {
      TweenLite.to($circle, 0.3, {
        opacity: 1,
        scale: 1,
      });
      TweenLite.to($follow, 0.3, {
        scale: 1,
      });
    }
    $(window).on("mousemove", moveCircle);
    $("a, button ,.menu-icon").hover(hoverFunction, unhoverFunction);
  }
  /*---- NAVBAR MENU -----*/
  $(".main-menu .link").on("click", function (o) {
    $(".menu-wrapper").removeClass("open");
    $(".top-navbar .menu-icon .text").removeClass("open");
    $(".menu-wrapper").css("left", "-100%");
    var t = $(this);
    $(".overflow-hidden").removeClass("active");
    $(t).parent().addClass("active");
    ($("html, body")
      .stop()
      .animate(
        {
          scrollTop: $(t.attr("href")).offset().top - 50,
        },
        1500,
      ),
      o.preventDefault());
  });
  var wind = $(window);
  //function noScroll() {
  //    window.scrollTo(0, 0);
  //}
  wind.on("scroll", function () {
    var bodyScroll = wind.scrollTop(),
      navbar = $(".top-navbar");
    if (bodyScroll > 50) {
      navbar.addClass("nav-scroll");
    } else {
      navbar.removeClass("nav-scroll");
    }
  });
  $(".top-navbar .menu-icon").on("click", function () {
    if ($(".menu-wrapper").hasClass("open")) {
      $(".menu-wrapper").delay(300).animate({ left: "-100%" });
      $(".top-navbar .menu-icon .text").removeClass("open");
      $(".menu-wrapper").removeClass("open");
    } else {
      $(".menu-wrapper").animate({ left: 0 });
      $(".top-navbar .menu-icon .text").addClass("open");
      $(".menu-wrapper").addClass("open");
    }
  });
  $(".menu-wrapper .menu-links .main-menu > li").on("mouseenter", function () {
    $(this).css("opacity", "1").siblings().css("opacity", ".5");
  });
  $(".menu-wrapper .menu-links .main-menu > li").on("mouseleave", function () {
    $(".menu-wrapper .menu-links .main-menu > li").css("opacity", "1");
  });

  /*---- SWIPER SLIDER -----*/

  var parallaxSlider;
  var parallaxSliderOptions = {
    speed: 1000,
    autoplay: true,
    parallax: true,
    loop: true,
    pagination: {
      el: ".slider .parallax-slider .swiper-pagination",
      clickable: true,
    },
    on: {
      init: function () {
        var swiper = this;
        for (var i = 0; i < swiper.slides.length; i++) {
          $(swiper.slides[i])
            .find(".bg-img")
            .attr({
              "data-swiper-parallax": 0.75 * swiper.width,
            });
        }
      },
      resize: function () {
        this.update();
      },
    },
    pagination: {
      el: ".slider .parallax-slider .swiper-pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: ".slider .parallax-slider .next-ctrl",
      prevEl: ".slider .parallax-slider .prev-ctrl",
    },
  };
  parallaxSlider = new Swiper(
    ".slider .parallax-slider",
    parallaxSliderOptions,
  );

  /*---- WORK SLIDER -----*/

  var swiperWorkMetro = new Swiper(".work-slider .swiper-container", {
    slidesPerView: 2,
    spaceBetween: 0,
    speed: 1000,
    autoplay: true,
    loop: true,
    centeredSlides: true,
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 0,
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 0,
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 0,
      },
      720: {
        slidesPerView: 6,
        spaceBetween: 0,
      },
      980: {
        slidesPerView: 7,
        spaceBetween: 0,
      },
      1020: {
        slidesPerView: 8,
        spaceBetween: 0,
      },
      1120: {
        slidesPerView: 10,
        spaceBetween: 0,
      },
    },
    pagination: {
      el: ".work-slider .swiper-pagination",
      type: "progressbar",
    },
    navigation: {
      nextEl: ".work-slider .next-ctrl",
      prevEl: ".work-slider .prev-ctrl",
    },
  });

  var swiper = new Swiper(".testimonials .swiper-container", {
    spaceBetween: 0,
    grabCursor: true,
    pagination: {
      el: ".testimonials .swiper-pagination",
      clickable: true,
    },
  });

  /*---- BACKGROUND IMAGE -----*/
  var pageSection = $(".bg-img, section");
  pageSection.each(function (indx) {
    if ($(this).attr("data-background")) {
      $(this).css(
        "background-image",
        "url(" + $(this).data("background") + ")",
      );
    }
  });

  /*----MAGNIFIC POPUP JS-----*/
  if (".work-slider".length > 0) {
    $(".work-slider").each(function () {
      $(this).magnificPopup({
        delegate: ".js-zoom-gallery",
        type: "image",
        gallery: {
          enabled: true,
        },
      });
    });
  }
});

$(window).on("load", function () {
  /*---- SPLITTING TEXT -----*/
  Splitting();

  /*---- SPLITTING -----*/
  var imageUp = document.getElementsByClassName("thumparallax");
  new simpleParallax(imageUp, {
    delay: 1,
  });
  var imageDown = document.getElementsByClassName("thumparallax-down");
  new simpleParallax(imageDown, {
    orientation: "down",
    delay: 1,
  });
});

/*---- HIDE / SHOW NAVBAR -----*/
var ScrollPosition;
var lastScrollPosition = 0;
var delta = 5;
var navbarHeight = $("#nav-bar").outerHeight();
$(window).on("scroll", function (event) {
  ScrollPosition = true;
});
setInterval(function () {
  if (ScrollPosition) {
    ScrollPosition = false;
  }
}, 250);

/*---- PRELOADER PAGE -----*/
paceOptions = {
  ajax: true,
  document: true,
  eventLag: false,
};
Pace.on("done", function () {
  $("#preloader").addClass("isdone");
  $(".loading-text").addClass("isdone");
});

/*---- WOW ANIMATION -----*/
wow = new WOW({
  animateClass: "animated",
  offset: 100,
});
wow.init();

$(document).ready(function () {
  "use strict";

  /*---- SCROLL BACK TO TOP -----*/
  var progressPath = document.querySelector(".progress-wrap path");
  var pathLength = progressPath.getTotalLength();
  progressPath.style.transition = progressPath.style.WebkitTransition = "none";
  progressPath.style.strokeDasharray = pathLength + " " + pathLength;
  progressPath.style.strokeDashoffset = pathLength;
  progressPath.getBoundingClientRect();
  progressPath.style.transition = progressPath.style.WebkitTransition =
    "stroke-dashoffset 10ms linear";
  var updateProgress = function () {
    var scroll = $(window).scrollTop();
    var height = $(document).height() - $(window).height();
    var progress = pathLength - (scroll * pathLength) / height;
    progressPath.style.strokeDashoffset = progress;
  };
  updateProgress();
  $(window).scroll(updateProgress);
  var offset = 150;
  var duration = 550;
  jQuery(window).on("scroll", function () {
    if (jQuery(this).scrollTop() > offset) {
      jQuery(".progress-wrap").addClass("active-progress");
    } else {
      jQuery(".progress-wrap").removeClass("active-progress");
    }
  });
  jQuery(".progress-wrap").on("click", function (event) {
    event.preventDefault();
    jQuery("html, body").animate({ scrollTop: 0 }, duration);
    return false;
  });
});
$(window).scroll(function () {
  /*---- FADE SLIDESHOW -----*/
  var scrolled = $(this).scrollTop();
  $(".slider .caption").css({
    transform: "translate3d(0, " + -(scrolled * 0.2) + "px, 0)",
    opacity: 1 - scrolled / 600,
  });
});
