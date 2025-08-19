const songs80s = [
  { title: "Billie Jean", artist: "Michael Jackson", year:1982, src: "songs/80s/billiejean_michaeljackson.mp3" },
  { title: "Livin On A Prayer", artist: "Jon Bon Jovi", year: 1986, src: "songs/80s/livinonaprayer_bonjovi.mp3" },
  { title: "Take On Me", artist: "a-ha", year:1984, src: "songs/80s/takeonme_aha.mp3" }
];
window.SONG_DECADES = window.SONG_DECADES || [];
window.SONG_DECADES.push({ key:'80s', label:'1980er', list: songs80s });
