// --- Rickroll vorbereiten ---
const rickRoll = new Audio('assets/mp3/rickroll.mp3');
rickRoll.volume = 0.6; // etwas leiser als der Hauptsong

let currentSong = null;
let currentAudio = null; // aktuelles Audio-Objekt für normalen Song
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

// --- Play Button ---
playBtn.addEventListener("click", () => {
  // falls schon ein Song läuft -> stoppen
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
  if (!rickRoll.paused) {
    rickRoll.pause();
    rickRoll.currentTime = 0;
  }

  // neuen Song auswählen
  currentSong = getRandomSong();
  currentAudio = new Audio(currentSong.src);
  currentAudio.play();
});

// --- Reveal Card ---
revealCard.addEventListener("click", () => {
  if (!currentSong) return;

  // Lösung anzeigen
  revealCard.textContent = `${currentSong.title} – ${currentSong.artist}`;
  revealCard.classList.add("flipped");

  // Falls Rickroll läuft -> stoppen
  if (!rickRoll.paused) {
    rickRoll.pause();
    rickRoll.currentTime = 0;
  }

  // Falls normaler Song läuft -> stoppen
  if (currentAudio && !currentAudio.paused) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
});

// --- Punktevergabe ---
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
