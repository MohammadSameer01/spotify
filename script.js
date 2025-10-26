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

  let userName = localStorage.getItem("userName");

  if (userName != null) {
    greetingsText.innerHTML = `Good ${wish} <span>${userName}</span>`;
  } else {
    greetingsText.innerHTML = `Spotify`;
  }

  return wish;
}
greetingTextFunction();
// 
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
      const sanitizedSongTitle = songTitle.replace(/\s+/g, "");
      const currentAudioUrl = `assets/songs/${sanitizedSongTitle}.mp3`;
      currentAudio = new Audio(currentAudioUrl);

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
        currentAudio,
        currentSong.isLiked
      );
      updatePageTitle();

      // Example: Call the function when a song starts playing
      showSongNotification(nowPlaying, currentAudio);

      songBoxStyling();
    } else {
      alert("Song not found.");
    }
    updateVideoBackground();
    currentAudio.addEventListener("ended", () => {
      songChangeAnimationRight();
      playNextSong();
    });
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
  playingSong,
  currentSongIsLiked
) {
  if (currentSongIsLiked === true) {
    likedSongIconStyles(true);
  } else {
    likedSongIconStyles(false);
  }

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
  updateVideoBackground();
}
// 
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
    if (videoSongs.includes(nowPlaying.songTitle)) {
      themeColorFunc('#000');
    } else {
      themeColorFunc(color1);
    }
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
  }, 300);
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

