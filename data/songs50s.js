const BASE_URL = "https://pub-3910a02fcd5042f5bb1910363e89357c.r2.dev/";

const songs50s = [
  { title: "Jailhouse Rock", artist: "Elvis Presley", year:1957, src: BASE_URL + "50s/Jailhouserock_elvispresley.mp3" },
  { title: "Johnny B. Goode", artist: "Chuck Berry", year:1958, src: BASE_URL + "50s/johnnybgoode_chuckberry.mp3" },
  { title: "Rock Around The Clock", artist: "Bill Haley & His Comets", year: 1954, src: BASE_URL + "50s/rockaroundtheclock_billhaley.mp3" },
  { title: "Rock Around the Clock", artist: "Bill Haley & His Comets", year: 1954, src: BASE_URL + "50s/rockaroundtheclock_billhaley.mp3" },
  { title: "Heartbreak Hotel", artist: "Elvis Presley", year: 1956, src: BASE_URL + "50s/heartbreakhotel_elvispresley.mp3" },
  { title: "Hound Dog", artist: "Elvis Presley", year: 1956, src: BASE_URL + "50s/Hounddog_elvispresley.mp3" },
  { title: "Jailhouse Rock", artist: "Elvis Presley", year: 1957, src: BASE_URL + "50s/Jailhouserock_elvispresley.mp3" },
  { title: "Love Me Tender", artist: "Elvis Presley", year: 1956, src: BASE_URL + "50s/lovemetender_elvispresley.mp3" },
  { title: "Blue Suede Shoes", artist: "Carl Perkins", year: 1956, src: BASE_URL + "50s/Bluesuedeshoes_carlperkins.mp3" },
  { title: "Tutti Frutti", artist: "Little Richard", year: 1955, src: BASE_URL + "50s/Tuttifrutti_littlerichard.mp3" },
  { title: "Long Tall Sally", artist: "Little Richard", year: 1956, src: BASE_URL + "50s/longtallsally_littlerichard.mp3" },
  { title: "Lucille", artist: "Little Richard", year: 1957, src: BASE_URL + "50s/lucille_littlerichard.mp3" },
  { title: "Good Golly Miss Molly", artist: "Little Richard", year: 1958, src: BASE_URL + "50s/goodgollymissmolly_littlerichard.mp3" },
  { title: "Johnny B. Goode", artist: "Chuck Berry", year: 1958, src: BASE_URL + "50s/johnnybgoode_chuckberry.mp3" },
  { title: "Maybellene", artist: "Chuck Berry", year: 1955, src: BASE_URL + "50s/maybellene_chuckberry.mp3" },
  { title: "Roll Over Beethoven", artist: "Chuck Berry", year: 1956, src: BASE_URL + "50s/rolloverbeethoven_chuckberry.mp3" },
  { title: "Sweet Little Sixteen", artist: "Chuck Berry", year: 1958, src: BASE_URL + "50s/sweetlittlesixteen_chuckberry.mp3" },
  { title: "Peggy Sue", artist: "Buddy Holly", year: 1957, src: BASE_URL + "50s/peggysue_buddyholly.mp3" },
  { title: "That'll Be the Day", artist: "Buddy Holly", year: 1957, src: BASE_URL + "50s/thatllbetheday_buddyholly.mp3" },
  { title: "Oh Boy!", artist: "Buddy Holly", year: 1957, src: BASE_URL + "50s/ohboy_buddyholly.mp3" },
  { title: "Everyday", artist: "Buddy Holly", year: 1957, src: BASE_URL + "50s/everyday_buddyholly.mp3" },
  { title: "Chantilly Lace", artist: "The Big Bopper", year: 1958, src: BASE_URL + "50s/ChantillyLace_thebigbopper.mp3" },
  { title: "La Bamba", artist: "Ritchie Valens", year: 1958, src: BASE_URL + "50s/labamba_ritchievalens.mp3" },
  { title: "Donna", artist: "Ritchie Valens", year: 1958, src: BASE_URL + "50s/Donna_ritchievalens.mp3" },
  { title: "Why Do Fools Fall in Love", artist: "Frankie Lymon & The Teenagers", year: 1956, src: BASE_URL + "50s/whydofoolsfallinlove_frankielymon.mp3" },
  { title: "Yakety Yak", artist: "The Coasters", year: 1958, src: BASE_URL + "50s/yaketyyak_thecoasters.mp3" },
  { title: "Charlie Brown", artist: "The Coasters", year: 1959, src: BASE_URL + "50s/charliebrown_thecoasters.mp3" }
];

window.SONG_DECADES = window.SONG_DECADES || [];
window.SONG_DECADES.push({ key:'50s', label:'1950er', list: songs50s });
