// Einmalige globale Basis-URL (redeclare-safe – erzeugt sie nur, wenn noch nicht vorhanden)
window.BASE_URL ??= "https://pub-3910a02fcd5042f5bb1910363e89357c.r2.dev/";

const songs70s = [
  { title: "Bohemian Rhapsody", artist: "Queen", year: 1975, src: window.BASE_URL + "70s/bohemianrhapsody_queen.mp3" },
  { title: "Dancing Queen", artist: "ABBA", year: 1976, src: window.BASE_URL + "70s/dancingqueen_abba.mp3" },
  { title: "Stayin Alive", artist: "Bee Gees", year: 1977, src: window.BASE_URL + "70s/stayinalive_beegees.mp3" },
  { title: "Imagine", artist: "John Lennon", year: 1971, src: window.BASE_URL + "70s/imagine_johnlennon.mp3" },
  { title: "Let It Be", artist: "The Beatles", year: 1970, src: window.BASE_URL + "70s/letitbe_beatles.mp3" },
  { title: "American Pie", artist: "Don McLean", year: 1971, src: window.BASE_URL + "70s/americanpie_donmclean.mp3" },
  { title: "Your Song", artist: "Elton John", year: 1970, src: window.BASE_URL + "70s/yoursong_elton%20john" },
  { title: "Rocket Man", artist: "Elton John", year: 1972, src: window.BASE_URL + "70s/rocketman_eltonjohn.mp3" },
  { title: "Take It Easy", artist: "Eagles", year: 1972, src: window.BASE_URL + "70s/takeiteasy_eagles.mp3" },
  { title: "We Will Rock You", artist: "Queen", year: 1977, src: window.BASE_URL + "70s/wewillrockyou_queen.mp3" },
  { title: "We Are the Champions", artist: "Queen", year: 1977, src: window.BASE_URL + "70s/wearethechampions_queen.mp3" },
  { title: "Let’s Stay Together", artist: "Al Green", year: 1971, src: window.BASE_URL + "70s/letsstaytogether_algreen.mp3" },
  { title: "Lean on Me", artist: "Bill Withers", year: 1972, src: window.BASE_URL + "70s/leanonme_billwithers.mp3" },
  { title: "Ain’t No Sunshine", artist: "Bill Withers", year: 1971, src: window.BASE_URL + "70s/aintnosunshine_billwithers.mp3" },
  { title: "Sir Duke", artist: "Stevie Wonder", year: 1976, src: window.BASE_URL + "70s/sirduke_steviewonder.mp3" },
  { title: "Night Fever", artist: "Bee Gees", year: 1978, src: window.BASE_URL + "70s/nightfever_beegees.mp3" },
  { title: "Waterloo", artist: "ABBA", year: 1974, src: window.BASE_URL + "70s/waterloo_abba.mp3" },
  { title: "Griechischer Wein", artist: "Udo Jürgens", year: 1974, src: window.BASE_URL + "70s/griechischerwein_udojuergens.mp3" },
  { title: "Aber bitte mit Sahne", artist: "Udo Jürgens", year: 1976, src: window.BASE_URL + "70s/aberbittemitsahne_udojuergens.mp3" },
  { title: "Über sieben Brücken musst du gehen", artist: "Karat", year: 1978, src: window.BASE_URL + "70s/uebersiebenbrueckenmusstdugehen_karat.mp3" },
  { title: "Mendocino", artist: "Michael Holm", year: 1970, src: window.BASE_URL + "70s/mendocino_michaelholm.mp3" }
];

// Registry anlegen/aktualisieren (verhindert Doppel-Eintrag bei erneutem Laden)
window.SONG_DECADES ??= [];
(() => {
  const k = '70s';
  const i = window.SONG_DECADES.findIndex(d => d.key === k);
  const entry = { key: k, label: '1970er', list: songs70s };
  if (i >= 0) window.SONG_DECADES[i] = entry;
  else window.SONG_DECADES.push(entry);
})();
