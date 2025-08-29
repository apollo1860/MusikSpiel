const BASE_URL = "https://pub-3910a02fcd5042f5bb1910363e89357c.r2.dev/";

const songs00s = [
  { title: "Hey Ya!", artist: "Outkast", year: 2003, src: BASE_URL + "00s/heyya_outkast.mp3" },
  { title: "In The End", artist: "Linkin Park", year: 2001, src: BASE_URL + "00s/intheend_linkinpark.mp3" },
  { title: "Lose Yourself", artist: "Eminem", year: 2002, src: BASE_URL + "00s/loseyourself_eminem.mp3" },
  { title: "Boulevard of Broken Dreams", artist: "Green Day", year: 2004, src: BASE_URL + "00s/boulevardofbrokendreams_greenday.mp3" },
  { title: "American Idiot", artist: "Green Day", year: 2004, src: BASE_URL + "00s/americanidiot_greenday.mp3" },
  { title: "Crazy", artist: "Gnarls Barkley", year: 2006, src: BASE_URL + "00s/crazy_gnarlsbarkley.mp3" },
  { title: "Clocks", artist: "Coldplay", year: 2002, src: BASE_URL + "00s/clocks_coldplay.mp3" },
  { title: "Viva la Vida", artist: "Coldplay", year: 2008, src: BASE_URL + "00s/vivalavida_coldplay.mp3" },
  { title: "Yellow", artist: "Coldplay", year: 2000, src: BASE_URL + "00s/yellow_coldplay.mp3" },
  { title: "Fix You", artist: "Coldplay", year: 2005, src: BASE_URL + "00s/fixyou_coldplay.mp3" },
  { title: "I Kissed a Girl", artist: "Katy Perry", year: 2008, src: BASE_URL + "00s/ikissedagirl_katyperry.mp3" },
  { title: "Fireflies", artist: "Owl City", year: 2009, src: BASE_URL + "00s/fireflies_owlcity.mp3" },
  { title: "Drops of Jupiter", artist: "Train", year: 2001, src: BASE_URL + "00s/dropsofjupiter_train.mp3" },
  { title: "She Will Be Loved", artist: "Maroon 5", year: 2002, src: BASE_URL + "00s/shewillbeloved_maroon5.mp3" },
  { title: "This Love", artist: "Maroon 5", year: 2002, src: BASE_URL + "00s/thislove_maroon5.mp3" },
  { title: "In da Club", artist: "50 Cent", year: 2003, src: BASE_URL + "00s/indaclub_50cent.mp3" },
  { title: "Candy Shop", artist: "50 Cent", year: 2005, src: BASE_URL + "00s/candyshop_50cent.mp3" },
  { title: "The Real Slim Shady", artist: "Eminem", year: 2000, src: BASE_URL + "00s/therealslimshady_eminem.mp3" },
  { title: "Without Me", artist: "Eminem", year: 2002, src: BASE_URL + "00s/withoutme_eminem.mp3" },
  { title: "Durch den Monsun", artist: "Tokio Hotel", year: 2005, src: BASE_URL + "00s/durchdenmonsun_tokiohotel.mp3" },
  { title: "Schrei", artist: "Tokio Hotel", year: 2005, src: BASE_URL + "00s/schrei_tokiohotel.mp3" },
  { title: "Hips Don’t Lie", artist: "Shakira feat. Wyclef Jean", year: 2006, src: BASE_URL + "00s/hipsdontlie_shakira.mp3" },
  { title: "Whenever, Wherever", artist: "Shakira", year: 2001, src: BASE_URL + "00s/wheneverwherever_shakira.mp3" },
  { title: "Sk8er Boi", artist: "Avril Lavigne", year: 2002, src: BASE_URL + "00s/sk8erboi_avrillavigne.mp3" }
];
window.SONG_DECADES = window.SONG_DECADES || [];
window.SONG_DECADES.push({ key:'00s', label:'2000er', list: songs00s });
