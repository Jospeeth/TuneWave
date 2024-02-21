import { allSongs } from "./songs.js";
const playlistSongs = document.getElementById("playlist-songs");
const playButton = document.getElementById("play");
const playButton1 = document.getElementById("play-1");

const pauseButton = document.getElementById("pause");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");
const shuffleButton = document.getElementById("shuffle");
const audio = new Audio();

let userData = {
  songs: [...allSongs],
  currentSong: null,
  songCurrentTime: 0,
};

export {
  playButton1,
  playlistSongs,
  playButton,
  pauseButton,
  nextButton,
  previousButton,
  shuffleButton,
  audio,
  userData,
};
