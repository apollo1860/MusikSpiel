const songs70s = [
  { title: "Imagine", artist: "John Lennon", year: 1971, src: BASE_URL + "70s/imagine_johnlennon.mp3" },
  { title: "Let It Be", artist: "The Beatles", year: 1970, src: BASE_URL + "70s/letitbe_beatles.mp3" },
  { title: "Bridge Over Troubled Water", artist: "Simon & Garfunkel", year: 1970, src: BASE_URL + "70s/bridgeovertroubledwater_simongarfunkel.mp3" }, // fehlt im Ordner
  { title: "American Pie", artist: "Don McLean", year: 1971, src: BASE_URL + "70s/americanpie_donmclean.mp3" },
  { title: "Your Song", artist: "Elton John", year: 1970, src: BASE_URL + "70s/yoursong_elton john.mp3" },
  { title: "Rocket Man", artist: "Elton John", year: 1972, src: BASE_URL + "70s/rocketman_eltonjohn.mp3" },
  { title: "Hotel California", artist: "Eagles", year: 1976, src: BASE_URL + "70s/hotelcalifornia_eagles.mp3" }, // fehlt im Ordner
  { title: "Take It Easy", artist: "Eagles", year: 1972, src: BASE_URL + "70s/takeiteasy_eagles.mp3" },
  { title: "We Will Rock You", artist: "Queen", year: 1977, src: BASE_URL + "70s/wewillrockyou_queen.mp3" },
  { title: "We Are the Champions", artist: "Queen", year: 1977, src: BASE_URL + "70s/wearethechampions_queen.mp3" },
  { title: "Let’s Stay Together", artist: "Al Green", year: 1971, src: BASE_URL + "70s/letsstaytogether_algreen.mp3" },
  { title: "Lean on Me", artist: "Bill Withers", year: 1972, src: BASE_URL + "70s/leanonme_billwithers.mp3" },
  { title: "Ain’t No Sunshine", artist: "Bill Withers", year: 1971, src: BASE_URL + "70s/aintnosunshine_billwithers.mp3" },
  { title: "Superstition", artist: "Stevie Wonder", year: 1972, src: BASE_URL + "70s/superstition_steviewonder.mp3" }, // fehlt im Ordner
  { title: "Sir Duke", artist: "Stevie Wonder", year: 1976, src: BASE_URL + "70s/sirduke_steviewonder.mp3" },
  { title: "How Deep Is Your Love", artist: "Bee Gees", year: 1977, src: BASE_URL + "70s/howdeepisyourlove_beegees.mp3" }, // fehlt im Ordner
  { title: "Night Fever", artist: "Bee Gees", year: 1978, src: BASE_URL + "70s/nightfever_beegees.mp3" },
  { title: "Waterloo", artist: "ABBA", year: 1974, src: BASE_URL + "70s/waterloo_abba.mp3" },
  { title: "Ein Bett im Kornfeld", artist: "Jürgen Drews", year: 1976, src: BASE_URL + "70s/einbettimkornfeld_jurgendrews.mp3" }, // fehlt im Ordner
  { title: "Griechischer Wein", artist: "Udo Jürgens", year: 1974, src: BASE_URL + "70s/griechischerwein_udojuergens.mp3" },
  { title: "Aber bitte mit Sahne", artist: "Udo Jürgens", year: 1976, src: BASE_URL + "70s/aberbittemitsahne_udojuergens.mp3" },
  { title: "Über sieben Brücken musst du gehen", artist: "Karat", year: 1978, src: BASE_URL + "70s/uebersiebenbrueckenmusstdugehen_karat.mp3" },
  { title: "Mendocino", artist: "Michael Holm", year: 1970, src: BASE_URL + "70s/mendocino_michaelholm.mp3" }

];
window.SONG_DECADES = window.SONG_DECADES || [];
window.SONG_DECADES.push({ key:'70s', label:'1970er', list: songs70s });
