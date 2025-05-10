const track = document.querySelector(".carousel-track");
let slides = document.querySelectorAll(".carousel-slide");
const nextBtn = document.querySelector(".carousel-btn-right");
const prevBtn = document.querySelector(".carousel-btn-left");
const gap = parseFloat(getComputedStyle(track).gap) || 0;
const slideWidth = slides[0].offsetWidth + gap;

// Clone the first and last slides
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);
firstClone.id = "first-clone";
lastClone.id = "last-clone";

// Append last clone to end of list and insert first clone at the beginning of the list
track.appendChild(firstClone);
track.insertBefore(lastClone, slides[0]);

slides = document.querySelectorAll(".carousel-slide");

let index = 1;
const size = slides[0].clientWidth + 8;
track.style.transform = `translateX(${-size * index}px)`;

// Next button
nextBtn.addEventListener("click", () => {
  if (index >= slides.length - 1) return;
  index++;
  track.style.transition = "transform 0.4s ease-in-out";
  track.style.transform = `translateX(${-slideWidth * index}px)`;
});

// Previous button
prevBtn.addEventListener("click", () => {
  if (index <= 0) return;
  index--;
  track.style.transition = "transform 0.4s ease-in-out";
  track.style.transform = `translateX(${-slideWidth * index}px)`;
});

// Loop
track.addEventListener("transitionend", () => {
  if (slides[index].id === "first-clone") {
    track.style.transition = "none";
    index = 1;
    track.style.transform = `translateX(${-slideWidth * index}px)`;
  }

  if (slides[index].id === "last-clone") {
    track.style.transition = "none";
    index = slides.length - 2;
    track.style.transform = `translateX(${-slideWidth * index}px)`;
  }
});
