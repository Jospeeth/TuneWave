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
const audioSlider = document.getElementById('audio-slider');

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


audio.addEventListener('loadedmetadata', () => {
    audioSlider.max = audio.duration;
});

audio.addEventListener('timeupdate', () => {
  audioSlider.value = audio.currentTime;
  // const minTime= document.getElementById("min-time-music");
  // minTime.textContent = Math.floor(audio.currentTime)
    
});

audioSlider.addEventListener('input', () => {
    audio.currentTime = audioSlider.value;
});

playButton.addEventListener("click", handlePlayButtonClick);
playButton1.addEventListener("click", handlePlayButtonClick);