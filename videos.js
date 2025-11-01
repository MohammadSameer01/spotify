function updateVideoBackground() {
    // Only run on mobile devices
    if (!/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        restoreSongCover();
        return;
    }

    // Only run in portrait mode
    if (window.matchMedia("(orientation: portrait)").matches === false) {
        restoreSongCover();
        return;
    }

    // Remove any existing video background and gradient if present
    const existingVideoBg = currPlayerDisplaySection.querySelector('.videoBgCnt');
    if (existingVideoBg) existingVideoBg.remove();

    const existingGradient = currPlayerDisplaySection.querySelector('.videoBgGradient');
    if (existingGradient) existingGradient.remove();

    // Check if the current song is in the list
    const matchedSong = videoSongs.find(song => song === nowPlaying.songTitle);

    if (matchedSong) {
        // Create video element
        const videoBackground = document.createElement('video');
        videoBackground.classList.add('videoBgCnt');

        // Sanitize filename
        const sanitizedFileName = matchedSong.replace(/[^a-zA-Z0-9]/g, '') + '.mp4';
        videoBackground.src = 'assets/videos/' + sanitizedFileName;

        videoBackground.autoplay = true;
        videoBackground.loop = true;
        videoBackground.muted = true;
        videoBackground.playsInline = true;

        // Create gradient overlay div
        const gradientBg = document.createElement("div");
        gradientBg.classList.add('videoBgGradient');

        // Append video and gradient to container
        currPlayerDisplaySection.append(videoBackground, gradientBg);

        // Hide the song cover
        const songCover = currPlayerDisplaySection.querySelector(".currPlayerSongCoverCnt");
        if (songCover) songCover.style.visibility = 'hidden';
        videoBackground.classList.add('videoBackgroundActive');
    } else {
        restoreSongCover();
    }
}

// Helper function to restore cover and remove video
function restoreSongCover() {
    const songCover = currPlayerDisplaySection.querySelector(".currPlayerSongCoverCnt");
    if (songCover) songCover.style.visibility = '';

    const existingVideoBg = currPlayerDisplaySection.querySelector('.videoBgCnt');
    if (existingVideoBg) existingVideoBg.remove();

    const existingGradient = currPlayerDisplaySection.querySelector('.videoBgGradient');
    if (existingGradient) existingGradient.remove();
}
window.addEventListener("orientationchange", () => {
    // Re-run the function on orientation change
    setTimeout(() => {
        updateVideoBackground();
    }, 100); // slight delay to allow rotation layout to settle
});
// 
// 
// 
const videoSongs = [
    'Saiyaara',
    'Saiyaara Reprise - Female',
    'Ishq',
    'Faded',
    'Lovely',
    'Hymn for the Weekend',
    'Skyfall',
    'On My Way',
    'Let Me Love You',
    'Senorita',
    'See You Again',
    'FRIENDS',
    'No Lie',
    'Cheap Thrills',
    'GOAT',
    'Malang'
];