function playNextSong(currentIndex) {
  let songs = Object.keys(songsObject);
  currentIndex = songs.findIndex(
    key => songsObject[key].songTitle === nowPlaying.songTitle
  );

  // Move to next index (loop back to start if at the end)
  let nextIndex = (currentIndex + 1) % songs.length;
  const nextKey = songs[nextIndex];
  let newSong = songsObject[nextKey];

  if (currentAudio && !currentAudio.paused) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  currentSong = newSong;
  nowPlaying = newSong;

  let sanitizedSongTitle = currentSong.songTitle.replace(/\s+/g, "");
  const currentAudioUrl = `assets/songs/${sanitizedSongTitle}.mp3`;

  currentAudio = new Audio(currentAudioUrl);

  currentAudio.addEventListener("canplaythrough", () => {
    currentAudio.play();
    isPlaying = true;
    updatePlayIcon();
  });

  currPlayerDetailsVisibility();
  updateSongTime(currentAudio);

  setTimeout(() => {
    updateCurrentPlayerCnt(
      currentSong.songTitle,
      currentSong.singer,
      currentSong.songCover,
      currentAudio,
      currentSong.isLiked
    );
    updatePageTitle();
    currPlayerBackgroundColor();
    songBoxStyling();
  }, 300);

  showSongNotification(nowPlaying, currentAudio);
  hideLyricsFullScreen();

  currentAudio.addEventListener("ended", () => {
    songChangeAnimationRight();
    playNextSong();
  });
}
function playPreviousSong() {
  // Get all songs
  let songs = Object.keys(songsObject);

  // Find the currently playing song index
  let currentIndex = songs.findIndex(
    key => songsObject[key].songTitle === nowPlaying.songTitle
  );

  // 🧠 Check how long the current song has been playing
  if (currentAudio && currentAudio.currentTime >= 10) {
    // If the song has played for 10s or more, just restart it
    currentAudio.currentTime = 0;
    currentAudio.play(); // restart playback
    isPlaying = true;
    updatePlayIcon();
    return; // Stop the function here (don’t change songs)
  }

  // Otherwise, go to the previous song (loop to last if at start)
  let prevIndex = (currentIndex - 1 + songs.length) % songs.length;
  const prevKey = songs[prevIndex];
  let newSong = songsObject[prevKey];

  // Stop and reset the current audio
  if (currentAudio && !currentAudio.paused) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  // Update song state
  currentSong = newSong;
  nowPlaying = newSong;

  // Sanitize song title to create the file URL
  let sanitizedSongTitle = currentSong.songTitle.replace(/\s+/g, "");
  const currentAudioUrl = `assets/songs/${sanitizedSongTitle}.mp3`;

  // Create and prepare new Audio
  currentAudio = new Audio(currentAudioUrl);

  // When the audio can play, start it
  currentAudio.addEventListener("canplaythrough", () => {
    currentAudio.play();
    isPlaying = true;
    updatePlayIcon();
  });

  // Update UI and player state
  currPlayerDetailsVisibility();
  updateSongTime(currentAudio);

  // Slight delay before updating visual details
  setTimeout(() => {
    updateCurrentPlayerCnt(
      currentSong.songTitle,
      currentSong.singer,
      currentSong.songCover,
      currentAudio,
      currentSong.isLiked
    );
    updatePageTitle();
    currPlayerBackgroundColor();
    songBoxStyling();
  }, 300);

  // Show notification and reset lyric screen
  showSongNotification(nowPlaying, currentAudio);
  hideLyricsFullScreen();

  // When this song ends, play the next one
  currentAudio.addEventListener("ended", () => {
    songChangeAnimationRight();
    playNextSong();
  });
}
let changeSongClass = document.querySelectorAll(".changeSongClass");
changeSongClass.forEach((btn) => {
  btn.addEventListener("click", () => {

    if (btn.classList.contains("leftSongChangeButton")) {
      if (currentAudio.currentTime <= 10) {
        songChangeAnimationLeft();
      }
      playPreviousSong();
    } else {
      songChangeAnimationRight();
      playNextSong();
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
  artistName = artistName.split(",");
  firstArtist = artistName[0];
  let url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
    firstArtist
  )}`;

  let response = await fetch(url);
  let data = await response.json();

  //
  let artistImageCnt = document.querySelector(".artistImageCnt");
  let artistBioName = document.querySelector(".artistBioName");
  let artistBioBottomSingerName = document.querySelector(
    ".artistBioBottomSingerName"
  );

  artistFollowFunc(firstArtist);

  //removeingItems on no image found are
  let artistBioBottomCnt = document.querySelector(".artistBioBottomCnt");
  //
  if (data.thumbnail) {
    artistImageCnt.classList.remove("artistImageNotFound");
    artistBioBottomCnt.classList.remove("artistImageNotFound");

    artistImageCnt.style.backgroundImage = `url("${data.thumbnail.source}")`; // ✅ FIXED
    artistBioName.innerHTML = firstArtist;
    artistBioBottomSingerName.innerHTML = firstArtist;
  } else {
    artistImageCnt.classList.add("artistImageNotFound");
    artistBioBottomCnt.classList.add("artistImageNotFound");

    artistBioName.innerHTML = firstArtist;
  }
}

async function fetchLyricsApi(songName, singerName) {
  singerName = singerName.split(",");
  firstSinger = singerName[0];
  let apiUrl = `https://api.lyrics.ovh/v1/${firstSinger}/${songName}`;
  //
  let currPlayerLyricsCnt = document.querySelector(".currPlayerLyricsCnt");
  let lyricsCnt = document.querySelector(".lyricsCnt");

  try {
    let response = await fetch(apiUrl);
    let data = await response.json();

    if (data.lyrics) {
      currPlayerLyricsCnt.style.display = "flex";
      lyricsCnt.innerHTML = data.lyrics.replace(/\n/g, "<br>");
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
let aboutArtistCnt = document.querySelector('.aboutArtistCnt')

function lyricsFullScreen() {
  fullScreenLyricsBtn.style.display = "none";

  let currPlayerLyricsCnt = document.querySelector(".currPlayerLyricsCnt");
  // currPlayerLyricsCnt.style.transform = "translateY(-100%)";
  currPlayerLyricsCnt.style.scale = "0";
  aboutArtistCnt.classList.add("aboutArtistCntHide");
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

  if (
    window.matchMedia(
      "(min-width: 320px) and (max-width: 480px) and (min-height: 480px) and (max-height: 940px) and (orientation: portrait)"
    ).matches
  ) {
    let songRangeCnt = document.querySelector(".songRangeCnt");
    songRangeCnt.classList.add("songRangeCntActive");

    let cdPlayPauseBtn = document.querySelector(".cdPlayPauseBtn ");
    cdPlayPauseBtn.classList.add("cdPlayPauseBtnActive");

    let currPlayerMiddleCnt = document.querySelector(".currPlayerMiddleCnt");
    currPlayerMiddleCnt.classList.add("currPlayerMiddleCntActive");

    //
    lyricsCnt.classList.add("lyricsCntForMobile");
    currPlayerLyricsHeader.classList.add("currPlayerLyricsHeaderForMobile");
  }
}
function hideLyricsFullScreen() {
  fullScreenLyricsBtn.style.display = "";
  aboutArtistCnt.classList.remove("aboutArtistCntHide");


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

  let songRangeCnt = document.querySelector(".songRangeCnt");
  songRangeCnt.classList.remove("songRangeCntActive");
  let audioPlayPauseControlsCnt = document.querySelector(
    ".audioPlayPauseControlsCnt"
  );

  let currPlayerMiddleCnt = document.querySelector(".currPlayerMiddleCnt");
  currPlayerMiddleCnt.classList.remove("currPlayerMiddleCntActive");

  //
  let cdPlayPauseBtn = document.querySelector(".cdPlayPauseBtn ");
  cdPlayPauseBtn.classList.remove("cdPlayPauseBtnActive");
  //

  lyricsCnt.classList.remove("lyricsCntForMobile");

  //
  currPlayerBackgroundColor();
}

let artistBioFollowBtn = document.querySelector(".artistBioFollowBtn");
document.addEventListener("DOMContentLoaded", function () {
  const followButtons = document.querySelectorAll(".artistBioFollowBtn");

  // Your nested object example
  let songs = songsObject;

  followButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const singerName = document
        .querySelector(".cdSingerName")
        ?.innerHTML.trim()
        .split(",")[0];

      if (!singerName) return;

      // Update all matching singers
      for (let key in songs) {
        if (songs[key].singer.split(",")[0] === singerName) {
          songs[key].isFollow = !songs[key].isFollow; // Toggle value
          artistFollowFunc(singerName);
        }
      }
    });
  });
});

for (let key in songsObject) {
  let s = songsObject[key];
  s.isFollow = false;
  s.isLiked = false;
}

function artistFollowFunc(artistName) {
  for (let key in songsObject) {
    let firstSinger = songsObject[key].singer.split(",")[0];
    if (firstSinger === artistName) {
      if (songsObject[key].isFollow == true) {
        artistBioFollowBtn.innerText = "Following";
      } else {
        artistBioFollowBtn.innerText = "Follow";
      }
    }
  }
}
//
//
//
//
//
//
function songBoxStyling() {
  setTimeout(() => {
    // Get the currently open song title
    let openSongTitle = document
      .querySelector(".openCurrSongClass .songTitle")
      ?.innerText.trim();

    if (openSongTitle) {
      // Loop through all .song elements
      document.querySelectorAll(".song").forEach((song) => {
        let songTitle = song.querySelector(".songTitle")?.innerText.trim();

        // Check if the titles match
        if (songTitle === openSongTitle) {
          song.querySelector(".songTitle").style.color = "#1ED760";
        } else {
          song.querySelector(".songTitle").style.color = "";
        }
      });
    }
  }, 100);
}

//
//
//
let likeSongButtons = document.querySelectorAll(".likeSongButton");
likeSongButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    toggleSongLike();
  });
});
function toggleSongLike() {
  let songTitle = document.querySelector(
    ".currentPlayerCnt .songTitle"
  ).textContent;
  let arrayOfSongs = Object.values(songsObject);

  arrayOfSongs.find((key) => {
    if (key.songTitle === songTitle) {
      if (key.isLiked === false) {
        key.isLiked = true;
        likedSongIconStyles(true);
      } else {
        key.isLiked = false;
        likedSongIconStyles(false);
      }
    }
  });
  console.log(songsObject);
}

