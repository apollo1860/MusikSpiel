const rickRoll = new Audio('assets/mp3/rickroll.mp3');
rickRoll.volume = 0.3; // etwas leiser als der Hauptsong

let currentSong = null;
let score = 0;

const playBtn = document.getElementById("playBtn");
const revealCard = document.getElementById("revealCard");
const scoreValue = document.getElementById("scoreValue");
const correctTitleBtn = document.getElementById("correctTitleBtn");
const correctArtistBtn = document.getElementById("correctArtistBtn");
const wrongBtn = document.getElementById("wrongBtn");

// Testweise: wir nehmen erstmal nur 50s
let activeDecadeSongs = songs50s;

function getRandomSong() {
  const index = Math.floor(Math.random() * activeDecadeSongs.length);
  return activeDecadeSongs[index];
}

// 3. Effekt-Logik vorbereiten
function applyEffect(effect) {
  if (effect === "rickroll") {
    rickRoll.currentTime = 0; // von Anfang starten
    rickRoll.play();
    setTimeout(() => rickRoll.pause(), 10000); // nach 10s stoppen
  }
  // weitere Effekte später hier ergänzen
}

playBtn.addEventListener("click", () => {
  currentSong = getRandomSong();
  const audio = new Audio(currentSong.src);
  audio.play();

  // Testweise Rickroll auslösen
  applyEffect("rickroll");
});

revealCard.addEventListener("click", () => {
  if (!currentSong) return;
  revealCard.textContent = `${currentSong.title} – ${currentSong.artist}`;
  revealCard.classList.add("flipped");
});

correctTitleBtn.addEventListener("click", () => {
  score++;
  scoreValue.textContent = score;
});

correctArtistBtn.addEventListener("click", () => {
  score++;
  scoreValue.textContent = score;
});

wrongBtn.addEventListener("click", () => {
  score -= 2; // Strafschluck
  scoreValue.textContent = score;
});
