// Get DOM elements
const audio = document.getElementById('audio-element');
const playBtn = document.getElementById('play-btn');
const pauseBtn = document.getElementById('pause-btn');
const progressBar = document.getElementById('progress-bar');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');

// Play the audio
playBtn.addEventListener('click', () => {
  audio.play();
});

// Pause the audio
pauseBtn.addEventListener('click', () => {
  audio.pause();
});

// Format time in minutes and seconds (e.g., 2:30)
function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? '0' + sec : sec}`;
}

// Update progress bar and time as the song plays
audio.addEventListener('timeupdate', () => {
  // Calculate percentage of the song played
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  
  // Only update if duration is a valid number
  if (!isNaN(progressPercent)) {
    progressBar.value = progressPercent;
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
  }
});

// Set the total duration once the audio metadata loads
audio.addEventListener('loadedmetadata', () => {
  durationDisplay.textContent = formatTime(audio.duration);
});

// Allow the user to seek to a different part of the song
progressBar.addEventListener('input', (e) => {
  const seekTime = (e.target.value / 100) * audio.duration;
  audio.currentTime = seekTime;
});
