// Uses swiper.js

// about swiper
let aboutSwiper = new Swiper(".aboutSwiper", {
    centeredSlides: true,
    loop: true,
    slidesPerView: "auto",
    spaceBetween: 0,
    effect: "coverflow",
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: false,
    },
  });
  
  // publications swiper
  let pubSwiper = new Swiper(".pubSwiper", {
    direction: "vertical",
    slidesPerView: "auto",
    loop: true,
    mousewheel: true,
    effect: "creative",
    creativeEffect: {
      prev: {
        shadow: false,
        translate: [0, "-110%", -550],
      },
      next: {
        translate: [0, "110%", -550],
      },
    },
  });