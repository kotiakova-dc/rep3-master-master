const swiperTimeline = document.querySelector(".swiper-container-timeline");
if (swiperTimeline || false) {
  var swiper = new Swiper(".swiper-container-timeline", {
    pagination: {
      el: ".swiper-pagination-top",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    autoplay: {
      delay: 1800,
      disableOnInteraction: false,
    },

    loop: true,
    watchSlidesProgress: true,
  });
}
// slider ( phone frame )
const swiperReviewsSlider = document.querySelector(
  ".swiper-container__reviews"
);
if (swiperReviewsSlider || false) {
  var swiperReviews = new Swiper(".swiper-container__reviews", {
    slidesPerView: 1,
    spaceBetween: 1,
    //loop:true,
    centeredSlides: true,
    //slideToClickedSlide:true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}

// search dropdown
const searchDropDown = document.querySelector(".search--dropdown");
const openSearchBtn = document.getElementById("open-search-window");
const searchDropDownBtn = document.getElementById("search--dropdown-btn");
const searchDropDownInput = document.getElementById("search--dropdown-input");
if (openSearchBtn || false) {
  openSearchBtn.addEventListener("click", function () {
    searchDropDown.classList.add("search--dropdown--active");
  });

  /// hide search box
  document.addEventListener("click", function (e) {
    if (
      e.target != openSearchBtn &&
      searchDropDown.classList.contains("search--dropdown--active") &&
      e.target != searchDropDownBtn &&
      e.target != searchDropDownInput &&
      e.target != searchDropDown
    ) {
      searchDropDown.classList.remove("search--dropdown--active");
    }
  });
}

function fontsStyle(params) {
  let file_content = fs.readFileSync(source_folder + "/scss/fonts.scss");
  if (file_content == "") {
    fs.writeFile(source_folder + "/scss/fonts.scss", "", cb);
    return fs.readdir(path.build.fonts, function (err, items) {
      if (items) {
        let c_fontname;
        for (var i = 0; i < items.length; i++) {
          let fontname = items[i].split(".");
          fontname = fontname[0];
          if (c_fontname != fontname) {
            fs.appendFile(
              source_folder + "/scss/fonts.scss",
              '@include font("' +
                fontname +
                '", "' +
                fontname +
                '", "400", "normal");\r\n',
              cb
            );
          }
          c_fontname = fontname;
        }
      }
    });
  }
}

function cb() {}

// mobile dropdown

$(function () {
  $(".header__burger--2").on("click", function () {
    $(this).toggleClass("active");
    $(".nav-mobile--2").slideToggle();
    $(".header__icons--2").toggleClass("icons-top--fixed");
    $(".sidebar").toggleClass("sidebar__invisible");
    //$(".tags").toggleClass("main__invisible");
    $(".content--two-cols").toggleClass("main__invisible");
    $(".content__full-width").toggleClass("main__invisible");
    $(".header--2").toggleClass("header--fixed");
  });

  $(window).on("load resize", function () {
    var w = $(window).width();

    var x = 1366;
    if (w >= x) {
      $(".nav-mobile--2").addClass("show");
    } else {
      $(".nav-mobile--2").removeClass("show");
    }
  });
});

// fix sidebar on scroll
var lastscroll = $(window).scrollTop();
$(window).scroll(function () {
  if (lastscroll > $(window).scrollTop()) {
    stickyleftcol("up", lastscroll - $(window).scrollTop());
  } else {
    stickyleftcol("down", $(window).scrollTop() - lastscroll);
  }
  lastscroll = $(window).scrollTop();
});
function stickyleftcol(napravlenie, sceollpx) {
  if ($("div").is(".sticky")) {
    var raznh = $(".sticky").outerHeight() - window.innerHeight;
    if (raznh < 0) {
      raznh = 0;
    }
    if (napravlenie == "down") {
      $(".sticky").css("top", function (index, value) {
        var newSize = Number(value.replace("px", "")) - sceollpx;
        if (newSize < -raznh) {
          newSize = -raznh;
        }
        return newSize;
      });
    } else if (napravlenie == "up") {
      $(".sticky").css("top", function (index, value) {
        var newSize = Number(value.replace("px", "")) + sceollpx;
        if (newSize > 0) {
          newSize = 0;
        }
        return newSize;
      });
    }
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////

$(function () {
  $(".header__burger--1").on("click", function () {
    $(this).toggleClass("active");
    $(".nav-mobile--1").slideToggle();
    $(".header__icons--1").toggleClass("icons-top--fixed");
    $(".sidebar").toggleClass("sidebar__invisible");
    $(".main").toggleClass("main__invisible");
    $(".content").toggleClass("content--mobile-fixed");
    $(".header__wrapper").toggleClass("header--mobile-fixed");
  });

  $(window).on("load resize", function () {
    var w = $(window).width();

    var x = 1024;
    if (w >= x) {
      $(".nav-mobile--1").addClass("show");
    } else {
      $(".nav-mobile--1").removeClass("show");
    }
  });
});

// SHOW HEADER ON SCROLL DOWN
$(window).scroll(function () {
  if ($(this).scrollTop() > 0) {
    $(".header--1").removeClass("header--basic");
  }
});
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};
var didScroll;
var lastScrollTop = 0;
var delta = 3;
var navbarHeight = $(".header--1").outerHeight();

$(window).scroll(function (event) {
  didScroll = true;
});

setInterval(function () {
  if (didScroll) {
    hasScrolled();
    didScroll = false;
  }
}, 250);

function hasScrolled() {
  var st = $(this).scrollTop();

  if (Math.abs(lastScrollTop - st) <= delta) return;

  if (st > lastScrollTop && st > navbarHeight) {
    // Scroll Down
    $(".header--1").removeClass("nav-down").addClass("nav-up");
  } else {
    // Scroll Up
    if (st + $(window).height() < $(document).height()) {
      $(".header--1").removeClass("nav-up").addClass("nav-down");
    }
  }

  lastScrollTop = st;
}
/// header 2 drop down on scroll

var didScroll2;
var lastScrollTop2 = 0;
var delta2 = 3;
var navbarHeight2 = $(".header--2").outerHeight();

$(window).scroll(function (event) {
  didScroll2 = true;
});

setInterval(function () {
  if (didScroll2) {
    hasScrolled2();
    didScroll2 = false;
  }
}, 250);

function hasScrolled2() {
  var st2 = $(this).scrollTop();

  if (Math.abs(lastScrollTop2 - st2) <= delta2) return;

  if (st2 > lastScrollTop2 && st2 > navbarHeight2) {
    // Scroll Down
    $(".header--2").removeClass("nav-down--2").addClass("nav-up--2");
  } else {
    // Scroll Up
    if (st2 + $(window).height() < $(document).height()) {
      $(".header--2").removeClass("nav-up--2").addClass("nav-down--2");
    }
  }

  lastScrollTop2 = st2;
}
const priceRange = document.querySelector(".price_range");
if (priceRange || false) {
  $(".price_range").ionRangeSlider({
    type: "double",
    min: 0,
    max: 154600,
    skin: "round",
    hide_from_to: true,
    hide_min_max: true,
    onChange: function (data) {
      $("#range_price_from").val(
        data.from.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1 ")
      );
      $("#range_price_to").val(
        data.to.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1 ")
      );
    },
  });
}
const areaRange = document.querySelector(".area_range");
if (areaRange || false) {
  $(".area_range").ionRangeSlider({
    type: "double",
    min: 0,
    max: 2000,
    skin: "round",
    hide_from_to: true,
    hide_min_max: true,
    onChange: function (data) {
      $("#range_area_from").val(
        data.from.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1 ")
      );
      $("#range_area_to").val(
        data.to.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1 ")
      );
    },
  });
}
const powerRange = document.querySelector(".power_range");
if (powerRange || false) {
  $(".power_range").ionRangeSlider({
    type: "double",
    min: 0,
    max: 2000,
    skin: "round",
    hide_from_to: true,
    hide_min_max: true,
    onChange: function (data) {
      $("#range_power_from").val(
        data.from.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1 ")
      );
      $("#range_power_to").val(
        data.to.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1 ")
      );
    },
  });
}
const noizeRange = document.querySelector(".noize_range");
if (noizeRange || false) {
  $(".noize_range").ionRangeSlider({
    type: "double",
    min: 0,
    max: 2000,
    skin: "round",
    hide_from_to: true,
    hide_min_max: true,
    onChange: function (data) {
      $("#range_noize_from").val(
        data.from.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1 ")
      );
      $("#range_noize_to").val(
        data.to.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1 ")
      );
    },
  });
}

/// accordion on mobile
///// OPEN FILTER
const btnFilterDesktop = document.getElementById("btn-filter-desktop");
const btnFilterMobile = document.getElementById("btn-filter-mob");
const filterSidebar = document.getElementById("filter-sidebar");
const btnDoFilter = document.getElementById("btn-do-filter");
const btnCloseFilter = document.getElementById("btn-close-filter");

function openFilterMob() {
  filterSidebar.classList.add("filter--open");
}
function closeFilter() {
  filterSidebar.classList.remove("filter--open");
}
if (btnFilterMobile || false) {
  btnFilterMobile.addEventListener("click", openFilterMob);
}
///
if (btnFilterDesktop || false) {
  btnFilterDesktop.addEventListener("click", openFilterMob);
}
///
if (btnCloseFilter || false) {
  btnCloseFilter.addEventListener("click", closeFilter);
}

///
if (btnDoFilter || false) {
  btnDoFilter.addEventListener("click", closeFilter);
}

////////////////////////// DETAILED PAGE
// main product gallery

$(function () {
  var $image = $(".product-image .image");
  var currImage;
  $image.css("background-image", "url(" + $("#first-img").attr("src") + ")");
  //$("#first-img").addClass("thumbnail--active");
  $(".product-thumbnails img").on("click", function () {
    $image.css("background-image", "url(" + $(this).attr("src") + ")");
    $(".product-thumbnails img").removeClass("thumbnail--active");
    $(this).addClass("thumbnail--active");
    currImage = "";
  });
  $(".product-thumbnails img").hover(
    function () {
      currImage = $image.css("background-image");
      $image.css("background-image", "url(" + $(this).attr("src") + ")");
    },
    function () {
      if (currImage !== "") {
        $image.css("background-image", currImage);
      }
    }
  );
});
////////////////// review

$("#btn--modal").click(function (e) {
  if (
    $("#phone").inputmask("isComplete") &&
    $("#name").val().length !== 0 &&
    $("#agreement-checkbox").is(":checked")
  ) {
    e.preventDefault();
    closeModal();
    openModalSuccess();
    //$("#modal--success").addClass("modal--success--visible");
    setTimeout(function () {
      closeModalSuccess();
      // $("#modal--success").removeClass("modal--success--visible");
    }, 2000);
  } else {
    return false;
  }
});

$("#btn-add-review").click(function (e) {
  if (
    $("#name-review").val().length !== 0 &&
    $("#review-text").val().length !== 0 &&
    $("input[name='rating']").is(":checked") &&
    $("#agreement-checkbox-2").is(":checked")
  ) {
    openModalSuccess();

    setTimeout(function () {
      closeModalSuccess();
    }, 2000);
    $("#name-review").val("");
    $("#review-text").val("");
    $("#agreement-checkbox-2").prop("checked", false);
    $("input[type=radio]").prop("checked", false);
    $(".rating > input:checked ~ label").css("color", "#ddd");
  } else {
    return false;
  }
});

// product card slider
const productCardSlider = document.querySelector(".product-cards-slider");
if (productCardSlider || false) {
  $(document).ready(function () {
    $(".product-cards-slider").slick({
      centerMode: false,
      slidesToShow: 2,
      prevArrow: $(".products-slider__prev"),
      nextArrow: $(".products-slider__next"),
    });
  });
}

const newsSliderContainer = document.querySelector(".news__swiper-container");
if (newsSliderContainer || false) {
  (function () {
    "use strict";
    const breakpoint = window.matchMedia("(min-width:640px)");
    let mySwiper;
    const breakpointChecker = function () {
      if (breakpoint.matches === true) {
        if (mySwiper !== undefined) mySwiper.destroy(true, true);

        return;
      } else if (breakpoint.matches === false) {
        return enableSwiper();
      }
    };
    const enableSwiper = function () {
      mySwiper = new Swiper(".news__swiper-container", {
        centeredSlides: true,
        loop: false,
        spaceBetween: 10,
        direction: "horizontal",
        effect: "coverflow",
        slidesPerView: "auto",
        centeredSlides: true,
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 0,
          modifier: 0,
          slideShadows: false,
        },
      });
    };

    breakpoint.addListener(breakpointChecker);
    breakpointChecker();
  })();
}
const infoblockSliderContainer = document.querySelector(".info-block--imgs");
if (infoblockSliderContainer || false) {
  (function () {
    "use strict";
    const breakpoint = window.matchMedia("(min-width:640px)");
    let mySwiper;
    const breakpointChecker = function () {
      if (breakpoint.matches === true) {
        if (mySwiper !== undefined) mySwiper.destroy(true, true);
        return;
      } else if (breakpoint.matches === false) {
        return enableSwiper();
      }
    };
    const enableSwiper = function () {
      mySwiper = new Swiper(".info-block--imgs", {
        slidesPerView: 1,
        disableOnInteraction: false,
        centeredSlides: false,
        loop: false,
        spaceBetween: 10,
        direction: "horizontal",
        pagination: {
          el: ".swiper-pagination--mobile",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        autoplay: {
          delay: 1800,
          disableOnInteraction: false,
        },

        loop: true,
        watchSlidesProgress: true,
        slidesPerView: "auto",
        centeredSlides: true,

        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 0,
          modifier: 0,
          slideShadows: false,
        },
      });
    };
    breakpoint.addListener(breakpointChecker);
    breakpointChecker();
  })();
}

// $(document).ready(function () {
//   $(".product-cards-slider").slick({
//     centerMode: false,

//     slidesToShow: 2,
//     prevArrow: $(".products-slider__prev"),
//     nextArrow: $(".products-slider__next"),
//   });
// });
///////
const articlesSliderContainer = document.querySelector(
  ".articles__swiper-container"
);
if (articlesSliderContainer || false) {
  (function () {
    "use strict";
    const breakpoint = window.matchMedia("(min-width:640px)");
    let mySwiper;
    const breakpointChecker = function () {
      if (breakpoint.matches === true) {
        if (mySwiper !== undefined) mySwiper.destroy(true, true);
        return;
      } else if (breakpoint.matches === false) {
        return enableSwiper();
      }
    };
    const enableSwiper = function () {
      mySwiper = new Swiper(".articles__swiper-container", {
        centeredSlides: true,
        loop: false,
        spaceBetween: 10,
        direction: "horizontal",
        effect: "coverflow",
        slidesPerView: "auto",
        centeredSlides: true,
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 0,
          modifier: 0,
          slideShadows: false,
        },
      });
    };
    breakpoint.addListener(breakpointChecker);
    breakpointChecker();
  })();
}

/////////
const ourWorksSlider = document.querySelector(".work__slider");
if (ourWorksSlider || false) {
  var swiper = new Swiper(".work__slider", {
    pagination: {
      el: ".swiper-pagination-top",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    autoplay: {
      delay: 1800,
      disableOnInteraction: false,
    },

    loop: true,
    watchSlidesProgress: true,
  });
}

//////////
const productDetailsNav = document.querySelector(".product-details__nav");
if (productDetailsNav || false) {
  $(document).ready(function () {
    $(window).bind("scroll", function () {
      var navHeight = $(".product-details__nav").offset().top;
      if ($(window).scrollTop() > navHeight) {
        $(".product-details__ul").addClass("sub-nav--fixed");
        $(".product-details__ul li").addClass("shrink-nav");
      } else {
        $(".product-details__ul").removeClass("sub-nav--fixed");
        $(".product-details__ul li").removeClass("shrink-nav");
      }
    });
  });
}

const sections = document.querySelectorAll("section");
const navLi = document.querySelectorAll(".product-details__ul li");
if (navLi || false) {
  window.onscroll = () => {
    var current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 60) {
        current = section.getAttribute("id");
      }
    });

    navLi.forEach((li) => {
      li.classList.remove("active");
      if (li.classList.contains(current)) {
        li.classList.add("active");
      }
    });
  };
}

// const sections = document.querySelectorAll("section");
// const navLi = document.querySelectorAll(".product-details__ul li");
// window.onscroll = () => {
//   var current = "";

//   sections.forEach((section) => {
//     const sectionTop = section.offsetTop;
//     if (pageYOffset >= sectionTop - 60) {
//       current = section.getAttribute("id"); }
//   });

//   navLi.forEach((li) => {
//     li.classList.remove("active");
//     if (li.classList.contains(current)) {
//       li.classList.add("active");
//     }
//   });
// };
///
const subcategoriesSlider = document.querySelector(
  ".product-subcategories__slider"
);
if (subcategoriesSlider || false) {
  $(document).ready(function () {
    $(".product-subcategories__slider").slick({
      centerMode: false,

      slidesToShow: 4,
      prevArrow: $(".product-subcategories__next"),
      nextArrow: $(".product-subcategories__prev"),
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 500,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 375,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    });
  });
}
///////////////
const readMoreBtn = document.getElementById("show-all");
const arrowDown = document.querySelector(".btn--show-all .btn-arr svg");
const btnTxt = document.querySelector(".btn--show-all .btn-txt");
const reviewsAll = document.querySelector(".reviews");
if (readMoreBtn || false) {
  readMoreBtn.addEventListener("click", () => {
    arrowDown.classList.toggle("rotate-btn");
    reviewsAll.classList.toggle("show-more");
    if (btnTxt.innerText === "Смотреть все") {
      btnTxt.innerText = "Свернуть";
    } else {
      btnTxt.innerText = "Смотреть все";
    }
  });
}
const detailsCard = document.getElementById("details-card");
///////////////
function resizeHeaderOnScroll() {
  const distanceY = window.pageYOffset,
    headerEl = document.getElementById("product-details"),
    productDetailsHide = document.querySelector(".product-details__col--2"),
    btnCompare = document.getElementById("btn-compare"),
    btnCompareText = document.querySelector(".product-details__compare span"),
    btnFav = document.getElementById("btn-fav"),
    btnFavText = document.querySelector(".product-details__fav span"),
    prodDetailsCols = document.querySelector(".product-details__cols"),
    prodGallery = document.querySelector(".product__gallery");
  //detailsCard = document.getElementById('details-card'),
  priceLabel = document.querySelector(".product-details__span");
  // hide big gallery img
  galleryImgMain = document.querySelector(".product-image");

  const detailsCard = document.getElementById("details-card");
  const shrinkOn = detailsCard.getBoundingClientRect().top;

  if (shrinkOn < 0 && window.matchMedia("(min-width: 1024px)").matches) {
    headerEl.classList.add("shrink");
    detailsCard.classList.add("shrink-height");
    prodDetailsCols.classList.add("shrink-mrg");
    /// what we hide
    productDetailsHide.classList.add("details-hidden");
    priceLabel.classList.add("details-hidden");
    //galleryImgMain.classList.add('details-hidden');
    btnCompare.classList.add("btn-round");
    btnCompareText.innerText = "";
    btnFav.classList.add("btn-round");
    btnFavText.innerText = "";

    ///
  } else {
    headerEl.classList.remove("shrink");
    productDetailsHide.classList.remove("details-hidden");
    btnCompare.classList.remove("btn-round");
    btnCompareText.innerText = "Сравнить";
    btnFav.classList.remove("btn-round");
    btnFavText.innerText = "В избранное";
    detailsCard.classList.remove("shrink-height");
    prodDetailsCols.classList.remove("shrink-mrg");
  }
}
if (detailsCard || false) {
  window.addEventListener("scroll", resizeHeaderOnScroll);
}

//// counter
// ==================================
const btnPlus = document.getElementById("plus");
const btnMinus = document.getElementById("minus");
//counterInput =

function increaseCount(e, el) {
  var input = document.getElementById("prod-count");
  var value = parseInt(input.value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  input.value = value;
}
function decreaseCount(e, el) {
  var input = document.getElementById("prod-count");
  var value = parseInt(input.value, 10);
  if (value > 1) {
    value = isNaN(value) ? 0 : value;
    value--;
    input.value = value;
  }
}
if ((btnPlus || false) && (btnMinus || false)) {
  btnPlus.addEventListener("click", increaseCount);
  btnMinus.addEventListener("click", decreaseCount);
}

var swiperConditionerInstallation = new Swiper(
  ".conditioner-installation__slider",
  {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    autoplay: {
      delay: 1800,
      disableOnInteraction: false,
    },

    loop: true,
    watchSlidesProgress: true,
  }
);
/// all serv
var swiperAllServices = new Swiper(".all-services", {
  slidesPerView: 1,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  spaceBetween: 20,
  loop: true,
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
  },
});
//////
const popularItemsSlider = document.querySelector(".popular-items__slider");
if (popularItemsSlider || false) {
  (function () {
    "use strict";
    const breakpoint = window.matchMedia("(min-width:640px)");
    let mySwiper;
    const breakpointChecker = function () {
      if (breakpoint.matches === true) {
        if (mySwiper !== undefined) mySwiper.destroy(true, true);

        return;
      } else if (breakpoint.matches === false) {
        return enableSwiper();
      }
    };
    const enableSwiper = function () {
      mySwiper = new Swiper(".popular-items__slider", {
        centeredSlides: true,
        loop: true,
        spaceBetween: 40,
        direction: "horizontal",
        effect: "coverflow",

        slidesPerView: "auto",
        centeredSlides: true,

        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 0,
          modifier: 0,
          slideShadows: false,
        },
      });
    };

    breakpoint.addListener(breakpointChecker);

    breakpointChecker();
  })();
}

