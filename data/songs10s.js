const BASE_URL = "https://pub-3910a02fcd5042f5bb1910363e89357c.r2.dev/";

const songs10s = [
  { title: "Rolling In The Deep", artist: "Adele", year:2010, src: BASE_URL + "10s/rollinginthedeep_adele.mp3" },
  { title: "Shape Of You", artist: "Ed Sheeran", year:2017, src: BASE_URL + "10s/shapeofyou_edsheeran.mp3" },
  { title: "Uptown Funk", artist: "Bruno Mars, Mark Ronson", year:2014, src: BASE_URL + "10s/uptownfunk_brunomars-markronson.mp3" },
  { title: "Someone Like You", artist: "Adele", year: 2011, src: BASE_URL + "10s/someonelikeyou_adele.mp3" },
  { title: "Hello", artist: "Adele", year: 2015, src: BASE_URL + "10s/hello_adele.mp3" },
  { title: "We Found Love", artist: "Rihanna feat. Calvin Harris", year: 2011, src: BASE_URL + "10s/wefoundlove_rihanna.mp3" },
  { title: "Diamonds", artist: "Rihanna", year: 2012, src: BASE_URL + "10s/diamonds_rihanna.mp3" },
  { title: "All of Me", artist: "John Legend", year: 2013, src: BASE_URL + "10s/allofme_johnlegend.mp3" },
  { title: "Thinking Out Loud", artist: "Ed Sheeran", year: 2014, src: BASE_URL + "10s/thinkingoutloud_edsheeran.mp3" },
  { title: "Perfect", artist: "Ed Sheeran", year: 2017, src: BASE_URL + "10s/perfect_edsheeran.mp3" },
  { title: "Tage wie diese", artist: "Die Toten Hosen", year: 2012, src: BASE_URL + "10s/tagewiediese_totenhosen.mp3" },
  { title: "An guten Tagen", artist: "Johannes Oerding", year: 2019, src: BASE_URL + "10s/angutentagen_johannesoerding.mp3" },
  { title: "So wie du bist", artist: "MoTrip feat. Lary", year: 2015, src: BASE_URL + "10s/sowiedubist_motrip.mp3" },
  { title: "Happier", artist: "Ed Sheeran", year: 2017, src: BASE_URL + "10s/happier_edsheeran.mp3" },
  { title: "Just the Way You Are", artist: "Bruno Mars", year: 2010, src: BASE_URL + "10s/justthewayyouare_brunomars.mp3" },
  { title: "What Do You Mean?", artist: "Justin Bieber", year: 2015, src: BASE_URL + "10s/whatdoyoumean_justinbieber.mp3" },
  { title: "Roar", artist: "Katy Perry", year: 2013, src: BASE_URL + "10s/roar_katyperry.mp3" },
  { title: "Firework", artist: "Katy Perry", year: 2010, src: BASE_URL + "10s/firework_katyperry.mp3" },
  { title: "Teenage Dream", artist: "Katy Perry", year: 2010, src: BASE_URL + "10s/teenagedream_katyperry.mp3" },
  { title: "Dark Horse", artist: "Katy Perry", year: 2013, src: BASE_URL + "10s/darkhorse_katyperry.mp3" },
  { title: "Royals", artist: "Lorde", year: 2013, src: BASE_URL + "10s/royals_lorde.mp3" },
  { title: "Cheap Thrills", artist: "Sia", year: 2016, src: BASE_URL + "10s/cheapthrills_sia.mp3" },
  { title: "Pumped Up Kicks", artist: "Foster the People", year: 2010, src: BASE_URL + "10s/pumpedupkicks_fosterthepeople.mp3" },
  { title: "Shut Up and Dance", artist: "Walk the Moon", year: 2014, src: BASE_URL + "10s/shutupanddance_walkthemoon.mp3" },
  { title: "Take Me to Church", artist: "Hozier", year: 2013, src: BASE_URL + "10s/takemetochurch_hozier.mp3" },
  { title: "Born This Way", artist: "Lady Gaga", year: 2011, src: BASE_URL + "10s/bornthisway_ladygaga.mp3" }
];
window.SONG_DECADES = window.SONG_DECADES || [];
window.SONG_DECADES.push({ key:'10s', label:'2010er', list: songs10s });
