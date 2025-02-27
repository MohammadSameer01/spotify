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
    // let coverImageALTText = `Cover image for the song '${songTitle}' by ${singer}`;

    let alternateTextArray = [
      `Official cover art for the song '${songTitle}' by ${singer} featuring bold typography with a dark and intense aesthetic`,
      `Cover art for '${songTitle}' by ${singer} with glowing neon lights and a futuristic city background`,
      `Cover image for '${songTitle}' by ${singer} featuring a close-up portrait of the artist with a vintage filter`,
      `Album artwork for '${songTitle}' by ${singer} featuring abstract watercolor designs in shades of blue and purple`,
      `Minimalist cover design for '${songTitle}' by ${singer} with a plain white background and handwritten typography`,
      `Official song cover for '${songTitle}' by ${singer} with a gritty, grunge aesthetic and distorted typography`,
    ];

    randomChoice = Math.floor(Math.random() * alternateTextArray.length);
    let coverImageALTText = alternateTextArray[randomChoice];

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
  img.setAttribute("alt", coverImageALTText); //parameterFive //
  //
  songImgCnt.append(img);
  //
  let songInfoCnt = document.createElement("div");
  songInfoCnt.setAttribute("class", "songInfoCnt");
  //
  let songTitle = document.createElement("h4");
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
  //
  //
  //
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
      updatePageTitle();

      // Example: Call the function when a song starts playing
      showSongNotification(nowPlaying, currentAudio);
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

  fetchWikiImage(currentSingerName);

  // 🔹 Remove any existing "timeupdate" listener to avoid duplication
  playingSong.removeEventListener("timeupdate", updateProgress);
  playingSong.addEventListener("timeupdate", updateProgress);

  // 🔹 Function to handle progress updates (prevents multiple listeners)
  function updateProgress() {
    progressBarBackground(playingSong);
    if (playingSong.currentTime >= playingSong.duration) {
      isPlaying = false;
      updatePlayIcon();
    }
  }
  //
  //
  //
  //Functions Called
  fetchLyricsApi(currentSongName, currentSingerName);
  updateSongTime(playingSong);
  currPlayerSmallSizeBackground();
}

function updateSongTime(playingSong) {
  function updateDuration() {
    let totalTime = document.querySelector(".totalTime");

    let totalMinutes = Math.floor(playingSong.duration / 60);
    let totalSeconds = Math.floor(playingSong.duration % 60)
      .toString()
      .padStart(2, "0");

    // Update values on the webpage
    totalTime.innerHTML = `${totalMinutes}:${totalSeconds}`;
  }

  // If metadata is already loaded, update immediately
  if (!isNaN(playingSong.duration)) {
    updateDuration();
  } else {
    // Wait for metadata if not loaded yet
    playingSong.addEventListener("loadedmetadata", updateDuration, {
      once: true,
    });
  }
}

//
//

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

let fixedFooter = document.querySelector("#fixedFooter");
function currPlayerDetailsVisibility() {
  if (currentAudio !== null) {
    currentPlayerCnt.classList.add("currentPlayerCntActive");
    fixedFooter.classList.add("footerSongActiveStyles");
  }
}

// //////////////////////////////////////

function themeColorFunc(winnerColor) {
  let metaTag = document.querySelector("meta[name='theme-color']");

  // THIS CREATES A META TAG IF THAT IS NOT PRESENT IN THE HEAD ALREADY
  if (!metaTag) {
    metaTag = document.createElement("meta");
    metaTag.setAttribute("name", "theme-color");
    document.head.appendChild(metaTag);
  }

  const rootStyles = getComputedStyle(document.documentElement);
  const backgroundColor = rootStyles
    .getPropertyValue("--backgroundColor")
    .trim();

  metaTag.setAttribute("content", winnerColor || backgroundColor);
}
function updatePageTitle() {
  let songName = document.querySelector(".currentPlayerCnt .songTitle");
  let singerName = document.querySelector(".currentPlayerCnt .singerTitle");

  songName = songName.innerHTML;
  singerName = singerName.innerHTML;

  newPageTitle = `${songName} • ${singerName}`;

  if (newPageTitle) {
    document.title = newPageTitle;
  }
}

// //////////////////////////////////////