/// MODAL WINDOWS ///
const openModalBtn = document.getElementById("contact-me-btn");
const modalContainer = document.getElementById("call-me-modal");
const modalSuccess = document.getElementById("modal-success");
const overlayModal = document.querySelector(".overlay");
const overlayOne = document.getElementById("overlay-1");
const overlayTwo = document.getElementById("overlay-2");
const overlayThree = document.getElementById("overlay-3");
const overlayFour = document.getElementById("overlay-4");
const overlayFive = document.getElementById("overlay-5");
const overlaySix = document.getElementById("overlay-6");
const overlaySeven = document.getElementById("overlay-7");

//open/ close modals
const showCallMeModal = () => {
  openModalBtn.addEventListener("click", () => {
    modalContainer.classList.add("show-modal");
    overlayOne.classList.add("overlay--visible");
  });
};
if (overlayOne || false) {
  overlayOne.addEventListener("click", closeModal);
}
if (overlayTwo || false) {
  overlayTwo.addEventListener("click", closeModal);
}
if (overlayThree || false) {
  overlayThree.addEventListener("click", closeModal);
}
if (overlayFour || false) {
  overlayFour.addEventListener("click", closeModal);
}
if (overlayFive || false) {
  overlayFive.addEventListener("click", closeModal);
}
if (overlaySix || false) {
  overlaySix.addEventListener("click", closeModal);
}