function likedSongIconStyles(like) {
  likeSongButtons.forEach((icon) => {
    if (like === true) {
      icon.innerHTML = `<svg class = "greenSvg" data-encore-id="icon" role="img" aria-hidden="true" class="e-9640-icon" viewBox="0 0 24 24"><path d="M8.667 1.912a6.257 6.257 0 0 0-7.462 7.677c.24.906.683 1.747 1.295 2.457l7.955 9.482a2.015 2.015 0 0 0 3.09 0l7.956-9.482a6.188 6.188 0 0 0 1.382-5.234l-.49.097.49-.099a6.303 6.303 0 0 0-5.162-4.98h-.002a6.24 6.24 0 0 0-5.295 1.65.623.623 0 0 1-.848 0 6.257 6.257 0 0 0-2.91-1.568z"></path></svg>`;
      //
      icon.style.animation = `likedSongAnimation .3s ease`;
    } else {
      icon.innerHTML = `<svg data-encore-id="icon" role="img" aria-hidden="true" class="e-9640-icon" viewBox="0 0 24 24">
              <path d="M5.21 1.57a6.757 6.757 0 0 1 6.708 1.545.124.124 0 0 0 .165 0 6.741 6.741 0 0 1 5.715-1.78l.004.001a6.802 6.802 0 0 1 5.571 5.376v.003a6.689 6.689 0 0 1-1.49 5.655l-7.954 9.48a2.518 2.518 0 0 1-3.857 0L2.12 12.37A6.683 6.683 0 0 1 .627 6.714 6.757 6.757 0 0 1 5.21 1.57zm3.12 1.803a4.757 4.757 0 0 0-5.74 3.725l-.001.002a4.684 4.684 0 0 0 1.049 3.969l.009.01 7.958 9.485a.518.518 0 0 0 .79 0l7.968-9.495a4.688 4.688 0 0 0 1.049-3.965 4.803 4.803 0 0 0-3.931-3.794 4.74 4.74 0 0 0-4.023 1.256l-.008.008a2.123 2.123 0 0 1-2.9 0l-.007-.007a4.757 4.757 0 0 0-2.214-1.194z"></path>
            </svg>`;
      //
      icon.style.animation = `disLikedSongAnimation .3s ease`;
    }
  });
}

