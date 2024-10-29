let song = document.querySelector(".song");
let playPauseBtn = document.querySelector(".playPauseCnt");
let progress = document.querySelector("#progressBar");
let isPlaying = false;

if (song.play()) {
  setInterval(() => {
    progress.max = song.duration;
    progress.value = song.currentTime;
    updateTime();
  }, 500);
}

progress.onchange = function () {
  song.currentTime = progress.value;
  song.play();
  playPauseBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M48 64C21.5 64 0 85.5 0 112L0 400c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48L48 64zm192 0c-26.5 0-48 21.5-48 48l0 288c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48l-32 0z"/></svg>`;
};

playPauseBtn.addEventListener("click", () => {
  if (isPlaying === false) {
    isPlaying = true;
    song.play();
    playPauseBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M48 64C21.5 64 0 85.5 0 112L0 400c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48L48 64zm192 0c-26.5 0-48 21.5-48 48l0 288c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48l-32 0z"/></svg>`;
  } else {
    isPlaying = false;
    song.pause();
    playPauseBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>`;
  }
});

song.addEventListener("ended", () => {
  isPlaying = false;
  playPauseBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>`;
});

function updateTime() {
  let currTimeDiv = document.querySelector(".currTime");
  let totalTimeDiv = document.querySelector(".totalTime");

  let currentMinutes = Math.floor(song.currentTime / 60);
  let currentSeconds = Math.floor(song.currentTime % 60)
    .toString()
    .padStart(2, "0");

  let totalMinutes = Math.floor(song.duration / 60);
  let totalSeconds = Math.floor(song.duration % 60)
    .toString()
    .padStart(2, "0");

  currTimeDiv.innerText = `${currentMinutes}:${currentSeconds}`;
  totalTimeDiv.innerText = `${totalMinutes}:${totalSeconds}`;
}

song.addEventListener("timeupdate", () => {
  let value = song.currentTime;
  let max = song.duration;

  let percentage = (value / max) * 100;

  progress.style.background = `linear-gradient(to right, white ${percentage}%, gray ${percentage}%)`;

  progress.value = value;
});

song.addEventListener("loadedmetadata", () => {
  progress.max = song.duration;
});
