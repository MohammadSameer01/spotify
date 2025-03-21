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
      currPlayerDisplaySection.style.transition = `none`;
      currPlayerDisplaySection.style.height = `100vh`;
      currPlayerDisplaySection.style.overflow = `hidden`;

      currPlayerDisplaySection.style.top = `${totalY}px`;
    }
  }
});

currPlayerDisplaySection.addEventListener("touchend", () => {
  currPlayerDisplaySection.style.transition = `all .3s ease`;
  currPlayerDisplaySection.style.height = ` `;
  currPlayerDisplaySection.style.overflow = `auto`;
  if (isSwiping) {
    if (totalY >= 80) {
      currPlayerDisplaySection.classList.remove(
        "currPlayerDisplaySectionActive"
      );
      themeColorFunc();
      document.body.classList.remove("bodyStylesAdd");
      hideLyricsFullScreen();
      setTimeout(() => {
        currentPlayerCnt.classList.add("currentPlayerCntActive");
      }, 200);
    }

    currPlayerDisplaySection.style.top = "0px"; // Reset position
  }

  // Reset all swipe-related values
  startY = 0;
  currentY = 0;
  totalY = 0;
  isSwiping = false;
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

//
//
//
//
// -------------To prevent broswer navigation on back gesture---------------------------------
// Push a dummy state to history so we can detect the back action
history.pushState({ page: "custom", scrollY: window.scrollY }, "", "");
// Listen for the back button or swipe gesture
window.addEventListener("popstate", (event) => {
  if (
    currPlayerDisplaySection.classList.contains(
      "currPlayerDisplaySectionActive"
    )
  ) {
    // Save the current scroll position
    const scrollPosition = window.scrollY;

    // Instead of going back, remove the class
    currPlayerDisplaySection.classList.remove("currPlayerDisplaySectionActive");

    themeColorFunc();
    document.body.classList.remove("bodyStylesAdd");
    hideLyricsFullScreen();
    setTimeout(() => {
      currentPlayerCnt.classList.add("currentPlayerCntActive");
    }, 200);

    // Push the state again so back gesture doesn't exit the app
    history.pushState({ page: "custom", scrollY: scrollPosition }, "", "");

    // Restore the scroll position after a small delay
    setTimeout(() => {
      window.scrollTo(0, scrollPosition);
    }, 10);

    // Prevent default navigation
    event.preventDefault();
  }
});
