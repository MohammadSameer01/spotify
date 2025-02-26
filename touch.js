let startY = 0,
  currentY = 0,
  totalY = 0,
  isSwiping = false;

// Detect when user starts touching
currPlayerDisplaySection.addEventListener("touchstart", (e) => {
  if (e.touches.length === 1) {
    startY = e.touches[0].clientY;
    isSwiping = false; // Reset swipe detection
  }
});

// Detect movement
currPlayerDisplaySection.addEventListener("touchmove", (e) => {
  if (e.touches.length === 1) {
    currentY = e.touches[0].clientY;
    totalY = currentY - startY;

    const isScrollingDown = totalY > 0; // User is swiping down
    const isAtTop = currPlayerDisplaySection.scrollTop === 0; // User is at top

    if (isScrollingDown && isAtTop) {
      // Only start swiping if at the top and moving downward
      isSwiping = true;
      e.preventDefault(); // Prevent page scroll
      currPlayerDisplaySection.style.top = `${totalY}px`;
    }
  }
});

// End touch event
currPlayerDisplaySection.addEventListener("touchend", () => {
  if (isSwiping) {
    if (totalY >= 120) {
      // Hide if swiped far enough
      currPlayerDisplaySection.classList.remove(
        "currPlayerDisplaySectionActive"
      );
      currPlayerDisplaySection.style.top = `0px`;

      //
      //
      themeColorFunc();
      document.body.classList.remove("bodyStylesAdd");
      setTimeout(() => {
        currentPlayerCnt.classList.add("currentPlayerCntActive");
      }, 200);
    } else {
      // Snap back if not enough swipe distance
      currPlayerDisplaySection.style.top = `0px`;
    }
  }
});
