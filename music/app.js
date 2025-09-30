let currentMusik = 0;

const music = document.querySelector("#audio");
const seekBar = document.querySelector("#seek-bar");
const namaMusik = document.querySelector("#namaMusik");
const namaArtis = document.querySelector("#namaArtis");
const cover = document.querySelector("#cover");
const currentTime = document.querySelector("#realtime");
const duration = document.querySelector("#lama-musik");
const play = document.querySelector(".playButton");
const before = document.querySelector(".sebelum");
const after = document.querySelector(".sesudah");

play.addEventListener("click", () => {
  if (play.className.includes("pause")) {
    music.play();
  } else {
    music.pause();
  }
  play.classList.toggle("pause");
});

const setMusic = (i) => {
  seekBar.value = 0;
  let song = songs[i];
  currentMusik = i;
  music.src = song.path;

  namaMusik.innerHTML = song.name;
  namaArtis.innerHTML = song.artis;
  cover.computedStyleMap.backgroundImage = `url(${song.cover})`;
  currentTime.innerHTML = "00.00";
  setTimeout(() => {
    seekBar.max = music.duration;
    duration.innerHTML = formatTime(music.duration);
  }, 300);
};

setMusic(0);

const formatTime = (time) => {
  let min = Math.floor(time / 60);
  if (min < 10) {
    min = `0${min}`;
  }
  let sec = Math.floor(time % 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${min}:${sec}`;
};


setInterval(()=> {
    seekBar.value = music.currentTime;
    currentTime.innerHTML = formatTime(music.currentTime);
},500)

seekBar.addEventListener('change', () => {
    music.currentTime = seekBar.value;
})

after.addEventListener ('click', () => {
    if ( currentMusik >= songs.length -1){
        currentMusik = 0;
    }else {
        currentMusik++;
    }
    setMusic(currentMusik);
    play.click()
})

before.addEventListener ('click', () => {
    if ( currentMusik <= 0){
        currentMusik = songs.length - 1;
    }else {
        currentMusik--;
    }
    setMusic(currentMusik);
    play.click()
})