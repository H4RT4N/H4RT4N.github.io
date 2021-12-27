// General

// landing text
let amTyped = new Typed(".amTyped", {
  strings: [
    "I am <strong>Harry Tran.</strong>^1500",
    "I am a programmer.",
    "I am a developer.",
  ],
  typeSpeed: 30,
  backSpeed: 30,
  backDelay: 2000,
  loop: true,
  smartBackspace: true,
  showCursor: true,
  cursorChar: "|",
});

// dont need this.... for now?
//let hintTyped = new Typed('.hintTyped', {
//    strings: ["^10000There's a music player at the top left corner of the site. :)"],
//    typeSpeed: 20,
//    backSpeed: 10,
//    backDelay: 5000,
//    loop: true,
//    showCursor: false
//});

// Overlays
const body = document.querySelector("body");
const landing = document.querySelector(".landing");
const about = document.querySelector("#about");
const publications = document.querySelector(".publications");
const contactMe = document.querySelector(".contactMe");

// Transition btns
const pubBtn = document.querySelector("#pubBtn");
const contactBtn = document.querySelector("#contactBtn");
const landingBtnP = document.querySelector("#landingBtnP");
const landingBtnC = document.querySelector("#landingBtnC");
// transition on click
pubBtn.addEventListener("click", () => {
  publications.classList.add("show");
  landing.classList.add("hide");
  about.classList.add("hide");
  body.classList.add("noScroll");
});
contactBtn.addEventListener("click", () => {
  contactMe.classList.add("show");
  landing.classList.add("hide");
  about.classList.add("hide");
  body.classList.add("noScroll");
});
function returnToHome() {
  landing.classList.remove("hide");
  about.classList.remove("hide");
  body.classList.remove("noScroll");
}
landingBtnP.addEventListener("click", () => {
  publications.classList.remove("show");
  returnToHome();
});
landingBtnC.addEventListener("click", () => {
  contactMe.classList.remove("show");
  returnToHome();
});