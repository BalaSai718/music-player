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

let previous = document.querySelector('#prev');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let song_name = document.querySelector('#name');
let volume = document.querySelector('#sound');
let sound_value = document.querySelector('#sound_value');
let song_thumbnail = document.querySelector('#song_thumbnail');
let slider = document.querySelector('#duration_slider');
let song_duration = document.querySelector('#song_duration');
let auto_play = document.querySelector('#auto_play');
let current = document.querySelector('#current');
let total = document.querySelector('#total');
let singer = document.querySelector('#singer');

let timer;
let autoplay = 0;
let index_num = 0;
let current_song = false;
let track = document.createElement('audio')


function load_track(index_num){
    clearInterval(timer);
    track.src = Songs[index_num].path;
    song_name.innerHTML = Songs[index_num].name;
    song_thumbnail.src = Songs[index_num].image;
    singer.innerHTML = Songs[index_num].artist;
    track.load();

    total.innerHTML = Songs.length;
    current.innerHTML = index_num + 1;
}

load_track(index_num);

function mute_sound(){
    track.sound = 0;
    sound.value = 0;
    sound_value.innerHTML = 0;
}

function justplay(){
    if(current_song==false){
        playsong();
    }else{
        pausesong();
    }
}

function playsong(){
    track.play();
    current_song = true;
    play.innerHTML = '<i class="fa fa-pause"></i>';
}

function pausesong(){
    track.pause();
    current_song = false;
    play.innerHTML = '<i class="fa fa-play"></i>';
}

function next_song(){
    if (index_num < Songs.length - 1){
        index_num += 1;
        load_track(index_num);
        playsong();
    }else{
        index_num = 0;
        load_track(index_num);
        playsong();
    }
}

function previous_song(){
    if (index_num > 0){
        index_num -= 1;
        load_track(index_num);
        playsong();
    }else{
        index_num = Songs.length;
        load_track(index_num);
        playsong();
    }
}

function volume_change(){
    sound_value.innerHTML = volume.value;
    track.sound = volume.value / 100;
}

function change_duration(){
  slider_position = track.duration * (slider.value / 100);
  track.currentTime = slider_position;
}

function autoplay_switch(){
  if (autoplay==1){
      autoplay=0;
      auto_play.style.background = "rgba(255,255,255,0.2)";
  }else{
      autoplay = 1;
      auto_play.style.background ="#FF8A65";
  }
}

function range_slider(){
  let position = 0;
  if(!isNaN(track.duration)){
      position = track.currentTime * (100/ track.duration);
      slider.value = position;
  }

  if(track.ended){
      play.innerHTML = '<i class="fa fa-play"></i>';
      if (autoplay==1){
          index_num += 1;
          load_track(index_num);
          playsong();
      }
  }
}