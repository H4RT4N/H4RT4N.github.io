// Music player at the top left

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