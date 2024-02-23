import { playlistSongs, playButton, audio, userData } from "./constants.js";

const playSong = (id) => {
  const song = userData?.songs.find((song) => song.id === id);
  audio.src = song.src;
  audio.title = song.title;

  if (userData?.currentSong === null || userData?.currentSong.id !== song.id) {
    audio.currentTime = 0;
  } else {
    audio.currentTime = userData?.songCurrentTime;
  }
  userData.currentSong = song;
  playButton.classList.add("playing");

  highlightCurrentSong();
  setPlayerDisplay();
  setPlayButtonAccessibleText();
  audio.play();
  function updateTime() {
    const currentTime = audio.currentTime;
   
}
setInterval(updateTime, 1000);
};

const pauseSong = () => {
  userData.songCurrentTime = audio.currentTime;

  playButton.classList.remove("playing");
  audio.pause();
};

const playNextSong = () => {
  const currentSongIndex = getCurrentSongIndex();
  const nextSong = userData?.songs[currentSongIndex + 1];
  if (userData?.currentSong === null) {
    playSong(userData?.songs[0].id);
  }
  else if(getCurrentSongIndex()!= userData?.songs.length-1){
    playSong(nextSong.id)

  } else {
    playSong(userData?.songs[0].id);

  }
};

const playPreviousSong = () => {
  if (userData?.currentSong === null) return;
  else {
    const currentSongIndex = getCurrentSongIndex();
    const previousSong = userData?.songs[currentSongIndex - 1];

    playSong(previousSong.id);
  }
};

const shuffle = () => {
  userData?.songs.sort(() => Math.random() - 0.5);
  userData.currentSong = null;
  userData.songCurrentTime = 0;

  playSong(userData?.songs[0].id)
  renderSongs(userData?.songs);
  setPlayerDisplay();
  setPlayButtonAccessibleText();
};



const setPlayerDisplay = () => {
  const playingSong = document.getElementById("player-song-title");
  const songArtist = document.getElementById("player-song-artist");
  const nextSong= document.getElementById("player-next-song-artist");
  const maxTime= document.getElementById("max-time-music");
  const currentSongIndex = getCurrentSongIndex();
  const nextSongTitle = userData?.songs[currentSongIndex + 1].title;
  const currentTitle = userData?.currentSong?.title;
  const currentArtist = userData?.currentSong?.artist;
  maxTime.textContent = userData?.currentSong?.duration

nextSong.textContent= nextSongTitle
  playingSong.textContent = currentTitle ? currentTitle : "";
  songArtist.textContent = currentArtist ? currentArtist : "";
};

const highlightCurrentSong = () => {
  const playlistSongElements = document.querySelectorAll(".playlist-song");
  const songToHighlight = document.getElementById(
    `song-${userData?.currentSong?.id}`
  );

  playlistSongElements.forEach((songEl) => {
    songEl.removeAttribute("aria-current");
  });

  if (songToHighlight) songToHighlight.setAttribute("aria-current", "true");
};

const renderSongs = (array) => {
  
  const songsHTML = array
    .map((song) => {
      return `
        <li id="song-${song.id}" class="playlist-song text-black bg-primary rounded-md p-2">
        <button class="playlist-song-info" id="song-toPlay-${song.id}" onchange="playSong(${song.id})">
            <span class="playlist-song-title">${song.title}</span>
            <span class="playlist-song-artist">${song.artist}</span>
            <span class="playlist-song-duration">${song.duration}</span>
        </button>
        </li>
        `;
    })
    .join("");
   

  playlistSongs.innerHTML = songsHTML;
};

const setPlayButtonAccessibleText = () => {
  const song = userData?.currentSong || userData?.songs[0];

  playButton.setAttribute(
    "aria-label",
    song?.title ? `Play ${song.title}` : "Play"
  );
};
function handlePlayButtonClick() {
  if (userData?.currentSong === null) {
    playSong(userData?.songs[0].id);
  } else {
    playSong(userData?.currentSong.id);
  }
}


const getCurrentSongIndex = () =>
  userData?.songs.indexOf(userData?.currentSong);

userData?.songs.sort((a, b) => {
  return a.title - b.title
});

renderSongs(userData?.songs);
setPlayButtonAccessibleText();

export {
  playSong,
  pauseSong,
  playNextSong,
  playPreviousSong,
  shuffle,
  handlePlayButtonClick,
  setPlayerDisplay,
  highlightCurrentSong,
  renderSongs,
  setPlayButtonAccessibleText,
  getCurrentSongIndex,
};