if (overlaySeven || false) {
  overlaySeven.addEventListener("click", closeModal);
}

/// password validation script
function checkPassword(password) {
  var lowerCaseLetters = /[a-z]/g;
  var upperCaseLetters = /[A-Z]/g;
  var numbers = /[0-9]/g;
  if (
    password.match(lowerCaseLetters)
    // &&
    //password.length >= 8 &&
    //  password.match(upperCaseLetters) &&
    // password.match(numbers)
  ) {
    return true;
  } else {
    return false;
  }
}
// email validation script
function validateEmail(emailAdress) {
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailAdress.match(regexEmail)) {
    return true;
  } else {
    return false;
  }
}

showCallMeModal();
// close modals
const closeBtn = document.querySelectorAll(".close-modal");
const modalWindows = document.querySelectorAll(".modal");

///close modals
function closeModal() {
  const modalContainer = document.querySelectorAll(".modal");
  modalContainer.forEach((c) => {
    c.classList.remove("show-modal");
  });
}

// show modal success
function openModalSuccess() {
  modalSuccess.classList.add("modal--success--visible");
}
function closeModalSuccess() {
  modalSuccess.classList.remove("modal--success--visible");
}

const btnModalSubmit = document.querySelector(".btn--modal");

closeBtn.forEach((btn) => {
  btn.addEventListener("click", closeModal);
});

