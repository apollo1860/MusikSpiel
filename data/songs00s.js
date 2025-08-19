const songs00s = [
  { title: "Hey Ya!", artist: "Outkast", year: 2003, src: "songs/00s/heyya_outkast.mp3" },
  { title: "In The End", artist: "Linkin Park", year: 2001, src: "songs/00s/intheend_linkinpark.mp3" },
  { title: "Lose Yourself", artist: "Eminem", year: 2002, src: "songs/00s/loseyourself_eminem.mp3" }
];
window.SONG_DECADES = window.SONG_DECADES || [];
window.SONG_DECADES.push({ key:'00s', label:'2000er', list: songs00s });
