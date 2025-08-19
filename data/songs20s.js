const songs20s = [
  { title: "As It Was", artist: "Harry Styles", year:2022, src: "songs/20s/asitwas_harrystyles.mp3" },
  { title: "Blinding Lights", artist: "The Weeknd", year:2019, src: "songs/20s/Blindinglights_theweeknd.mp3" },
  { title: "Drivers License", artist: "Olivia Rodrigo", year:2021, src: "songs/20s/driverslicense_oliviarodrigo.mp3" }
];
window.SONG_DECADES = window.SONG_DECADES || [];
window.SONG_DECADES.push({ key:'20s', label:'2020er', list: songs20s });
