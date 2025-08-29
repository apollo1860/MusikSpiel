const BASE_URL = "https://pub-3910a02fcd5042f5bb1910363e89357c.r2.dev/";

const songs20s = [
  { title: "As It Was", artist: "Harry Styles", year:2022, src: BASE_URL + "20s/asitwas_harrystyles.mp3" },
  { title: "Blinding Lights", artist: "The Weeknd", year:2019, src: BASE_URL + "20s/Blindinglights_theweeknd.mp3" },
  { title: "Drivers License", artist: "Olivia Rodrigo", year:2021, src: BASE_URL + "20s/driverslicense_oliviarodrigo.mp3" },
  { title: "Levitating", artist: "Dua Lipa", year: 2020, src: BASE_URL + "20s/levitating_dualipa.mp3" },
  { title: "Don’t Start Now", artist: "Dua Lipa", year: 2020, src: BASE_URL + "20s/dontstartnow_dualipa.mp3" },
  { title: "Break My Heart", artist: "Dua Lipa", year: 2020, src: BASE_URL + "20s/breakmyheart_dualipa.mp3" },
  { title: "Flowers", artist: "Miley Cyrus", year: 2023, src: BASE_URL + "20s/flowers_mileycyrus.mp3" },
  { title: "Midnight Sky", artist: "Miley Cyrus", year: 2020, src: BASE_URL + "20s/midnightsky_mileycyrus.mp3" },
  { title: "Vampire", artist: "Olivia Rodrigo", year: 2023, src: BASE_URL + "20s/vampire_oliviarodrigo.mp3" },
  { title: "Good 4 U", artist: "Olivia Rodrigo", year: 2021, src: BASE_URL + "20s/good4u_oliviarodrigo.mp3" },
  { title: "Kill Bill", artist: "SZA", year: 2022, src: BASE_URL + "20s/killbill_sza.mp3" },
  { title: "Shirt", artist: "SZA", year: 2022, src: BASE_URL + "20s/shirt_sza.mp3" },
  { title: "Anti-Hero", artist: "Taylor Swift", year: 2022, src: BASE_URL + "20s/antihero_taylorswift.mp3" },
  { title: "Cardigan", artist: "Taylor Swift", year: 2020, src: BASE_URL + "20s/cardigan_taylorswift.mp3" }
];
window.SONG_DECADES = window.SONG_DECADES || [];
window.SONG_DECADES.push({ key:'20s', label:'2020er', list: songs20s });
