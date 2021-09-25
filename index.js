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

// muh mixtape
const mixtape = document.querySelector(".mixtape");
const audio = document.querySelector("audio");
const title = document.querySelector(".title");
// buttons
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const playBtn = document.querySelector(".playBtn");
const seek = document.querySelector("#seek");
// seek time
const curTime = document.querySelector("#curTime");
const durTime = document.querySelector("#durTime");
// play / pause icon
const playIcon = document.querySelector("#playIcon");
// tracklist
const trackList = [
  {
    no: 0,
    title: "When We...",
    artist: "silk.y",
    path: "./tracks/When_We.mp3",
  },
  {
    no: 1,
    title: "Had Time...",
    artist: "silk.y",
    path: "./tracks/Had_Time.mp3",
  },
  {
    no: 2,
    title: "To Go...",
    artist: "silk.y",
    path: "./tracks/To_Go.mp3",
  },
  {
    no: 3,
    title: "To The Seaside...",
    artist: "silk.y",
    path: "./tracks/To_The_Seaside.mp3",
  },
  {
    no: 4,
    title: "And Forget The World...",
    artist: "silk.y",
    path: "./tracks/And_Forget_The_World.mp3",
  },
];
function loadTrack(trackList) {
  title.textContent = trackList.title + " [" + trackList.artist + "]";
  audio.src = trackList.path;
}
let i = 0;
loadTrack(trackList[i]);
// play / pause
let playing = false;
function playTrack() {
  playing = true;
  audio.play();
  playIcon.className = "fa fa-pause";
}
function pauseTrack() {
  playing = false;
  audio.pause();
  playIcon.className = "fa fa-play";
}
playBtn.addEventListener("click", () => {
  playing ? pauseTrack() : playTrack();
});
// seek bar
let seeking = false;
let seekTo = 0;
function seekTrack(event) {
  if (seeking) {
    // "- 35" is correction for the position of the seek bar
    seek.value = event.clientX - seek.offsetLeft - 35;
    audio.currentTime = audio.duration * (seek.value / 100);
  }
}
function seekTimeUpdate() {
  var time = audio.currentTime * (100 / audio.duration);
  seek.value = time;
  var curmin = Math.floor(audio.currentTime / 60);
  var cursec = Math.floor(audio.currentTime - curmin * 60);
  var durmin = Math.floor(audio.duration / 60);
  var dursec = Math.floor(audio.duration - durmin * 60);
  // formating to get XX:XX look
  if (cursec < 10) cursec = "0" + cursec;
  if (dursec < 10) dursec = "0" + dursec;
  if (curmin < 10) curmin = "0" + curmin;
  if (durmin < 10) durmin = "0" + durmin;
  curTime.innerHTML = curmin + ":" + cursec;
  durTime.innerHTML = durmin + ":" + dursec;
}
seek.addEventListener("mousedown", (event) => {
  seeking = true;
  pauseTrack();
  seekTrack(event);
});
seek.addEventListener("mousemove", (event) => {
  seekTrack(event);
});
seek.addEventListener("mouseup", () => {
  playTrack();
  seeking = false;
});
audio.addEventListener("timeupdate", seekTimeUpdate);
// prev / next track
function prevTrack() {
  i <= 0 ? (i = trackList.length - 1) : i--;
  loadTrack(trackList[i]);
  playTrack();
}
prev.addEventListener("click", prevTrack);
function nextTrack() {
  i >= trackList.length - 1 ? (i = 0) : i++;
  loadTrack(trackList[i]);
  playTrack();
}
next.addEventListener("click", nextTrack);
audio.addEventListener("ended", () => {
  if (!seeking) nextTrack();
});
// frontend track list setup
const tracksWrapper = document.querySelector(".tracksWrapper");
let hideTracks = true;
title.addEventListener("click", () => {
  if (hideTracks) {
    mixtape.classList.add("showTracks");
    tracksWrapper.classList.add("showTracks");
    hideTracks = false;
  } else {
    mixtape.classList.remove("showTracks");
    tracksWrapper.classList.remove("showTracks");
    hideTracks = true;
  }
});
// play a selected track
let twChildren = tracksWrapper.children;
for (let t in trackList) {
  twChildren[t].textContent =
    trackList[t].title + " [" + trackList[t].artist + "]";
  twChildren[t].dataset.no = trackList[t].no;
  twChildren[t].addEventListener("click", () => {
    i = t;
    loadTrack(trackList[t]);
    playTrack();
  });
}
// horizontal scroll for track being played
const titleWrapper = document.querySelector(".titleWrapper");
titleWrapper.addEventListener("wheel", (event) => {
  event.preventDefault();
  titleWrapper.scrollLeft += event.deltaY;
});

// for the overlays section
const body = document.querySelector("body");
const landing = document.querySelector(".landing");
const about = document.querySelector("#about");
const publications = document.querySelector(".publications");
const contactMe = document.querySelector(".contactMe");

// transition btns
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

// contact form
const contactForm = document.querySelector("#contactMeForm");

// firebase
const firebaseConfig = {
  apiKey: "AIzaSyCRYsXazlUcWDmsWOYmJWdp_2JKjinPyYQ",
  authDomain: "contactmeform-3de70.firebaseapp.com",
  databaseURL: "https://contactmeform-3de70.firebaseio.com",
  projectId: "contactmeform-3de70",
  storageBucket: "contactmeform-3de70.appspot.com",
  messagingSenderId: "868962792991",
  appId: "1:868962792991:web:00b5f76739b7bf303c872a",
  measurementId: "G-P80V6E5WZQ",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// put messages into a collection called 'messages'
let destination = firebase.database().ref("messages");

function submitForm(event) {
  event.preventDefault();
  let submitter = getInput("submitter");
  let contactInfo = getInput("contactInfo");
  let msg = getInput("msg");

  let send = destination.push();
  send.set({
    submitter: submitter,
    contactInfo: contactInfo,
    msg: msg,
  });

  contactForm.reset();
}
function getInput(id) {
  return document.getElementById(id).value;
}

contactForm.addEventListener("submit", submitForm);
