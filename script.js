// Data Structure: Array of song objects
const songs = [
  {
    title: "Chill Acoustic",
    artist: "SoundHelix",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop"
  },
  {
    title: "Upbeat Electronic",
    artist: "SoundHelix",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop"
  },
  {
    title: "Mellow Groove",
    artist: "SoundHelix",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover: "https://images.unsplash.com/photo-1493225457124-a1a2a2954813?w=300&h=300&fit=crop"
  }
];

// DOM Elements
const audio = document.getElementById('audio-element');
const title = document.getElementById('song-title');
const artist = document.getElementById('song-artist');
const cover = document.getElementById('cover-art');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const volumeBar = document.getElementById('volume-bar');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');
const playlistEl = document.getElementById('playlist');

// State
let songIndex = 0;
let isPlaying = false;

// Initialize Player
function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
  cover.src = song.cover;
  renderPlaylist();
}

// Play / Pause Logic
function playSong() {
  isPlaying = true;
  playBtn.textContent = 'Pause';
  cover.classList.add('playing');
  audio.play();
}

function pauseSong() {
  isPlaying = false;
  playBtn.textContent = 'Play';
  cover.classList.remove('playing');
  audio.pause();
}

playBtn.addEventListener('click', () => {
  isPlaying ? pauseSong() : playSong();
});

// Navigation Controls
function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  if (isPlaying) playSong();
}

function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  if (isPlaying) playSong();
}

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Auto-play next song when current finishes
audio.addEventListener('ended', nextSong);

// Volume Control
volumeBar.addEventListener('input', (e) => {
  audio.volume = e.target.value / 100;
});

// Progress Bar & Time Logic
function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? '0' + sec : sec}`;
}

audio.addEventListener('timeupdate', () => {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  if (!isNaN(progressPercent)) {
    progressBar.value = progressPercent;
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
  }
});

audio.addEventListener('loadedmetadata', () => {
  durationDisplay.textContent = formatTime(audio.duration);
});

progressBar.addEventListener('input', (e) => {
  const seekTime = (e.target.value / 100) * audio.duration;
  audio.currentTime = seekTime;
});

// Playlist Generation
function renderPlaylist() {
  playlistEl.innerHTML = ''; // Clear current list
  songs.forEach((song, index) => {
    const li = document.createElement('li');
    li.textContent = `${song.title} - ${song.artist}`;
    
    // Highlight active song
    if (index === songIndex) {
      li.classList.add('active');
    }

    // Play song when clicked from playlist
    li.addEventListener('click', () => {
      songIndex = index;
      loadSong(songs[songIndex]);
      playSong();
    });

    playlistEl.appendChild(li);
  });
}

// Load the first song on startup
loadSong(songs[songIndex]);