/// show and validate sign in modal form
const openModalSignIn = document.getElementById("open-sign-in");
const signInBtn = document.getElementById("btn--sign-in");
const modalContainerSignIn = document.getElementById("sign-in-modal");
const showModalSignIn = () => {
  openModalSignIn.addEventListener("click", () => {
    modalContainerSignIn.classList.add("show-modal");
    overlayTwo.classList.add("overlay--visible");
  });
};
showModalSignIn();
$("#btn-sign-in").click(function (e) {
  let userPassword = $("#user-password").val();
  let validPassword = checkPassword(userPassword);
  let userEmail = $("#user-email").val();
  let validEmail = validateEmail(userEmail);
  if (
    validEmail &&
    validPassword &&
    $("#agreement-checkbox-sign-in").is(":checked")
  ) {
    e.preventDefault();
    closeModal();
    openModalSuccess();
    setTimeout(function () {
      closeModalSuccess();
    }, 2000);
    $("#user-password").val("");
    $("#user-email").val("");
  } else {
    return false;
  }
});

/// registration form
const openRegistrationModalLink = document.getElementById("option-register");
const modalRegistraion = document.getElementById("registration-modal");
const openRegistrationModal = () => {
  modalRegistraion.classList.add("show-modal");
  overlayThree.classList.add("overlay--visible");
};
if (openRegistrationModalLink || false) {
  openRegistrationModalLink.addEventListener("click", () => {
    closeModal();

    openRegistrationModal();
  });
}

