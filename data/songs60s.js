const songs60s = [
  { title: "Good Vibrations", artist: "The Beach Boys", year:1966, src: "songs/60s/goodvibrations_beachboys.mp3" },
  { title: "Hey Jude", artist: "The Beatles", year:1968, src: "songs/60s/heyjude_thebeatles.mp3" },
  { title: "Paint It Black", artist: "The Rolling Stones", year:1966, src: "songs/60s/Paintitblack_rollingstones.mp3" }
];
window.SONG_DECADES = window.SONG_DECADES || [];
window.SONG_DECADES.push({ key:'60s', label:'1960er', list: songs60s });