//
//
//
//
let themeChangerCnt = document.querySelector(".theme-changer-cnt");
themeChangerCnt.addEventListener("click", () => {
  let root = document.documentElement;
  let currentBg = getComputedStyle(root)
    .getPropertyValue("--backgroundColor")
    .trim();

  if (currentBg === "#121212") {
    root.style.setProperty("--backgroundColor", "#fff");
    root.style.setProperty("--textColor", "#121212");
    root.style.setProperty("--bodyBgOnTouchMove", "#f1f1f1");
  } else {
    root.style.setProperty("--backgroundColor", "#121212");
    root.style.setProperty("--textColor", "#fff");
    root.style.setProperty("--bodyBgOnTouchMove", "#000");
  }
  //
  themeColorFunc();
});

document.querySelector(".logoContainer").addEventListener("click", () => {
  window.location.href = "";
});
// 
// 
function checkUserName() {
  const storedName = localStorage.getItem("userName");
  const modal = document.getElementById("nameModal");
  const input = document.querySelector(".modal-content input");
  const button = document.querySelector(".modal-content button");
  const message = document.querySelector(".modal-content p");

  if (!storedName) {
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
    // Reset modal state
    input.style.display = 'block';
    button.style.display = 'inline-block';
    input.value = '';
    message.textContent = "Enter your username...";
  }
}

function saveUserName() {
  const input = document.getElementById("userNameInput");
  const name = input.value.trim();
  const button = document.getElementById("saveNameBtn");
  const messageDisplayer = document.querySelector("#nameModal > div > p")
  if (name && name.length !== 0) {
    if (name.length <= 15) {
      localStorage.setItem("userName", name);
      const message = document.querySelector(".modal-content p");
      message.innerHTML = `<b>${name}</b> — your name has been saved successfully!`;
      document.querySelector('.modal-content input').style.display = 'none';
      document.querySelector('.modal-content button').style.display = 'none';

      setTimeout(() => {
        const modal = document.getElementById("nameModal");
        modal.classList.add("hide");
        setTimeout(() => {
          modal.style.display = "none";
          modal.classList.remove("hide");
        }, 300);

        document.body.style.overflow = "auto";
        button.innerText = 'Save';
        input.value = '';
        button.disabled = false;
      }, 1200);
      greetingTextFunction();
    } else {
      messageDisplayer.innerText = `Name cannot exceed more than 15 characters`;
      messageDisplayer.style.color = 'red'
      button.innerText = "Save";
      button.disabled = false;
      setTimeout(() => {
        messageDisplayer.innerText = 'Try again with new username not exceeding 15 characters...';
        messageDisplayer.style.color = '';
      }, 2000);
    }
  } else {
    messageDisplayer.textContent = 'Re-try again with another username'
    input.value = '';
    button.disabled = false;
    button.innerText = 'Save';
  }
}

// ✅ Attach the click listener only once
document.getElementById("saveNameBtn").addEventListener("click", (event) => {
  const button = event.target;
  button.disabled = true;
  button.innerText = 'Saving...';
  setTimeout(saveUserName, 600);
});

window.addEventListener("load", checkUserName);