// change user data
const openUserDataModalBtn = document.getElementById("change-user-data");
const userDataModal = document.getElementById("change-user-data-modal");
const openUserDataModal = () => {
  userDataModal.classList.add("show-modal");
  overlayFour.classList.add("overlay--visible");
};
if (openUserDataModalBtn || false) {
  openUserDataModalBtn.addEventListener("click", openUserDataModal);
}
// change password
const openChangePasswordModalBtn = document.getElementById(
  "change-user-password"
);
const changePasswordModal = document.getElementById("change-password-modal");
const openChangePasswordModal = () => {
  changePasswordModal.classList.add("show-modal");
  overlayFive.classList.add("overlay--visible");
};
if (openChangePasswordModalBtn || false) {
  openChangePasswordModalBtn.addEventListener("click", openChangePasswordModal);
}

//phone mask
var phoneMask = new Inputmask("+7(999) 999-99-99");
const phoneCallMe = document.getElementById("phone-call-me");
const phoneRegister = document.getElementById("phone-register");
const phoneNew = document.getElementById("phone-change-user-data");
const phoneMakeOrder = document.getElementById("phone-make-order");
const phoneLeaveRequest = document.getElementById("phone-leave-request");
if (phoneCallMe || false) {
  phoneMask.mask(phoneCallMe);
}
if (phoneRegister || false) {
  phoneMask.mask(phoneRegister);
}
if (phoneNew || false) {
  phoneMask.mask(phoneNew);
}
if (phoneMakeOrder || false) {
  phoneMask.mask(phoneMakeOrder);
}
if (phoneLeaveRequest || false) {
  phoneMask.mask(phoneLeaveRequest);
}
// registraton validation
$("#btn-register").click(function (e) {
  let userPassword = $("#password-new").val();
  let validPassword = checkPassword(userPassword);
  let userEmail = $("#email-registration").val();
  let validEmail = validateEmail(userEmail);
  if (
    $("#phone-registration").inputmask("isComplete") &&
    $("#name-registration").val().length !== 0 &&
    $("#surname-registration").val().length !== 0 &&
    $("#agreement-checkbox-registration").is(":checked") &&
    $("#email-registration").val().length !== 0 &&
    validEmail &&
    validPassword
  ) {
    e.preventDefault();

    closeModal();
    openModalSuccess();

    setTimeout(function () {
      closeModalSuccess();
    }, 2000);
  } else {
    return false;
  }
});

