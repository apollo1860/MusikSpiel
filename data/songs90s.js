// Einmalige globale Basis-URL (redeclare-safe – wird nur gesetzt, wenn noch nicht vorhanden)
window.BASE_URL ??= "https://pub-3910a02fcd5042f5bb1910363e89357c.r2.dev/";

const songs90s = [
  { title: "Baby One More Time", artist: "Britney Spears", year: 1998, src: window.BASE_URL + "90s/babyonemoretime_britneyspears.mp3" },
  { title: "Smells Like Teen Spirit", artist: "Nirvana", year: 1991, src: window.BASE_URL + "90s/smellsliketeenspirit_nirvana.mp3" },
  { title: "Wonderwall", artist: "Oasis", year: 1995, src: window.BASE_URL + "90s/wonderwall_oasis.mp3" },
  { title: "Losing My Religion", artist: "R.E.M.", year: 1991, src: window.BASE_URL + "90s/losingmyreligion_rem.mp3" },
  { title: "Everybody Hurts", artist: "R.E.M.", year: 1992, src: window.BASE_URL + "90s/everybodyhurts_rem.mp3" },
  { title: "Enter Sandman", artist: "Metallica", year: 1991, src: window.BASE_URL + "90s/entersandman_metallica.mp3" },
  { title: "Nothing Else Matters", artist: "Metallica", year: 1991, src: window.BASE_URL + "90s/nothingelsematters_metallica.mp3" },
  { title: "Black Hole Sun", artist: "Soundgarden", year: 1994, src: window.BASE_URL + "90s/blackholesun_soundgarden.mp3" },
  { title: "Alive", artist: "Pearl Jam", year: 1991, src: window.BASE_URL + "90s/alive_pearljam.mp3" },
  { title: "Jeremy", artist: "Pearl Jam", year: 1991, src: window.BASE_URL + "90s/jeremy_pearljam.mp3" },
  { title: "Blue (Da Ba Dee)", artist: "Eiffel 65", year: 1999, src: window.BASE_URL + "90s/blue_eiffel65.mp3" },
  { title: "Sie sieht mich nicht", artist: "Xavier Naidoo", year: 1998, src: window.BASE_URL + "90s/siesiehtmichnicht_xaviernaidoo.mp3" },
  { title: "MfG", artist: "Die Fantastischen Vier", year: 1999, src: window.BASE_URL + "90s/mfg_fantastischenvier.mp3" },
  { title: "Die da!?!", artist: "Die Fantastischen Vier", year: 1992, src: window.BASE_URL + "90s/dieda_fantastischenvier.mp3" },
  { title: "Alles nur geklaut", artist: "Die Prinzen", year: 1993, src: window.BASE_URL + "90s/allesnurgeklaut_dieprinzen.mp3" },
  { title: "Californication", artist: "Red Hot Chili Peppers", year: 1999, src: window.BASE_URL + "90s/californication_redhotchilipeppers.mp3" },
  { title: "Under the Bridge", artist: "Red Hot Chili Peppers", year: 1992, src: window.BASE_URL + "90s/underthebridge_redhotchilipeppers.mp3" },
  { title: "Creep", artist: "Radiohead", year: 1992, src: window.BASE_URL + "90s/creep_radiohead.mp3" },
  { title: "Karma Police", artist: "Radiohead", year: 1997, src: window.BASE_URL + "90s/karmapolice_radiohead.mp3" },
  { title: "Groove Is in the Heart", artist: "Deee-Lite", year: 1990, src: window.BASE_URL + "90s/grooveisintheheart_deelite.mp3" }
];

// Registry anlegen/aktualisieren (verhindert Doppel-Eintrag bei erneutem Laden)
window.SONG_DECADES ??= [];
(() => {
  const k = '90s';
  const i = window.SONG_DECADES.findIndex(d => d.key === k);
  const entry = { key: k, label: '1990er', list: songs90s };
  if (i >= 0) window.SONG_DECADES[i] = entry;
  else window.SONG_DECADES.push(entry);
})();
