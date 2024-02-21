import {
  handlePlayButtonClick,
  pauseSong,
  playNextSong,
  playPreviousSong,
  shuffle,
  setPlayerDisplay,
  highlightCurrentSong,
  setPlayButtonAccessibleText,
  getCurrentSongIndex,
} from "./app.js";

import {
  playButton1,
  playButton,
  pauseButton,
  nextButton,
  previousButton,
  shuffleButton,
  audio,
  userData

} from "./constants.js";
pauseButton.addEventListener("click", pauseSong);

nextButton.addEventListener("click", playNextSong);

previousButton.addEventListener("click", playPreviousSong);

shuffleButton.addEventListener("click", shuffle);

audio.addEventListener("ended", () => {
  const currentSongIndex = getCurrentSongIndex();
  const nextSongExists = userData?.songs[currentSongIndex + 1] !== undefined;

  if (nextSongExists) {
    playNextSong();
  } else {
    userData.currentSong = null;
    userData.songCurrentTime = 0;
    pauseSong();
    setPlayerDisplay();
    highlightCurrentSong();
    setPlayButtonAccessibleText();
  }
});

playButton.addEventListener("click", handlePlayButtonClick);
playButton1.addEventListener("click", handlePlayButtonClick);