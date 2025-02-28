let startY = 0,
  currentY = 0,
  totalY = 0,
  isSwiping = false,
  isInsideLyrics = false;

currPlayerDisplaySection.addEventListener("touchstart", (e) => {
  if (e.touches.length === 1) {
    const targetElement = e.target;

    // If touch starts inside an input, do not handle swipe
    if (targetElement.tagName.toLowerCase() === "input") {
      isSwiping = false;
      return;
    }

    // Check if the touch event starts inside .currPlayerLyricsCnt
    isInsideLyrics = targetElement.closest(".currPlayerLyricsCnt") !== null;

    if (isInsideLyrics) {
      isSwiping = false; // Don't handle swipe if inside lyrics section
      return;
    }

    startY = e.touches[0].clientY;
    isSwiping = false; // Reset swipe detection
  }
});

currPlayerDisplaySection.addEventListener("touchmove", (e) => {
  if (e.touches.length === 1) {
    if (isInsideLyrics) {
      return; // Allow normal scrolling in .currPlayerLyricsCnt
    }

    const targetElement = e.target;

    // Prevent handling if inside an input
    if (targetElement.tagName.toLowerCase() === "input") {
      return;
    }

    currentY = e.touches[0].clientY;
    totalY = currentY - startY;

    const isScrollingDown = totalY > 0; // User is swiping down
    const isAtTop = currPlayerDisplaySection.scrollTop === 0; // User is at top

    if (isScrollingDown && isAtTop) {
      isSwiping = true;
      e.preventDefault(); // Prevent page scroll
      currPlayerDisplaySection.style.top = `${totalY}px`;
    }
  }
});

currPlayerDisplaySection.addEventListener("touchend", () => {
  if (isSwiping) {
    if (totalY >= 80) {
      // Hide if swiped far enough
      currPlayerDisplaySection.classList.remove(
        "currPlayerDisplaySectionActive"
      );
      currPlayerDisplaySection.style.top = `0px`;

      themeColorFunc();
      document.body.classList.remove("bodyStylesAdd");
      hideLyricsFullScreen();
      setTimeout(() => {
        currentPlayerCnt.classList.add("currentPlayerCntActive");
      }, 200);
    } else {
      // Snap back if not enough swipe distance
      currPlayerDisplaySection.style.top = `0px`;
    }
  }
});

//---------------  Small currentCnt song change scripts  ------------------------------------------
//---------------  Small currentCnt song change scripts  ------------------------------------------
//---------------  Small currentCnt song change scripts  ------------------------------------------
//---------------  Small currentCnt song change scripts  ------------------------------------------
//---------------  Small currentCnt song change scripts  ------------------------------------------
//---------------  Small currentCnt song change scripts  ------------------------------------------
//---------------  Small currentCnt song change scripts  ------------------------------------------
//---------------  Small currentCnt song change scripts  ------------------------------------------
//---------------  Small currentCnt song change scripts  ------------------------------------------
//---------------  Small currentCnt song change scripts  ------------------------------------------
//---------------  Small currentCnt song change scripts  ------------------------------------------
//---------------  Small currentCnt song change scripts  ------------------------------------------
//---------------  Small currentCnt song change scripts  ------------------------------------------
//---------------  Small currentCnt song change scripts  ------------------------------------------
let startX = 0,
  currentX = 0,
  totalX = 0;
const SWIPE_MIN_DISTANCE = 55;

const songNameAndTitle = document.querySelector(".swipeClass");

if (currentPlayerCnt) {
  currentPlayerCnt.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  document.addEventListener("touchmove", (e) => {
    if (!startX) return; // Prevent invalid swipes
    currentX = e.touches[0].clientX;
    totalX = currentX - startX;

    // Only apply transform if swiping right to left (totalX < 0)
    if (
      totalX < 0 &&
      Math.abs(totalX) <= SWIPE_MIN_DISTANCE &&
      songNameAndTitle
    ) {
      songNameAndTitle.style.transform = `translateX(${totalX}px)`;
    }
  });

  document.addEventListener("touchend", () => {
    if (!startX) return;

    // Only trigger action if swipe was right to left AND exceeded the threshold
    if (totalX < -SWIPE_MIN_DISTANCE) {
      navigator.vibrate(25);
      changeSongFunction();
      setTimeout(themeColorFunc, 300);
    }

    // Reset position smoothly
    if (songNameAndTitle) {
      songNameAndTitle.style.transition = "transform 0.2s ease-out";
      songNameAndTitle.style.transform = `translateX(0)`;

      setTimeout(() => {
        songNameAndTitle.style.transition = ""; // Reset transition
      }, 200);
    }

    startX = 0; // Reset values
    totalX = 0;
  });
}
