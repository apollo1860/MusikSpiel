const songs50s = [
  { title: "Jailhouse Rock", artist: "Elvis Presley", year:1957, src: "songs/50s/Jailhouserock_elvispresley.mp3" },
  { title: "Johnny B. Goode", artist: "Chuck Berry", year:1958, src: "songs/50s/johnnybgoode_chuckberry.mp3" },
  { title: "Rock Around The Clock", artist: "Bill Haley & His Comets", year: 1954, src: "songs/50s/rockaroundtheclock_billhaley.mp3" }
];
window.SONG_DECADES = window.SONG_DECADES || [];
window.SONG_DECADES.push({ key:'50s', label:'1950er', list: songs50s });

