// Einmalige globale Basis-URL (nur setzen, falls noch nicht definiert)
window.BASE_URL ??= "https://pub-3910a02fcd5042f5bb1910363e89357c.r2.dev/";

const songs20s = [
  { title: "Bad Habits", artist: "Ed Sheeran", year: 2021, src: window.BASE_URL + "20s/badhabits_edsheeran.mp3" },
  { title: "Shivers", artist: "Ed Sheeran", year: 2021, src: window.BASE_URL + "20s/shivers_edsheeran.mp3" },
  { title: "Eyes Closed", artist: "Ed Sheeran", year: 2023, src: window.BASE_URL + "20s/eyesclosed_edsheeran.mp3" },
  { title: "Peaches", artist: "Justin Bieber feat. Daniel Caesar & Giveon", year: 2021, src: window.BASE_URL + "20s/peaches_justinbieber.mp3" },
  { title: "Stay", artist: "The Kid Laroi & Justin Bieber", year: 2021, src: window.BASE_URL + "20s/stay_thekidlaroi.mp3" },
  { title: "Ghost", artist: "Justin Bieber", year: 2021, src: window.BASE_URL + "20s/ghost_justinbieber.mp3" },
  { title: "About Damn Time", artist: "Lizzo", year: 2022, src: window.BASE_URL + "20s/aboutdamntime_lizzo.mp3" },
  { title: "Rumors", artist: "Lizzo feat. Cardi B", year: 2021, src: window.BASE_URL + "20s/rumors_lizzo.mp3" },
  { title: "Espresso", artist: "Sabrina Carpenter", year: 2024, src: window.BASE_URL + "20s/espresso_sabrinacarpenter.mp3" },
  { title: "Bagchaser Can", artist: "Pashanim", year: 2023, src: window.BASE_URL + "20s/bagchasercan_pashanim.mp3" },
  { title: "Blaues Licht", artist: "RAF Camora", year: 2023, src: window.BASE_URL + "20s/blaueslicht_rafcamora.mp3" },
  { title: "As It Was", artist: "Harry Styles", year: 2022, src: window.BASE_URL + "20s/asitwas_harrystyles.mp3" },
  { title: "Blinding Lights", artist: "The Weeknd", year: 2019, src: window.BASE_URL + "20s/Blindinglights_theweeknd.mp3" },
  { title: "Drivers License", artist: "Olivia Rodrigo", year: 2021, src: window.BASE_URL + "20s/driverslicense_oliviarodrigo.mp3" },
  { title: "Levitating", artist: "Dua Lipa", year: 2020, src: window.BASE_URL + "20s/levitating_dualipa.mp3" },
  { title: "Don’t Start Now", artist: "Dua Lipa", year: 2020, src: window.BASE_URL + "20s/dontstartnow_dualipa.mp3" },
  { title: "Break My Heart", artist: "Dua Lipa", year: 2020, src: window.BASE_URL + "20s/breakmyheart_dualipa.mp3" },
  { title: "Flowers", artist: "Miley Cyrus", year: 2023, src: window.BASE_URL + "20s/flowers_mileycyrus.mp3" },
  { title: "Midnight Sky", artist: "Miley Cyrus", year: 2020, src: window.BASE_URL + "20s/midnightsky_mileycyrus.mp3" },
  { title: "Vampire", artist: "Olivia Rodrigo", year: 2023, src: window.BASE_URL + "20s/vampire_oliviarodrigo.mp3" },
  { title: "Good 4 U", artist: "Olivia Rodrigo", year: 2021, src: window.BASE_URL + "20s/good4u_oliviarodrigo.mp3" },
  { title: "Kill Bill", artist: "SZA", year: 2022, src: window.BASE_URL + "20s/killbill_sza.mp3" },
  { title: "Shirt", artist: "SZA", year: 2022, src: window.BASE_URL + "20s/shirt_sza.mp3" },
  { title: "Anti-Hero", artist: "Taylor Swift", year: 2022, src: window.BASE_URL + "20s/antihero_taylorswift.mp3" },
  { title: "Cardigan", artist: "Taylor Swift", year: 2020, src: window.BASE_URL + "20s/cardigan_taylorswift.mp3" }
];

// Registry: vorhandenen Eintrag ersetzen oder hinzufügen (kein Doppel)
window.SONG_DECADES ??= [];
(() => {
  const k = '20s';
  const entry = { key: k, label: '2020er', list: songs20s };
  const idx = window.SONG_DECADES.findIndex(d => d.key === k);
  if (idx >= 0) window.SONG_DECADES[idx] = entry;
  else window.SONG_DECADES.push(entry);
})();
