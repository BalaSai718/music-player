let Songs = [
  {
    name: "Choolenge Aasme",
    path: "sources/songs/song-1.mp3",
    image: "sources/images/pic-1.jpg",
    artist: "Aadan Sami"

  },
  {
    name: "Love Me Again",
    path: "sources/songs/song-2.mp3",
    image: "sources/images/pic-2.jpg",
    artist: "Sooraj Santhosh"

  },
  {
    name: "Naatu Naatu",
    path: "sources/songs/song-3.mp3",
    image: "sources/images/pic-3.jpg",
    artist: "Rahul Sipligunj"

  },
  {
    name: "Nammavemo",
    path: "sources/songs/song-4.mp3",
    image: "sources/images/pic-4.jpg",
    artist: "Saketh"

  },
  {
    name: "Nuvvunte Nijamega",
    path: "sources/songs/song-5.mp3",
    image: "sources/images/pic-5.jpg",
    artist: "Sagar"

  },
  {
    name: "Top Leche Podhi",
    path: "sources/songs/song-6.mp3",
    image: "sources/images/pic-6.jpg",
    artist: "Geetha Madhuri"

  },
  {
    name: "Pranama",
    path: "sources/songs/song-7.mp3",
    image: "sources/images/pic-7.jpg",
    artist: "G.V. Prakash Kumar"

  },
  {
    name: "Nuvvu Naku Manasisthe",
    path: "sources/songs/song-8.mp3",
    image: "sources/images/pic-8.jpg",
    artist: "Mallikarjun"

  },
  {
    name: "Lala Bheemla",
    path: "sources/songs/song-9.mp3",
    image: "sources/images/pic-9.jpg",
    artist: "Arun Kaundinya"

  },
  {
    name: "Jaago",
    path: "sources/songs/song-10.mp3",
    image: "sources/images/pic-10.jpg",
    artist: "Raghu Dixit"

  },
];

let previous = document.querySelector("#prev");
let play = document.querySelector("#play");
let next = document.querySelector("#next");
let title = document.querySelector("#title");
let recent_volume = document.querySelector("#volume");
let volume_show = document.querySelector("#volume_show");
let slider = document.querySelector("#duration_slider");
let show_duration = document.querySelector("#show_duration");
let song_img = document.querySelector("#song_img");
let auto_play = document.querySelector("#auto");
let curr_song = document.querySelector("#curr_song");
let total = document.querySelector("#total");
let artist = document.querySelector("#artist");

let timer;
let autoplay = 0;

let index_no = 0;
let Playing_song = false;

let track = document.createElement("audio");

function load_track(index_no) {
  clearInterval(timer);
  reset_slider();

  track.src = Songs[index_no].path;
  title.innerHTML = Songs[index_no].name;
  song_img.src = Songs[index_no].image;
  artist.innerHTML = Songs[index_no].artist;
  track.load();

  timer = setInterval(range_slider, 1000);
  total.innerHTML = Songs.length;
  curr_song.innerHTML = index_no + 1;
}

load_track(index_no);

function mute_sound() {
  track.volume = 0;
  volume.value = 0;
  volume_show.innerHTML = 0;
}

function justplay() {
  if (Playing_song == false) {
    playsong();
  } else {
    pausesong();
  }
}

function reset_slider() {
  slider.value = 0;
}

function playsong() {
  track.play();
  Playing_song = true;
  play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
}

function pausesong() {
  track.pause();
  Playing_song = false;
  play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
}

function next_song() {
  if (index_no < Songs.length - 1) {
    index_no += 1;
    load_track(index_no);
    playsong();
  } else {
    index_no = 0;
    load_track(index_no);
    playsong();
  }
}

function previous_song() {
  if (index_no > 0) {
    index_no -= 1;
    load_track(index_no);
    playsong();
  } else {
    index_no = Songs.length;
    load_track(index_no);
    playsong();
  }
}

function volume_change() {
  volume_show.innerHTML = recent_volume.value;
  track.volume = recent_volume.value / 100;
}

function change_duration() {
  slider_position = track.duration * (slider.value / 100);
  track.currentTime = slider_position;
}

function autoplay_switch() {
  if (autoplay == 1) {
    autoplay = 0;
    auto_play.style.background = "rgba(255,255,255,0.2)";
  } else {
    autoplay = 1;
    auto_play.style.background = "#148F77";
  }
}

function range_slider() {
  let position = 0;

  if (!isNaN(track.duration)) {
    position = track.currentTime * (100 / track.duration);
    slider.value = position;
  }

  if (track.ended) {
    play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
    if (autoplay == 1) {
      index_no += 1;
      load_track(index_no);
      playsong();
    }
  }
}
