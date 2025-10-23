function updateVideoBackground() {
    // List of songs that have video backgrounds


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

        // Use the matched song name to create the video src path
        // Assuming your video files are named exactly as the song title with no spaces or special chars
        // So you might want to sanitize the song title to match your file naming
        const sanitizedFileName = matchedSong.replace(/[^a-zA-Z0-9]/g, '') + '.mp4'; // Removes spaces and special chars
        videoBackground.src = 'assets/videos/' + sanitizedFileName;
        console.log(sanitizedFileName)

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
        if (songCover) {
            songCover.style.visibility = 'hidden';
        }

        videoBackground.classList.add('videoBackgroundActive');
    } else {
        // Show the song cover if video is removed
        const songCover = currPlayerDisplaySection.querySelector(".currPlayerSongCoverCnt");
        if (songCover) {
            songCover.style.visibility = '';
        }

        // Remove video and gradient if they exist
        const existingVideoBg = currPlayerDisplaySection.querySelector('.videoBgCnt');
        if (existingVideoBg) existingVideoBg.remove();

        const existingGradient = currPlayerDisplaySection.querySelector('.videoBgGradient');
        if (existingGradient) existingGradient.remove();
    }
}
const videoSongs = [
    'Saiyaara',
    'Saiyaara Reprise - Female',
    'Ishq',
];