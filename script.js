// --- Rickroll vorbereiten ---
const rickRoll = new Audio('assets/mp3/rickroll.mp3');
rickRoll.volume = 0.3; // etwas leiser als der Hauptsong

// --- Spiel-States ---
let players = [];          // wird aus dem Startmenü befüllt
let currentSong = null;
let currentAudio = null;   // aktueller normaler Song
let score = 0;

// --- Startmenü Elemente ---
const startMenu   = document.getElementById("startMenu");
const playerList  = document.getElementById("playerList");
const addPlayerBt = document.getElementById("addPlayer");
const startGameBt = document.getElementById("startGame");
const gameSection = document.getElementById("game");

// --- Spiel-UI Elemente ---
const playBtn        = document.getElementById("playBtn");
const pauseBtn       = document.getElementById("pauseBtn");   // hast du vorhin ergänzt
const revealCard     = document.getElementById("revealCard");
const scoreValue     = document.getElementById("scoreValue");
const correctTitleBtn= document.getElementById("correctTitleBtn");
const correctArtistBtn=document.getElementById("correctArtistBtn");
const wrongBtn       = document.getElementById("wrongBtn");

// Testweise: wir nehmen erstmal nur 50s (aus deinen data/songs50s.js)
let activeDecadeSongs = songs50s;

// -------------------------
// Startmenü-Funktionen
// -------------------------
function addNameField(value = "") {
  const row = document.createElement("div");
  row.className = "name-row";
  row.innerHTML = `<input class="nameInput" type="text" placeholder="Spielername" value="${value}">`;
  playerList.appendChild(row);
}

addPlayerBt.addEventListener("click", () => {
  addNameField("");
});

startGameBt.addEventListener("click", () => {
  // Namen einsammeln (nur nicht-leere)
  const names = [...document.querySelectorAll(".nameInput")]
    .map(inp => inp.value.trim())
    .filter(Boolean);

  if (names.length < 1) {
    alert("Bitte mindestens einen Spielernamen eingeben.");
    return;
  }

  players = names;

  // Menü ausblenden, Spiel einblenden
  startMenu.classList.add("hidden");
  gameSection.classList.remove("hidden");

  // Grundzustand für neues Spiel
  score = 0;
  scoreValue.textContent = score;
  if (revealCard) {
    revealCard.textContent = "❓";
    revealCard.classList.remove("flipped");
  }
  // Audio sicherheitshalber stoppen
  if (currentAudio) { currentAudio.pause(); currentAudio.currentTime = 0; }
  if (!rickRoll.paused) { rickRoll.pause(); rickRoll.currentTime = 0; }
});

// -------------------------
// Spiel-Logik
// -------------------------
function getRandomSong() {
  const index = Math.floor(Math.random() * activeDecadeSongs.length);
  return activeDecadeSongs[index];
}

// Play
playBtn.addEventListener("click", () => {
  // laufendes Audio stoppen
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
  if (!rickRoll.paused) {
    rickRoll.pause();
    rickRoll.currentTime = 0;
  }

  // neuen Song starten
  currentSong = getRandomSong();
  currentAudio = new Audio(currentSong.src);
  currentAudio.play();

  // Optional: Pause-Button auf "Pause" zurücksetzen
  if (pauseBtn) pauseBtn.textContent = "⏸️ Pause";
});

// Pause/Weiter
if (pauseBtn) {
  pauseBtn.addEventListener("click", () => {
    // normaler Song
    if (currentAudio && !currentAudio.paused) {
      currentAudio.pause();
      pauseBtn.textContent = "▶️ Weiter";
    } else if (currentAudio && currentAudio.paused) {
      currentAudio.play();
      pauseBtn.textContent = "⏸️ Pause";
    }

    // Rickroll (falls du ihn irgendwo startest)
    if (!rickRoll.paused) {
      rickRoll.pause();
      pauseBtn.textContent = "▶️ Weiter";
    } else if (rickRoll.currentTime > 0 && rickRoll.paused) {
      rickRoll.play();
      pauseBtn.textContent = "⏸️ Pause";
    }
  });
}

// Reveal / Lösung umdrehen → alles stoppen
revealCard.addEventListener("click", () => {
  if (!currentSong) return;

  revealCard.textContent = `${currentSong.title} – ${currentSong.artist}`;
  revealCard.classList.add("flipped");

  if (!rickRoll.paused) {
    rickRoll.pause();
    rickRoll.currentTime = 0;
  }
  if (currentAudio && !currentAudio.paused) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
});

// Punkte
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
