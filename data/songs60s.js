const BASE_URL = "https://pub-3910a02fcd5042f5bb1910363e89357c.r2.dev/";

const songs60s = [
  { title: "I Want to Hold Your Hand", artist: "The Beatles", year: 1963, src: BASE_URL + "60s/iwanttoholdyourhand_beatles.mp3" },
  { title: "She Loves You", artist: "The Beatles", year: 1963, src: BASE_URL + "60s/shelovesyou_beatles.mp3" },
  { title: "Yesterday", artist: "The Beatles", year: 1965, src: BASE_URL + "60s/yesterday_beatles.mp3" },
  { title: "Come Together", artist: "The Beatles", year: 1969, src: BASE_URL + "60s/cometogether_beatles.mp3" },
  { title: "(I Can’t Get No) Satisfaction", artist: "The Rolling Stones", year: 1965, src: BASE_URL + "60s/icantgetnosatisfaction_rollingstones.mp3" },
  { title: "Jumpin’ Jack Flash", artist: "The Rolling Stones", year: 1968, src: BASE_URL + "60s/jumpinjackflash_rollingstones.mp3" },
  { title: "Gimme Shelter", artist: "The Rolling Stones", year: 1969, src: BASE_URL + "60s/Gimmeshelter_rollingstones.mp3" },
  { title: "House of the Rising Sun", artist: "The Animals", year: 1964, src: BASE_URL + "60s/houseoftherisingsun_theanimals.mp3" },
  { title: "White Rabbit", artist: "Jefferson Airplane", year: 1967, src: BASE_URL + "60s/whiterabbit_jeffersonairplane.mp3" },
  { title: "Somebody to Love", artist: "Jefferson Airplane", year: 1967, src: BASE_URL + "60s/somebodytolove_jeffersonairplane.mp3" },
  { title: "California Dreamin’", artist: "The Mamas & the Papas", year: 1965, src: BASE_URL + "60s/californiadreamin_mamasandpapas.mp3" },
  { title: "Monday, Monday", artist: "The Mamas & the Papas", year: 1966, src: BASE_URL + "60s/mondaymonday_mamasandpapas.mp3" },
  { title: "Surfin’ U.S.A.", artist: "The Beach Boys", year: 1963, src: BASE_URL + "60s/surfinusa_beachboys.mp3" },
  { title: "Wouldn’t It Be Nice", artist: "The Beach Boys", year: 1966, src: BASE_URL + "60s/wouldntitbenice_beachboys.mp3" },
  { title: "Like a Rolling Stone", artist: "Bob Dylan", year: 1965, src: BASE_URL + "60s/likearollingstone_bobdylan.mp3" },
  { title: "Blowin’ in the Wind", artist: "Bob Dylan", year: 1963, src: BASE_URL + "60s/blowininthewind_bobdylan.mp3" },
  { title: "Mr. Tambourine Man", artist: "The Byrds", year: 1965, src: BASE_URL + "60s/mrtambourine_thebyrds.mp3" },
  { title: "Turn! Turn! Turn!", artist: "The Byrds", year: 1965, src: BASE_URL + "60s/turnturnturn_thebyrds.mp3" },
  { title: "Respect", artist: "Aretha Franklin", year: 1967, src: BASE_URL + "60s/respect_arethafranklin.mp3" },
  { title: "Think", artist: "Aretha Franklin", year: 1968, src: BASE_URL + "60s/think_arethafranklin.mp3" },
  { title: "Sittin’ On The Dock of the Bay", artist: "Otis Redding", year: 1968, src: BASE_URL + "60s/sittinonthedockofthebay_otisredding.mp3" },
  { title: "My Girl", artist: "The Temptations", year: 1964, src: BASE_URL + "60s/mygirl_temptation.mp3" }
];
window.SONG_DECADES = window.SONG_DECADES || [];
window.SONG_DECADES.push({ key:'60s', label:'1960er', list: songs60s });
