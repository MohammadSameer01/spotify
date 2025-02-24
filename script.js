// let api = `https://ws.audioscrobbler.com/2.0/?method=track.search&track=cheques&api_key=9896e404c001964e94a24f806b2586fd&format=json`;

function greetingTextFunction() {
  let greetingsText = document.querySelector(".greetingsText");
  let hour = new Date();
  hour = hour.getHours();
  if (hour >= 20) {
    wish = `night`;
  } else if (hour >= 17) {
    wish = `evening`;
  } else if (hour >= 12) {
    wish = `afternoon`;
  } else if (hour >= 0) {
    wish = `morning`;
  } else {
    wish = `day`;
  }
  greetingsText.innerHTML = `Good ${wish}`;
  return wish;
}
greetingTextFunction();

function loadHomePageSongs() {
  let songsList = document.createElement("div");
  songsList.setAttribute("class", "songsList");

  Object.keys(songsObject).forEach((key) => {
    //
    let songDetails = songsObject[key];
    //
    let songTitle = songDetails.songTitle;
    let singer = songDetails.singer;
    let songAudio = songDetails.songAudio;
    let songCoverImage = songDetails.songCover;
    let coverImageALTText = songDetails.songImageALTText;
    //
    createSongBox(
      songTitle,
      singer,
      songAudio,
      songCoverImage,
      coverImageALTText
    );
  });
}
loadHomePageSongs();