// change password
$("#btn-save-password").click(function (e) {
  let userPassword = $("#password-new").val();
  let validPassword = checkPassword(userPassword);

  if (
    validPassword &&
    $("#password-new").val() === $("#password-new-repeat").val()
  ) {
    e.preventDefault();

    closeModal();
    openModalSuccess();

    setTimeout(function () {
      closeModalSuccess();
    }, 2000);
  } else {
    return false;
  }
});
/// forgot password
const forgotPassword = document.getElementById("option-forgot-pass");
const forgotPasswordModal = document.getElementById("forgot-password-modal");
const sendMePassword = document.getElementById("btn-send-password");
const btnBackToSignIn = document.getElementById("back-to-sign-in");
const btnBackToSignIn2 = document.getElementById("back-to-sign-in2");
const optionForgotPassword = document.getElementById("option-forgot-pass2");
const forgotPasswordModalOpen = () => {
  closeModal();
  forgotPasswordModal.classList.add("show-modal");
  overlaySix.classList.add("overlay--visible");
};
if (forgotPassword || false) {
  forgotPassword.addEventListener("click", forgotPasswordModalOpen);
}
function goBack() {
  closeModal();
  modalContainerSignIn.classList.add("show-modal");
  overlayTwo.classList.add("overlay--visible");
}
if (btnBackToSignIn || false) {
  btnBackToSignIn.addEventListener("click", goBack);
}
if (btnBackToSignIn2 || false) {
  btnBackToSignIn2.addEventListener("click", goBack);
}

