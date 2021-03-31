// define variables

let audio,
  playbtn,
  title,
  poster,
  artists,
  mutebtn,
  seekslider,
  volumeslider,
  seeking = false,
  seekto,
  curtimetext,
  durtimetext,
  playlist_status,
  dir,
  playlist,
  ext,
  agent,
  playlist_artist,
  repeat,
  randomSong;
like;

// Initialization of Array of music,title,poster,Image,artists

dir = "../static/assets/Music/";
playlist = [
  "Cartoon-On-_-On",
  "Elektronomia",
  "Johnning",
  "Popsicle",
  "Fearless",
];
title = [
  "Cartoon - On & On",
  "Elektronomia",
  "Janji-Heroes Tonight",
  "Popsicle",
  "Lost Sky-Fearless",
];
artists = [
  "(feat.Daniel Levi) [NCS Release]",
  "Elektronomia-Sky High [NSC Release]",
  "feat. Johnning) [NSC Release]",
  "LFZ - [NSC Release]",
  "feat. chris Linton) [Ncs Release]",
];
poster = [
  "../static/assets/images/ncs1.jpeg",
  "../static/assets/images/ncs2.jpg",
  "../static/assets/images/ncs3.jpg",
  "../static/assets/images/ncs4.jpg",
  "../static/assets/images/ncs5.jpg",
];

//  Used to run an every Browser

ext = ".mp3";
agent = navigator.userAgent.toLowerCase();
if (agent.indexOf("firefox") != -1 || agent.indexOf("opera") != -1) {
  ext = ".ogg";
}

// set object references to

playbtn = document.getElementById("playpausebtn");
nextbtn = document.getElementById("nextbtn");
prevbtn = document.getElementById("prevbtn");
mutebtn = document.getElementById("mutebtn");
seekslider = document.getElementById("seekslider");
volumeslider = document.getElementById("volumeslider");
curtimetext = document.getElementById("curtimetext");
durtimetext = document.getElementById("durtimetext");
playlist_status = document.getElementById("playlist_status");
playlist_artist = document.getElementById("playlist_artist");
repeat = document.getElementById("repeat");
randomSong = document.getElementById("random");
like = document.getElementById("like");

playlist_index = 0;

// Audio object

audio = new Audio();
audio.src = dir + playlist[0] + ext; // dir+/musicname.mp3
audio.loop = false;

// first song title and artist

playlist_artist.innerHTML = artists[playlist_index];
playlist_status.innerHTML = title[playlist_index];
// add event handlin

playbtn.addEventListener("click", playPause);
nextbtn.addEventListener("click", nextSong);
prevbtn.addEventListener("click", prevSong);
mutebtn.addEventListener("click", mute);
// seekslider.addEventListener("mousedown",mouseDown);
// seekslider.addEventListener("mousemove",mouseMove);
// seekslider.addEventListener("mouseup", mouseUp);
$("#seekslider").mousedown(mouseDown);
$("#seekslider").mousemove(mouseMove);
$("#seekslider").mouseup(mouseUp);


function mouseDown(event) {
  seeking = true;
  seek(event);
}
function mouseMove(event) {
  seek(event);
}
function mouseUp() {
  seeking = false;
}



volumeslider.addEventListener("mousemove", setvolume);
audio.addEventListener("timeupdate", function () {
  seektimeupdate();
});
audio.addEventListener("ended", function () {
  switchTrack();
});
randomSong.addEventListener("click", random);
repeat.addEventListener("click", loop);
like.addEventListener("click", function () {
  $("#like").removeClass("far");
  $("#like").addClass("fas");
  setTimeout(() => {
    $("#like").removeClass("fas");
    $("#like").addClass("far");
  }, 100);
});

// Functions

function fetchMusicDetails() {
  //poster images , pause/play image

  $("#playpausebtn img").attr("src", "../static/assets/images/pause-red.png");
  $("#bgImage").attr("src", poster[playlist_index]);
  $("#image").attr("src", poster[playlist_index]);

  // Title and artist
  playlist_artist.innerHTML = artists[playlist_index];
  playlist_status.innerHTML = title[playlist_index];

  //Audio
  audio.src = dir + playlist[playlist_index] + ext;
  audio.play();
}

function playPause() {
  if (audio.paused) {
    audio.play();
    $("#playpausebtn img").attr("src", "../static/assets/images/pause-red.png");
  } else {
    audio.pause();
    $("#playpausebtn img").attr("src", "../static/assets/images/play-red.png");
  }
}

function nextSong() {
  playlist_index++;
  if (playlist_index > playlist.length - 1) {
    playlist_index = 0;
  }
  fetchMusicDetails();
}

function prevSong() {
  playlist_index--;
  if (playlist_index < 0) {
    playlist_index = playlist.length - 1;
  }
  fetchMusicDetails();
}

function mute() {
  if (audio.muted) {
    audio.muted = false;
    $("#mutebtn img").attr("src", "../static/assets/images/speaker.png");
  } else {
    audio.muted = true;
    $("#mutebtn img").attr("src", "../static/assets/images/mute.png");
  }
}

function seek(event){
  if (audio.duration != 0) {
    if(seeking){
      x = $(".music-content").position();
      seekslider.value = event.clientX - x.left - 70;
      seekto = audio.duration * (seekslider.value / 100);
      audio.currentTime = seekto;
    }
  }
}

function setvolume() {
  audio.volume = volumeslider.value / 100;
}

function seektimeupdate() {
  if (audio.duration) {
    let nt = audio.currentTime * (100 / audio.duration);
    seekslider.value = nt;
    var curmins = Math.floor(audio.currentTime / 60);
    var cursecs = Math.floor(audio.currentTime - curmins * 60);
    var durmins = Math.floor(audio.duration / 60);
    var dursecs = Math.floor(audio.duration - durmins * 60);
    if (cursecs < 10) {
      cursecs = "0" + cursecs;
    }
    if (dursecs < 10) {
      dursecs = "0" + dursecs;
    }
    if (curmins < 10) {
      curmins = "0" + curmins;
    }
    if (durmins < 10) {
      durmins = "0" + durmins;
    }
    curtimetext.innerHTML = curmins + ":" + cursecs;
    durtimetext.innerHTML = durmins + ":" + dursecs;
  } else {
    curtimetext.innerHTML = "00" + ":" + "00";
    durtimetext.innerHTML = "00" + ":" + "00";
  }
}

function switchTrack() {
  if (playlist_index == (playlist.length - 1)){
    playlist_index = 0;
  } else{
    playlist_index++;
  }
  fetchMusicDetails();
}

function loop() {
  if (audio.loop) {
    audio.loop = false;
    $("#repeat img").attr("src", "../static/assets/images/rep.png");
  } else {
    audio.loop = true;
    $("#repeat img").attr("src", "../static/assets/images/rep1.png");
  }
}

function getRandomNumber(min, max) {
  let step1 = max - min + 1;
  let step2 = Math.random() * step1;
  let results = Math.floor(step2) + min;
  return results;
}

function random() {
  let randomIndex = getRandomNumber(0, playlist.length - 1);
  playlist_index = randomIndex;
  fetchMusicDetails();
}