function currPlayerBackgroundColor() {
  let themeColors = nowPlaying.themeColor;
  const [color1, color2] = themeColors.split(",");

  currPlayerDisplaySection.style.background = `linear-gradient(${color1},${color2})`;

  let currPlayerLyricsCnt = document.querySelector(".currPlayerLyricsCnt");
  currPlayerLyricsCnt.style.background = `${color1}`;

  let lyricsCnt = document.querySelector(".lyricsCnt");
  lyricsCnt.style.setProperty(
    "--after-bg",
    `linear-gradient(to bottom, rgba(0, 0, 0, 0), ${color1})`
  );

  if (
    currPlayerDisplaySection.classList.contains(
      "currPlayerDisplaySectionActive"
    )
  ) {
    themeColorFunc(color1);
  }
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

    document.body.classList.add("bodyStylesAdd");

    //
    currPlayerBackgroundColor();
  });
});
//
currPlayerDropDownCnt.addEventListener("click", () => {
  currPlayerDisplaySection.classList.remove("currPlayerDisplaySectionActive");
  themeColorFunc();
  document.body.classList.remove("bodyStylesAdd");
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
  //
  setTimeout(() => {
    // Update the current player (or UI) with the new song details
    updateCurrentPlayerCnt(
      currentSong.songTitle,
      currentSong.singer,
      currentSong.songCover,
      currentAudio
    );
    updatePageTitle();
    currPlayerBackgroundColor();
  }, 300);
  //
  showSongNotification(nowPlaying, currentAudio);
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

//
//
//
//
//
//
//
//

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
//

function showSongNotification(nowPlaying, audioElement) {
  if (!nowPlaying || Object.keys(nowPlaying).length === 0) {
    console.error("No song is currently playing.");
    return;
  }

  if (!("mediaSession" in navigator)) {
    console.warn("Media Session API not supported.");
  } else {
    // ✅ Set Metadata (Only Song Info)
    navigator.mediaSession.metadata = new MediaMetadata({
      title: nowPlaying.songTitle,
      artist: nowPlaying.singer,
      artwork: [
        { src: nowPlaying.songCover, sizes: "512x512", type: "image/png" },
      ],
    });

    // ✅ Play Button
    navigator.mediaSession.setActionHandler("play", () => {
      audioElement.play();
      isPlaying = true;
      updatePlayIcon();
    });

    // ✅ Pause Button
    navigator.mediaSession.setActionHandler("pause", () => {
      audioElement.pause();
      isPlaying = false;
      updatePlayIcon();
    });
  }

  // ✅ Show Web Notification (Only Song Info)
  if (Notification.permission === "granted") {
    new Notification(nowPlaying.songTitle, {
      body: nowPlaying.singer,
      icon: nowPlaying.songCover,
    });
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        new Notification(nowPlaying.songTitle, {
          body: nowPlaying.singer,
          icon: nowPlaying.songCover,
        });
      }
    });
  }
}

//
//
//
//
//
//

// slefCalling function to add elements in the page
(function () {
  if (window.innerWidth > 768) {
    let element = document.createElement("h3");
    element.textContent = "Your Library";
    document.querySelector(".listsSection").prepend(element);
    element.style.padding = "12px 0";
    //
    let currPlayerDropDownCnt = document.querySelector(
      ".currPlayerDropDownCnt"
    );
    currPlayerDropDownCnt.innerHTML = `
    <svg data-encore-id="icon" role="img" aria-hidden="true" class="e-9640-icon" viewBox="0 0 24 24"><path d="M21.707 2.293a1 1 0 0 1 0 1.414L17.414 8h1.829a1 1 0 0 1 0 2H14V4.757a1 1 0 1 1 2 0v1.829l4.293-4.293a1 1 0 0 1 1.414 0zM2.293 21.707a1 1 0 0 1 0-1.414L6.586 16H4.757a1 1 0 0 1 0-2H10v5.243a1 1 0 0 1-2 0v-1.829l-4.293 4.293a1 1 0 0 1-1.414 0z"></path></svg>
    `;
  }
})();