$("#btn-send-password").click(function (e) {
  let userEmail = $("#email-forgot-password").val();
  let validEmail = validateEmail(userEmail);
  if (validEmail) {
    e.preventDefault();
    closeModal();
    openModalSuccess();
    setTimeout(function () {
      closeModalSuccess();
    }, 2000);
  } else {
    return false;
  }
});
if (optionForgotPassword || false) {
  optionForgotPassword.addEventListener("click", forgotPasswordModalOpen);
}
// save new user data
$("#btn-save-new-data").click(function (e) {
  let userEmail = $("#email-change-user-data").val();
  let validEmail = validateEmail(userEmail);

  if (validEmail && $("#phone-change-user-data").inputmask("isComplete")) {
    e.preventDefault();
    closeModal();
    openModalSuccess();
    setTimeout(function () {
      closeModalSuccess();
    }, 2000);
  } else {
    return false;
  }
});
// call me
$("#btn-call-me").click(function (e) {
  if (
    $("#phone-call-me").inputmask("isComplete") &&
    $("#name-call-me").val().length !== 0 &&
    $("#agreement-checkbox").is(":checked")
  ) {
    e.preventDefault();
    closeModal();
    openModalSuccess();
    setTimeout(function () {
      closeModalSuccess();
    }, 2000);
  } else {
    return false;
  }
});

/// clear fields after modal is closed
$("#close-modal").click(function () {
  $("#phone").val("");
  $("#name").val("");
});

$(document).ready(function () {
  $("#phone--1").inputmask("+7(999) 999-99-99");
});

