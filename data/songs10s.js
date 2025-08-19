const songs10s = [
  { title: "Rolling In The Deep", artist: "Adele", year:2010, src: "songs/10s/rollinginthedeep_adele.mp3" },
  { title: "Shape Of You", artist: "Ed Sheeran", year:2017, src: "songs/10s/shapeofyou_edsheeran.mp3" },
  { title: "Uptown Funk", artist: "Bruno Mars, Mark Ronson", year:2014, src: "songs/10s/uptownfunk_brunomars-markronson.mp3" }
];
window.SONG_DECADES = window.SONG_DECADES || [];
window.SONG_DECADES.push({ key:'10s', label:'2010er', list: songs10s });