async function fetchWikiImage(artistName) {
  let url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
    artistName
  )}`;

  let response = await fetch(url);
  let data = await response.json();

  //
  let artistImageCnt = document.querySelector(".artistImageCnt");
  let artistBioName = document.querySelector(".artistBioName");
  let artistBioBottomSingerName = document.querySelector(
    ".artistBioBottomSingerName"
  );

  //removeingItems on no image found are
  let artistBioBottomCnt = document.querySelector(".artistBioBottomCnt");
  //
  if (data.thumbnail) {
    artistImageCnt.classList.remove("artistImageNotFound");
    artistBioBottomCnt.classList.remove("artistImageNotFound");

    artistImageCnt.style.backgroundImage = `url("${data.thumbnail.source}")`; // ✅ FIXED
    artistBioName.innerHTML = artistName;
    artistBioBottomSingerName.innerHTML = artistName;
  } else {
    artistImageCnt.classList.add("artistImageNotFound");
    artistBioBottomCnt.classList.add("artistImageNotFound");

    artistBioName.innerHTML = artistName;
  }
}

async function fetchLyricsApi(songName, singerName) {
  let apiUrl = `https://api.lyrics.ovh/v1/${singerName}/${songName}`;
  //
  let currPlayerLyricsCnt = document.querySelector(".currPlayerLyricsCnt");
  let lyricsCnt = document.querySelector(".lyricsCnt");

  try {
    let response = await fetch(apiUrl);
    let data = await response.json();

    if (data.lyrics) {
      currPlayerLyricsCnt.style.display = "flex";
      lyricsCnt.innerHTML = `${data.lyrics}`;
    } else {
      currPlayerLyricsCnt.style.display = "none";
    }
  } catch (error) {
    console.error("Error fetching lyrics:", error);
  }
}

let fullScreenLyricsBtn = document.querySelector(".fullScreenLyricsBtn");
fullScreenLyricsBtn.addEventListener("click", lyricsFullScreen);
let hideLyricsCntSvgCnt = document.querySelector(".hideLyricsCntSvgCnt");
hideLyricsCntSvgCnt.addEventListener("click", hideLyricsFullScreen);

function lyricsFullScreen() {
  fullScreenLyricsBtn.style.display = "none";

  let currPlayerLyricsCnt = document.querySelector(".currPlayerLyricsCnt");
  // currPlayerLyricsCnt.style.transform = "translateY(-100%)";
  currPlayerLyricsCnt.style.scale = "0";
  setTimeout(() => {
    currPlayerLyricsCnt.classList.add("currPlayerLyricsCntActive");
    // currPlayerLyricsCnt.style.transform = "";
    currPlayerLyricsCnt.style.scale = "";
  }, 300);

  //
  currPlayerDisplaySection.style.overflow = "hidden";
  currPlayerDisplaySection.scrollTop = 0;
  //
  let currPlayerH3 = document.querySelector(".currPlayerLyricsCnt h3");
  currPlayerH3.style.display = "none";
  //
  currPlayerLyricsHeader = document.querySelector(".currPlayerLyricsHeader");
  currPlayerLyricsHeader.classList.add("currPlayerLyricsHeaderActive");
  //
  let lyricsCnt = document.querySelector(".lyricsCnt");
  lyricsCnt.classList.add("lyricsCntActive");
  lyricsCnt.style.setProperty("--after-bg", "transparent");
}
function hideLyricsFullScreen() {
  fullScreenLyricsBtn.style.display = "";

  let currPlayerLyricsCnt = document.querySelector(".currPlayerLyricsCnt");
  currPlayerLyricsCnt.style.transform = "translateY(100%)";
  setTimeout(() => {
    currPlayerLyricsCnt.classList.remove("currPlayerLyricsCntActive");
    currPlayerLyricsCnt.style.transform = "";
  }, 300);
  //
  currPlayerDisplaySection.style.overflow = "";
  currPlayerDisplaySection.scrollTop = 0;
  //
  let currPlayerH3 = document.querySelector(".currPlayerLyricsCnt h3");
  currPlayerH3.style.display = "";
  //
  currPlayerLyricsHeader = document.querySelector(".currPlayerLyricsHeader");
  currPlayerLyricsHeader.classList.remove("currPlayerLyricsHeaderActive");
  //
  let lyricsCnt = document.querySelector(".lyricsCnt");
  lyricsCnt.classList.remove("lyricsCntActive");

  currPlayerBackgroundColor();
}
