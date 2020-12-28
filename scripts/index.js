let sliderImages = document.querySelectorAll(".jumbotron");
let arrowLeft = document.querySelector("#arrow-left");
let arrowRight = document.querySelector("#arrow-right");
let current = 0;

//clear all images
function reset() {
  for (let i = 0; i < sliderImages.length; i++) {
    sliderImages[i].style.display = "none";
  }
}
// init slider
function startSlide() {
  reset();
  sliderImages[0].style.display = "block";
}
//show prev
function slideLeft() {
  reset();
  sliderImages[current - 1].style.display = "block";
  current--;
}
//show next
function slideRight() {
  reset();
  sliderImages[current + 1].style.display = "block";
  current++;
}

// startSlide();
// setInterval(() => {
//   slideRight();
// }, 2000);
// setTimeout(() => {
//   startSlide();
//   reset();
//   slideLeft();
// }, 2002);

arrowLeft.addEventListener("click", () => {
  if (current === 0) {
    current = sliderImages.length;
  }
  slideLeft();
});

arrowRight.addEventListener("click", () => {
  if (current === sliderImages.length - 1) {
    current = -1;
  }
  slideRight();
});

startSlide();