function createSongBox(
  songName,
  singerName,
  songAddress,
  songCoverImage,
  coverImageALTText
) {
  let song = document.createElement("div");
  song.setAttribute("class", "song");
  song.setAttribute("songPath", songAddress); //parameterThree
  //
  let songImgCnt = document.createElement("div");
  songImgCnt.setAttribute("class", "songImgCnt");
  //
  let img = document.createElement("img");
  img.setAttribute("src", songCoverImage); //parameterFour
  img.setAttribute("class", "songImage");
  img.setAttribute("alt", coverImageALTText); //parameterFive
  //
  songImgCnt.append(img);
  //
  let songInfoCnt = document.createElement("div");
  songInfoCnt.setAttribute("class", "songInfoCnt");
  //
  let songTitle = document.createElement("div");
  songTitle.setAttribute("class", "songTitle");
  songTitle.innerText = songName; // parameterOne
  songInfoCnt.append(songTitle);
  //
  let singerTitle = document.createElement("div");
  singerTitle.setAttribute("class", "singerTitle");
  singerTitle.innerText = singerName; //parameterTwo
  songInfoCnt.append(singerTitle);
  //
  song.append(songImgCnt);
  song.append(songInfoCnt);

  song.addEventListener("click", () => {
    // console.log(songName);
  });

  let threeDots = document.createElement("div");
  threeDots.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"/></svg>
   `;
  threeDots.setAttribute("class", "threeDotsClass");
  song.append(threeDots);

  let songsList = document.querySelector(".songsList");
  songsList.append(song);
}

//
let boxes = document.querySelectorAll(".song");
let nowPlaying = null;
let currentAudio = null;

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    let songTitle = box.querySelector(".songTitle").innerText;

    // Find the song object by its title
    let songKey = Object.keys(songsObject).find(
      (key) => songsObject[key].songTitle === songTitle
    );

    if (songKey) {
      let currentSong = songsObject[songKey];

      // If there's already an audio playing, stop it
      if (currentAudio && !currentAudio.paused) {
        currentAudio.pause();
        currentAudio.currentTime = 0; // Reset audio to start from the beginning
      }

      // Create a new Audio object with the song's audio file
      currentAudio = new Audio(currentSong.songAudio);
      nowPlaying = currentSong;

      // Listen for the 'canplaythrough' event before playing
      currentAudio.addEventListener("canplaythrough", () => {
        currentAudio.play();
        //
        isPlaying = true;
        updatePlayIcon();
      });
      currPlayerDetailsVisibility();

      // Update the current player (or UI) with the new song details
      updateCurrentPlayerCnt(
        currentSong.songTitle,
        currentSong.singer,
        currentSong.songCover,
        currentAudio
      );
    } else {
      alert("Song not found.");
    }
  });
});

//
//
//
//
//
let songProgressBar = document.querySelector(".songProgressBar");
function updateCurrentPlayerCnt(
  currentSongName,
  currentSingerName,
  songImage,
  playingSong
) {
  let currentPlayerImage = document.querySelector(
    ".currentPlayerCnt .songImgCnt img"
  );
  let currentPlayerSongTitle = document.querySelector(
    ".currentPlayerCnt .songInfoCnt .songTitle"
  );
  let currentPlayerSingerTitle = document.querySelector(
    ".currentPlayerCnt .songInfoCnt .singerTitle"
  );

  currentPlayerSongTitle.innerText = currentSongName;
  currentPlayerSingerTitle.innerText = currentSingerName;
  currentPlayerImage.setAttribute("src", songImage);

  // Update FullSceen CurrenPlayer
  let currPlayerSongName = document.querySelector(".currPlayerSongName");
  let cdSongName = document.querySelector(".cdSongName");
  currPlayerSongName.innerText = currentSongName;
  cdSongName.innerText = currentSongName;
  //
  cdSingerName = document.querySelector(".cdSingerName");
  cdSingerName.innerText = currentSingerName;
  let nowPlayingSongCover = document.querySelector(".nowPlayingSongCover");
  nowPlayingSongCover.setAttribute("src", songImage);
  //
  //

  playingSong.addEventListener("timeupdate", () => {
    progressBarBackground(playingSong);
    if (currentAudio.currentTime >= currentAudio.duration) {
      isPlaying = false;
      updatePlayIcon();
    }
  });
  //
  //
  //
  //Functions Called
  updateSongTime(playingSong);
  currPlayerSmallSizeBackground();
}
function updateSongTime(playingSong) {
  playingSong.addEventListener("loadedmetadata", () => {
    let totalTime = document.querySelector(".totalTime");
    //
    //
    totalMinutes = Math.floor(playingSong.duration / 60);
    totalSeconds = Math.floor(playingSong.duration % 60)
      .toString()
      .padStart(2, "0");

    //
    // Update values to webpage
    totalTime.innerHTML = `${totalMinutes}:${totalSeconds}`;
  });
}
function progressBarBackground(playingSong) {
  let currTime = document.querySelector(".currTime");

  currentMinutes = Math.floor(playingSong.currentTime / 60);
  currentSeconds = Math.floor(playingSong.currentTime % 60)
    .toString()
    .padStart("2", 0);
  currTime.innerHTML = `${currentMinutes}:${currentSeconds}`;

  let value = playingSong.currentTime;
  let maxDuration = playingSong.duration;
  let percetange = (value / maxDuration) * 100;
  //
  songProgressBar.style.background = `linear-gradient(to right, white ${percetange}%, gray ${percetange}%)`;
  //
  songProgressBar.value = value;
  songProgressBar.max = playingSong.duration;
}

songProgressBar.addEventListener("change", function () {
  currentAudio.currentTime = songProgressBar.value;
});
//
//
//
//
//
// Check the issue with progressBarBg and progressBarBackground functions
songProgressBar.addEventListener("input", progressBarBG);
function progressBarBG() {
  let value = songProgressBar.value;
  let maxDuration = currentAudio.duration;
  let percentage = (value / maxDuration) * 100;

  // Update the progress bar background instantly
  songProgressBar.style.background = `linear-gradient(to right, white ${percentage}%, gray ${percentage}%)`;
}
//
//
let isPlaying = false;
let playPauseBtn = document.querySelectorAll(".playPauseBtn");
function updatePlayIcon() {
  if (isPlaying === false) {
    playPauseBtn.forEach((button) => {
      button.innerHTML = `
    <svg
              data-encore-id="icon"
              role="img"
              aria-hidden="true"
              class="e-9640-icon"
              viewBox="0 0 24 24"
            >
              <path
                d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"
              ></path>
            </svg>
            `;
    });
  } else {
    playPauseBtn.forEach((button) => {
      button.innerHTML = `
       <svg data-encore-id="icon" role="img" aria-hidden="true" class="e-9640-icon" viewBox="0 0 24 24"><path d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z"></path></svg>
      `;
    });
  }
}
updatePlayIcon();
//
playPauseBtn.forEach((button) => {
  button.addEventListener("click", () => {
    if (isPlaying == false) {
      isPlaying = true;
      updatePlayIcon();

      if (currentAudio) {
        currentAudio.play();
      }
    } else {
      isPlaying = false;
      updatePlayIcon();

      if (currentAudio) {
        currentAudio.pause();
      }
    }
  });
});

function currPlayerDetailsVisibility() {
  if (currentAudio !== null) {
    currentPlayerCnt.classList.add("currentPlayerCntActive");
  }
}

function themeColorFunc(winnerColor) {
  const rootStyles = getComputedStyle(document.documentElement);
  const backgroundColor = rootStyles
    .getPropertyValue("--backgroundColor")
    .trim();

  let metaTag = document.createElement("meta");
  metaTag.setAttribute("name", "theme-color");
  if (winnerColor) {
    metaTag.setAttribute("content", winnerColor);
  } else {
    metaTag.setAttribute("content", backgroundColor);
  }

  document.head.prepend(metaTag);
}
function currPlayerBackgroundColor() {
  let themeColors = nowPlaying.themeColor;
  const [color1, color2] = themeColors.split(",");

  currPlayerDisplaySection.style.background = `linear-gradient(${color1},${color2})`;

  themeColorFunc(color1);
}
// Background Color for fixed small sized currentPlayer Container
function currPlayerSmallSizeBackground() {
  let metaThemeColors = nowPlaying.themeColor;
  const [color1, color2] = metaThemeColors.split(",");
  currentPlayerCnt.style.background = color1;
}

let openCurrSongClass = document.querySelectorAll(".openCurrSongClass");
let currentPlayerCnt = document.querySelector(".currentPlayerCnt");
let currPlayerDisplaySection = document.querySelector(
  "#currPlayerDisplaySection"
);
let currPlayerDropDownCnt = document.querySelector(".currPlayerDropDownCnt");
//
openCurrSongClass.forEach((box) => {
  box.addEventListener("click", () => {
    currPlayerDisplaySection.classList.add("currPlayerDisplaySectionActive");
    currentPlayerCnt.classList.remove("currentPlayerCntActive");
    //
    currPlayerBackgroundColor();
  });
});
//
currPlayerDropDownCnt.addEventListener("click", () => {
  currPlayerDisplaySection.classList.remove("currPlayerDisplaySectionActive");
  themeColorFunc();
  setTimeout(() => {
    currentPlayerCnt.classList.add("currentPlayerCntActive");
  }, 200);
});
//
//
//
//
//
//
//
//
//
//
//
//
//
function openFullscreen() {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  } else if (document.documentElement.mozRequestFullScreen) {
    // Firefox
    document.documentElement.mozRequestFullScreen();
  } else if (document.documentElement.webkitRequestFullscreen) {
    // Chrome, Safari
    document.documentElement.webkitRequestFullscreen();
  } else if (document.documentElement.msRequestFullscreen) {
    // IE/Edge
    document.documentElement.msRequestFullscreen();
  }
}

function changeSongFunction() {
  let songs = Object.keys(songsObject);
  const randomKey = songs[Math.floor(Math.random() * songs.length)];

  // unusable variables
  let newSongCheck = songsObject[randomKey];
  newSongCheck = newSongCheck.songAudio;
  newSongCheck = newSongCheck.split("/").pop();
  let prevSong = currentAudio.src;
  prevSong = prevSong.split("/").pop();
  //

  if (newSongCheck !== prevSong) {
    if (currentAudio && !currentAudio.paused) {
      currentAudio.pause();
      currentAudio.currentTime = 0; // Reset audio to start from the beginning

      currentSong = songsObject[randomKey];
      currentAudio = new Audio(currentSong.songAudio);
      nowPlaying = currentSong;
      // Listen for the 'canplaythrough' event before playing
      currentAudio.addEventListener("canplaythrough", () => {
        currentAudio.play();
        //
        isPlaying = true;
        updatePlayIcon();
      });
      currPlayerDetailsVisibility();
      updateSongTime(currentAudio);
    }
  } else {
    changeSongFunction();
  }

  setTimeout(() => {
    // Update the current player (or UI) with the new song details
    updateCurrentPlayerCnt(
      currentSong.songTitle,
      currentSong.singer,
      currentSong.songCover,
      currentAudio
    );
    currPlayerBackgroundColor();
  }, 300);
}

let changeSongClass = document.querySelectorAll(".changeSongClass");
changeSongClass.forEach((btn) => {
  btn.addEventListener("click", () => {
    changeSongFunction();

    if (btn.classList.contains("leftSongChangeButton")) {
      songChangeAnimationLeft();
    } else {
      songChangeAnimationRight();
    }
  });
});

//
//
//
//
//
//
//
let touchStartY = 0;
document.addEventListener(
  "touchstart",
  function (e) {
    touchStartY = e.touches[0].clientY;
  },
  { passive: false }
);
document.addEventListener(
  "touchmove",
  function (e) {
    let section = document.getElementById("currPlayerDisplaySection");

    // Check if the section has the class before executing
    if (section.classList.contains("currPlayerDisplaySectionActive")) {
      // Detect if user is at the very top of the page
      if (window.scrollY === 0 && e.touches[0].clientY > touchStartY) {
        e.preventDefault(); // Prevent pull-to-refresh
        section.classList.remove("currPlayerDisplaySectionActive"); // Remove the class
        setTimeout(() => {
          currentPlayerCnt.classList.add("currentPlayerCntActive");
          themeColorFunc();
        }, 300);
      }
    } else {
      if (window.scrollY === 0 && e.touches[0].clientY > touchStartY) {
        e.preventDefault(); // Prevent pull-to-refresh
      }
    }
  },
  { passive: false }
);

//
//
//
//
//
//
//
let touchStartX = 0;
let touchStartTime = 0;
const SWIPE_DISTANCE_THRESHOLD = 100; // Minimum pixels for strong swipe
const SWIPE_TIME_THRESHOLD = 300; // Max time (ms) for a fast swipe

document.addEventListener(
  "touchstart",
  function (e) {
    let target = e.target.closest(".currentPlayerCnt"); // Check if the touch is inside .currentPlayerCnt
    if (!target) return; // If not inside, ignore the event

    touchStartX = e.touches[0].clientX;
    touchStartTime = new Date().getTime(); // Record time of touch start

    target.setAttribute("data-swiping", "true"); // Mark element as swiping
  },
  { passive: false }
);

document.addEventListener(
  "touchend",
  function (e) {
    let currentPlayerCnt = document.querySelector(".currentPlayerCnt");
    if (
      !currentPlayerCnt ||
      currentPlayerCnt.getAttribute("data-swiping") !== "true"
    )
      return;

    let touchEndX = e.changedTouches[0].clientX;
    let swipeDistance = touchEndX - touchStartX;
    let swipeTime = new Date().getTime() - touchStartTime; // Calculate swipe duration

    // Detect a **strong** swipe: Fast (less than threshold time) and long (more than threshold distance)
    if (
      Math.abs(swipeDistance) > SWIPE_DISTANCE_THRESHOLD &&
      swipeTime < SWIPE_TIME_THRESHOLD
    ) {
      changeSongFunction(); // Trigger song change on strong swipe

      setTimeout(() => {
        themeColorFunc();
      }, 300);
    }

    currentPlayerCnt.removeAttribute("data-swiping"); // Reset swiping state
  },
  { passive: false }
);

function songChangeAnimationRight() {
  currPlayerSongCoverCnt = document.querySelector(".currPlayerSongCoverCnt");

  currPlayerSongCoverCnt.classList.add("currPlayerSongCoverCnt-effect");

  setTimeout(() => {
    currPlayerSongCoverCnt.classList.remove("currPlayerSongCoverCnt-effect");
  }, 600);
}
function songChangeAnimationLeft() {
  currPlayerSongCoverCnt = document.querySelector(".currPlayerSongCoverCnt");

  currPlayerSongCoverCnt.classList.add("currPlayerSongCoverCnt-effectLeft");

  setTimeout(() => {
    currPlayerSongCoverCnt.classList.remove(
      "currPlayerSongCoverCnt-effectLeft"
    );
  }, 600);
}
