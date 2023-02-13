import "./styles/style.scss";

const headerNavList = document.querySelector(".header-nav-list");
const burger = document.querySelector(".burger-wrapper");
const switchLangBtns = document.querySelectorAll('.switch-lang');

switchLangBtns.forEach((switchLangBtn) => {
  switchLangBtn.addEventListener("click", (event) => {
    switchLangBtn.lastElementChild.classList.toggle("switch-lang--active");
  })
})

burger.addEventListener("click", (event) => {
  toggleBurgerMenu();
});

function toggleBurgerMenu() {
  document.body.classList.toggle("body--active");
}
headerNavList.addEventListener("click", (event) => {
  if (event.target.id && event.target.id !== 'test') {
    toggleBurgerMenu();
  }
})

window.addEventListener("scroll", handleSectionFadeIn, {passive: true})

const sections = document.querySelectorAll("section");
let countOfScrolledSections = 1;

function handleSectionFadeIn() {
  if (countOfScrolledSections === sections.length) {
    window.removeEventListener("scroll", handleSectionFadeIn);
  }
  sections.forEach((section) => {
    if (section.getBoundingClientRect().top - window.innerHeight + 20 < 0) {
      section.classList.add("visible");
    }
  })
}

let slidesCount = 0;
let mediaSlides = null;
const mediaSlider = document.querySelector(".media-slider");
if (mediaSlider) {
  mediaSlides = mediaSlider.querySelector(".media-slider__slides");
  slidesCount = mediaSlides.children.length

  mediaSlider.addEventListener("focus", () => {
    mediaSlider.addEventListener("touchstart", slideTouchStart, {passive: true});
    mediaSlider.addEventListener("touchend", slideTouchEnd, {passive: true});
    setTimeout(() => {
      mediaSlides.addEventListener("click", zoomImage);
    });
  });

  mediaSlider.addEventListener("blur", () => {
    mediaSlider.removeEventListener("touchstart", slideTouchStart);
    mediaSlider.removeEventListener("touchend", slideTouchEnd);
    mediaSlides.removeEventListener("click", zoomImage);
  })
}

function zoomImage(e) {
  e.stopPropagation();
  handleImageClick(e.target);
}

function slideTouchStart(e) {
  touchStartX = e.changedTouches[0].screenX;
}

function slideTouchEnd(e) {
  touchEndX = e.changedTouches[0].screenX;
  moveSlider();
}

let slideIndex = 0;

let touchEndX, touchStartX = 0;
let sliderTranslateX = 0;

function moveSlider() {
  const isSwipedRight = touchEndX < touchStartX;

  if (isSwipedRight) {
    moveSliderRight();
  } else {
    moveSliderLeft();
  }
}

function moveSliderRight(mediaSlideWidth = getMediaSlideWidth()) {
  if (slideIndex === slidesCount - 1) { return }
  slideIndex += 1;
  sliderTranslateX -= mediaSlideWidth;
  mediaSlides.style.transform = `translateX(${sliderTranslateX}px)`;
}

function moveSliderLeft(mediaSlideWidth = getMediaSlideWidth()) {
  if (slideIndex === 0) { return }
  sliderTranslateX += mediaSlideWidth;
  mediaSlides.style.transform = `translateX(${sliderTranslateX}px)`;
  slideIndex -= 1;
}

function getMediaSlideWidth() {
  return mediaSlides.firstElementChild.getBoundingClientRect().width;
}

let currentSlide = null;

function handleImageClick(element) {
  if (element instanceof HTMLImageElement) {
    currentSlide = element;
    initBackdropListener();
    scaleImage(element);
  }
}

const imgBackdrop = document.querySelector(".image-backdrop");
imgBackdrop.addEventListener("click", (event) => {
  if (event.currentTarget === event.target) {
    removeBackdrop();
  }
})

function onBackdropKeydown(event) {
  switch (event.key) {
    case "Escape":
      removeBackdrop();
      break;
    case "ArrowLeft":
      if (currentSlide && currentSlide instanceof HTMLImageElement) {
        currentSlide = mediaHandleLeftArrow(currentSlide);
      }
      break;
    case "ArrowRight":
      if (currentSlide && currentSlide instanceof HTMLImageElement) {
        currentSlide = mediaHandleRightArrow(currentSlide);
      }
      break;
  }
  if (event.key === "Escape") {
    removeBackdrop();
  }
}

function initBackdropListener() {
  document.addEventListener("keydown", onBackdropKeydown);
}

function removeBackdrop() {
  imgBackdrop.style.opacity = 0;
  imgBackdrop.style.display = "none";
  document.removeEventListener("keydown", onBackdropKeydown);
}

function mediaHandleRightArrow(elem) {
  if (elem.nextElementSibling) {
    elem = elem.nextElementSibling;
  } else {
    elem = elem.parentElement.firstElementChild;
  }
  scaleImage(elem);
  return elem;
}

function mediaHandleLeftArrow(elem) {
  if (elem.previousElementSibling) {
    elem = elem.previousElementSibling;
  } else {
    elem = elem.parentElement.lastElementChild;
  }
  scaleImage(elem);
  return elem;
}

function scaleImage(el) {
  if (el) {
    imgBackdrop.style.display = "block";
    imgBackdrop.style.opacity = 1;
    imgBackdrop.firstElementChild.setAttribute("src", el.src);
  }
  // imgBackdrop.firstElementChild.src = el.target.src;
}

const gallerySlides = document.querySelector('#gallery > .container');
if (gallerySlides) {
  gallerySlides.addEventListener("click", (e) => handleImageClick(e.target));
}

const spinner = document.querySelector(".spinner");

document.forms['joinus'].addEventListener("submit", (e) => {
  // e.preventDefault();
  // spinner.classList.toggle("spinner--active");
})

const [leftArrowBtn, rightArrowBtn] = document.querySelectorAll(".media-slider__controls button");
leftArrowBtn.addEventListener("click", () => {
  moveSliderLeft();
})
rightArrowBtn.addEventListener("click", () => {
  moveSliderRight();
})
