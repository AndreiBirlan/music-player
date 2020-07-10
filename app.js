const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progressBar = document.getElementById('progress-bar');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// Song titles
const songs = ['Asturias', 'Capricho arabe', 'Introspection', 'Misirlou', 'Prelude', 'Spanish arabic fusion music', 'The Song of the Golden Dragon'];

// Keep track of song
let songIndex = 0;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Updates song details
function loadSong(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}

// Play song
function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}

// Pause song
function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause();
}

// Previous song
function prevSong() {
    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length -1;
    }

    loadSong(songs[songIndex]);

    playSong();
}

// Next song
function nextSong() {
    songIndex++;

    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);

    playSong();
}

// Update progress bar
function updateProgress(event) {
    const { duration, currentTime } = event.srcElement;
    // console.log(duration, currentTime);
    const progressPercent = (currentTime / duration) * 100;
    // console.log(progressPercent);
    progressBar.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(event) {
    const width = this.clientWidth;
    // console.log(width);
    const clickX = event.offsetX;
    // console.log(clickX);
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

// Event listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play'); //check if music is playing

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

// Change songs
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Progress bar
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);