// 
// 
// 
const footerIconsCnt = document.querySelectorAll(".footerIconsCnt > div");
footerIconsCnt.forEach((footerButton) => {
  footerButton.addEventListener("click", function () {
    switch (this.id) {
      case "search-footer-icon":
        searchInterfaceFunction();
        break;
      case "library-footer-icon":
        libraryInterfaceFunction();
        break;
      case "premium-footer-icon":
        premiumInterfaceFunction();
        break;
      case "home-footer-icon":
        if (isSearchActive === true) {
          closeSearchInterface();
        } else if (isLibraryActive === true) {
          closeLibraryInterface()
        } else if (isPremiumActive === true) {
          closePremiumInterface();
        }

        // ✅ Remove all search, library, and premium containers (only if they exist)
        const uiContainers = document.querySelectorAll(".libraryContainer, .premiumContainer, .searchContainer");

        if (uiContainers.length > 0) {
          uiContainers.forEach(el => el.remove());
        }


        document.body.style.overflow = '';
        document.querySelector("main").style.visibility = `visible`;
        document.querySelector("main").style.transform = ``;
        themeColorFunc("");
        break;
      default:
        document.body.style.background = "white"; // fallback
    }
  });
});
// 
let isSearchActive = isLibraryActive = isPremiumActive = false;
// 
function searchInterfaceFunction() {
  if (isSearchActive === false) {
    let searchContainer = document.createElement("div")
    searchContainer.setAttribute("class", "searchContainer");
    // 
    const searchCntHeader = document.createElement("h2")
    searchCntHeader.setAttribute("class", "searchContainerHeading")
    searchCntHeader.textContent = "Search"
    // 
    const searchBar = document.createElement("input");
    searchBar.setAttribute("type", 'search');
    searchBar.setAttribute("placeholder", 'What do you want to listen to?');
    searchBar.setAttribute("class", "searchInput");
    // 
    const dummyImage = document.createElement("img");
    dummyImage.setAttribute("src", "assets/img/searchImageOne.png");
    dummyImage.setAttribute("loading", "lazy")
    // 
    searchContainer.append(searchCntHeader, searchBar, dummyImage)
    document.body.append(searchContainer);
    // 
    isSearchActive = true;
    addMainTransition();
    closePremiumInterface();
    closeLibraryInterface();

    themeColorFunc("#121212");
  }
}
function libraryInterfaceFunction() {
  if (isLibraryActive === false) {
    let libraryContainer = document.createElement("div")
    libraryContainer.setAttribute("class", "libraryContainer");
    // 
    const message = document.createElement("p");
    message.setAttribute("class", "library-message");
    message.innerHTML = "<div>Nothing here!</div><span>Keep browsing to create your library<span>";
    // 
    libraryContainer.append(message);
    document.body.append(libraryContainer);
    // 
    isLibraryActive = true;
    addMainTransition();
    closeSearchInterface();
    closePremiumInterface();

    themeColorFunc("");
  }
}
function premiumInterfaceFunction() {
  if (isPremiumActive === false) {
    let premiumContainer = document.createElement("div")
    premiumContainer.setAttribute("class", "premiumContainer");
    // 
    const premiumImageCnt = document.createElement("div");
    premiumImageCnt.setAttribute("class", "premiumImageCnt");
    const img = document.createElement('img');
    img.setAttribute("src", "assets/img/premiumScreenshot.png");
    img.setAttribute("loading", "lazy");
    premiumImageCnt.append(img);
    // 
    premiumContainer.append(premiumImageCnt);
    //
    document.body.append(premiumContainer);
    // 
    isPremiumActive = true;
    addMainTransition();
    closeSearchInterface();
    closeLibraryInterface();

    themeColorFunc("#000");
  }
}
// 
function closeSearchInterface() {
  if (isSearchActive === true) {
    let searchCnt = document.querySelector(".searchContainer")
    searchCnt.style.transform = `translate(-${window.innerWidth}px)`;
    isSearchActive = false;
  }
}
function closeLibraryInterface() {
  if (isLibraryActive === true) {
    let libraryCnt = document.querySelector(".libraryContainer")
    libraryCnt.style.transform = `translate(-${window.innerWidth}px)`;
    isLibraryActive = false;
  }
}
function closePremiumInterface() {
  if (isPremiumActive === true) {
    let premiumCnt = document.querySelector(".premiumContainer")
    premiumCnt.style.transform = `translate(-${window.innerWidth}px)`;
    isPremiumActive = false
  }
}
// 
function addMainTransition() {
  document.body.style.overflow = 'hidden';
  document.querySelector("main").style.visibility = 'hidden';
  document.querySelector("main").style.transform = `translateX(-${window.innerWidth}px)`;
}
// 
// 
// Listen for orientation change or resize event
window.addEventListener("orientationchange", handleOrientationChange);
window.addEventListener("resize", handleOrientationChange);
function handleOrientationChange() {
  // Check current orientation
  const isHorizontal = window.matchMedia("(orientation: landscape)").matches;

  // If horizontal and any flag is true, reload the page
  if (isHorizontal && (isSearchActive || isLibraryActive || isPremiumActive)) {
    location.reload();
  }
}
// 
// Set the CSS variable to the current window width
function updateFooterAnimationStart() {
  const root = document.documentElement;
  document.documentElement.style.setProperty('--footer-start-x', `${window.innerWidth}px`);
}
updateFooterAnimationStart();
window.addEventListener('resize', updateFooterAnimationStart);