$("#btn--modal--1").click(function (e) {
  if (
    $("#phone--1").inputmask("isComplete") &&
    $("#name--1").val().length !== 0
  ) {
    openModalSuccess();
    //$("#modal--success--1").addClass("modal--success--visible");

    setTimeout(function () {
      closeModalSuccess();
      // $("#modal--success--1").removeClass("modal--success--visible");
    }, 2000);
  } else {
    return false;
  }
});
$(function () {
  $("form").submit(function (e) {
    openModalSuccess();
    //$("#modal--success--1").addClass("modal--success--visible");
    setTimeout(function () {
      closeModalSuccess();
      // $("#modal--success--1").removeClass("modal--success--visible");
    }, 2000);
    $("#phone--1").val("");
    $("#name--1").val("");
    e.preventDefault(e);
  });
});

/// show and validate make order modal form
const openModaMakeOrder = document.getElementById("make-order");
const btnMakeOrder = document.getElementById("btn-make-order");
const modalContainerMakeOrder = document.getElementById("make-order-modal");

if (openModaMakeOrder || false) {
  const showModalMakeOrder = () => {
    openModaMakeOrder.addEventListener("click", () => {
      modalContainerMakeOrder.classList.add("show-modal");
      overlaySeven.classList.add("overlay--visible");
    });
  };
  showModalMakeOrder();
}

$("#btn-make-order").click(function (e) {
  if (
    $("#phone-make-order").inputmask("isComplete") &&
    $("#agreement-checkbox-sign-in").is(":checked")
  ) {
    e.preventDefault();
    closeModal();
    openModalSuccess();
    setTimeout(function () {
      closeModalSuccess();
    }, 2000);
    $("#phone-make-order").val("");
  } else {
    return false;
  }
});
/// leave request form
$("#btn-leave-request").click(function (e) {
  if ($("#phone-leave-request").inputmask("isComplete")) {
    e.preventDefault();
    closeModal();
    openModalSuccess();
    setTimeout(function () {
      closeModalSuccess();
    }, 2000);
    $("#phone-leave-request").val("");
    $("#name-leave-request").val("");
  } else {
    return false;
  }
});
/// recommendations
var swiperRecommendations = new Swiper(".recommendations-slider", {
  pagination: {
    el: ".swiper-pagination-top",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  autoplay: {
    delay: 1800,
    disableOnInteraction: false,
  },
  centeredSlides: false,
  loop: true,
  watchSlidesProgress: true,
  slidesPerView: 3,
  spaceBetween: 40,

  breakpoints: {
    320: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    // desktop >= 991
    991: {
      slidesPerView: 3,
    },
  },
});
/// tabs
$(".tabgroup > div").hide();
$(".tabgroup > div:first-of-type").show();
$(".compare__tabs a").click(function (e) {
  e.preventDefault();
  var $this = $(this),
    tabgroup = "#" + $this.parents(".compare__tabs").data("tabgroup"),
    others = $this.closest("li").siblings().children("a"),
    target = $this.attr("href");
  //parentLi = $this.closest('li')
  others.removeClass("tab--active");
  $this.addClass("tab--active");

  $(tabgroup).children("div").hide();
  $(target).show();
});

let showMoreProducts = document.getElementById("show-more-products");
let showMoreArticles = document.getElementById("show-more-articles");
if (showMoreProducts || false) {
  showMoreProducts.addEventListener("click", () => {
    let hiddenElements = document.querySelectorAll(".search__products .d-none");

    let commentsList = Array.prototype.slice.call(hiddenElements).slice(0, 4);

    commentsList.forEach((item, index) => {
      item.className = "product-card";
      if (index === 0) {
        item.scrollIntoView({
          behavior: "smooth",
        });
      }
    });

    if (hiddenElements.length === 0) {
      showMoreProducts.className = "d-none";
    }
  });
}
if (showMoreArticles || false) {
  showMoreArticles.addEventListener("click", () => {
    let hiddenElements = document.querySelectorAll(".search__articles .d-none");

    let commentsList = Array.prototype.slice.call(hiddenElements).slice(0, 4);

    commentsList.forEach((item, index) => {
      item.className = "news__card-result";
      if (index === 0) {
        item.scrollIntoView({
          behavior: "smooth",
        });
      }
    });

    if (hiddenElements.length === 0) {
      showMoreArticles.className = "d-none";
    }
  });
}
// add - remove favorite
const addToFavorite = document.querySelectorAll(".product__favorite");
addToFavorite.forEach((el) => {
  el.addEventListener("click", function () {
    el.classList.toggle("product__favorite--active");
  });
});
