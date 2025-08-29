const BASE_URL = "https://pub-3910a02fcd5042f5bb1910363e89357c.r2.dev/";

const songs80s = [
  { title: "Beat It", artist: "Michael Jackson", year: 1982, src: BASE_URL + "80s/beatit_michaeljackson.mp3" },
  { title: "Thriller", artist: "Michael Jackson", year: 1982, src: BASE_URL + "80s/thriller_michaeljackson.mp3" },
  { title: "Like a Virgin", artist: "Madonna", year: 1984, src: BASE_URL + "80s/likeavirgin_madonna.mp3" },
  { title: "Material Girl", artist: "Madonna", year: 1984, src: BASE_URL + "80s/materialgirl_madonna.mp3" },
  { title: "Careless Whisper", artist: "George Michael", year: 1984, src: BASE_URL + "80s/carelesswhisper_georgemichael.mp3" },
  { title: "Faith", artist: "George Michael", year: 1987, src: BASE_URL + "80s/faith_georgemichael.mp3" },
  { title: "Tainted Love", artist: "Soft Cell", year: 1981, src: BASE_URL + "80s/taintedlove_softcell.mp3" },
  { title: "Don’t You (Forget About Me)", artist: "Simple Minds", year: 1985, src: BASE_URL + "80s/dontyouforgetaboutme_simpleminds.mp3" },
  { title: "True", artist: "Spandau Ballet", year: 1983, src: BASE_URL + "80s/true_spandauballet.mp3" },
  { title: "Sweet Dreams (Are Made of This)", artist: "Eurythmics", year: 1983, src: BASE_URL + "80s/sweetdreams_eurythmics.mp3" },
  { title: "Here Comes the Rain Again", artist: "Eurythmics", year: 1983, src: BASE_URL + "80s/herecomestherainagain_eurythmics.mp3" },
  { title: "Relax", artist: "Frankie Goes to Hollywood", year: 1983, src: BASE_URL + "80s/relax_frankiegoestohollywood.mp3" },
  { title: "The Power of Love", artist: "Frankie Goes to Hollywood", year: 1984, src: BASE_URL + "80s/thepoweroflove_frankiegoestohollywood.mp3" },
  { title: "I Still Haven’t Found What I’m Looking For", artist: "U2", year: 1987, src: BASE_URL + "80s/istillhaventfoundwhatimlookingfor_u2.mp3" },
  { title: "Jump", artist: "Van Halen", year: 1984, src: BASE_URL + "80s/jump_vanhalen.mp3" },
  { title: "Pour Some Sugar on Me", artist: "Def Leppard", year: 1987, src: BASE_URL + "80s/poursomesugaronme_defleppard.mp3" },
  { title: "Every Rose Has Its Thorn", artist: "Poison", year: 1988, src: BASE_URL + "80s/everyrosehasitsthorn_poison.mp3" },
  { title: "We’re Not Gonna Take It", artist: "Twisted Sister", year: 1984, src: BASE_URL + "80s/werenotgonnatakeit_twistedsisters.mp3" },
  { title: "Girls Just Want to Have Fun", artist: "Cyndi Lauper", year: 1983, src: BASE_URL + "80s/girlsjustwannahavefun_cyndilauper.mp3" },
  { title: "Eisbär", artist: "Grauzone", year: 1981, src: BASE_URL + "80s/eisbaer_grauzone.mp3" },
  { title: "Da Da Da", artist: "Trio", year: 1982, src: BASE_URL + "80s/dadada_trio.mp3" },
  { title: "Carbonara", artist: "Spliff", year: 1982, src: BASE_URL + "80s/carbonara_spliff.mp3" },
  { title: "Sternenhimmel", artist: "Hubert Kah", year: 1982, src: BASE_URL + "80s/sternenhimmel_hubertkah.mp3" }
];
window.SONG_DECADES = window.SONG_DECADES || [];
window.SONG_DECADES.push({ key:'80s', label:'1980er', list: songs80s });
